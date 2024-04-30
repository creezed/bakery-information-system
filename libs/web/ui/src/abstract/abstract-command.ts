import { isObservable, Observable, take } from 'rxjs';

export interface CommandAppearance {
  readonly label: string;
  readonly icon: string;
}

export interface BuildConfig<TModel, TParams> {
  resolveParams: (model: TModel) => TParams;
  isHidden?: (model: TModel) => boolean;
  onSuccess?: () => void;
}

export interface CommandModel<T> {
  icon: string;
  label: string;
  isHidden: (model: T) => boolean;
  command: (model: T) => void;
}

export abstract class AbstractCommand<TParams = undefined> {
  abstract command(params?: TParams): void | Observable<void>;
  abstract appearance(): CommandAppearance;

  public build<Model>(
    config?: BuildConfig<Model, TParams>
  ): CommandModel<Model> {
    const appearance = this.appearance();

    return {
      ...appearance,
      isHidden: (model) => config?.isHidden?.(model) || false,
      command: (model) => {
        const result = this.command(config?.resolveParams(model));
        if (isObservable(result)) {
          result.pipe(take(1)).subscribe(() => config?.onSuccess?.());
        } else {
          config?.onSuccess?.();
        }
      },
    };
  }
}

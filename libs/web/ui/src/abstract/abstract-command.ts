import { Injectable } from '@angular/core';

export interface CommandAppearance {
  readonly label: string;
  readonly icon: string;
}

export interface CommandModel<TParams> extends CommandAppearance {
  execute: (params: TParams) => void;
}

@Injectable()
export abstract class AbstractCommand<TParams = undefined> {
  abstract execute(params: TParams): void;
  abstract appearance(): CommandAppearance;

  public get command(): CommandModel<TParams> {
    return {
      ...this.appearance(),
      execute: (params: TParams) => this.execute(params),
    };
  }
}

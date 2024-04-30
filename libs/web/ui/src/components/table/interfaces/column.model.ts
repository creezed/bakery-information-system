import { PolymorpheusComponent } from '@tinkoff/ng-polymorpheus';

export interface ColumnModel<Model> {
  readonly field: (keyof Model & string) | string;
  readonly displayName: string;
  readonly component?: PolymorpheusComponent<unknown>;
}

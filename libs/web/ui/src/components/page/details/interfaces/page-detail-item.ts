import { PolymorpheusContent } from '@tinkoff/ng-polymorpheus';
import { Observer } from 'rxjs';

export interface PageDetailItem<Data = unknown> {
  observer: Observer<unknown>;
  content: PolymorpheusContent;
  data?: Data;
  completeWith: (result: unknown) => void;
}

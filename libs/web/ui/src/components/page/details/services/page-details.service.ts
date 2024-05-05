import { inject, Injectable } from '@angular/core';
import { PolymorpheusContent } from '@tinkoff/ng-polymorpheus';
import { Observable } from 'rxjs';
import { PAGE_DETAILS } from '../tokens/details.token';
import { PageDetailItem } from '../interfaces/page-detail-item';

interface OpenArgs {
  content: PolymorpheusContent;
  data?: unknown;
}

@Injectable({ providedIn: 'root' })
export class PageDetailsService {
  private _currentItem = inject(PAGE_DETAILS);

  public open({ content, data }: OpenArgs): Observable<unknown> {
    return new Observable((observer) => {
      const item: PageDetailItem = {
        observer,
        content,
        data,
        completeWith: (result: unknown) => {
          observer.next(result);
          observer.complete();
        },
      };

      this._currentItem.next(item);

      return () => {
        this._currentItem.next(null);
      };
    });
  }
}

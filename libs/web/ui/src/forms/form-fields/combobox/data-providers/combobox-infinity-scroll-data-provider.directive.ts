import { DestroyRef, Directive, inject, Input, OnInit } from '@angular/core';
import {
  combineLatest,
  debounceTime,
  filter,
  Observable,
  startWith,
  switchMap,
  take,
  tap,
} from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { tuiIsPresent } from '@taiga-ui/cdk';
import { ComboboxComponent } from '../combobox.component';

export type ComboboxInfinityScrollDataProvider<T> = (
  search: string,
  page: number
) => Observable<{ items: Array<T>; hasMorePages?: boolean }>;

@Directive({
  selector: 'ui-combobox[uiInfinityScrollDataProvider]',
  standalone: true,
})
export class ComboboxInfinityScrollDataProviderDirective<T> implements OnInit {
  private readonly destroyRef = inject(DestroyRef);

  private readonly host = inject(ComboboxComponent<T>);

  @Input({ required: true, alias: 'uiInfinityScrollDataProvider' })
  public dataFetchFn!: ComboboxInfinityScrollDataProvider<T>;

  public ngOnInit(): void {
    combineLatest([
      this.host.tuiComboboxComponent.focusedChange.pipe(
        take(1),
        switchMap(() =>
          this.host.search$.pipe(
            startWith(''),
            filter(tuiIsPresent),
            tap(() => {
              this.host.page$.next(1);
              this.host.items = null;
            })
          )
        )
      ),
      this.host.page$,
    ])
      .pipe(
        debounceTime(300),
        switchMap(([search, page]) => this.dataFetchFn(search, page)),
        filter(tuiIsPresent),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe({
        next: ({ items, hasMorePages }) => {
          this.host.hasMorePages = !!hasMorePages;
          this.host.appendItems(items);
        },
      });
  }
}

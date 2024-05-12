import { DestroyRef, Directive, inject, Input, OnInit } from '@angular/core';
import { ComboboxComponent } from '../combobox.component';
import { filter, Observable, startWith, switchMap } from 'rxjs';
import { tuiIsPresent } from '@taiga-ui/cdk';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

export type ComboboxDataProvider<T> = (
  search: string
) => Observable<Array<T> | null>;

@Directive({
  selector: 'ui-combobox[uiDataProvider]',
  standalone: true,
})
export class ComboboxDataProviderDirective<T> implements OnInit {
  private readonly destroyRef = inject(DestroyRef);

  @Input('uiDataProvider')
  public dataFetchFn!: ComboboxDataProvider<T>;

  private comboboxComponentRef = inject(ComboboxComponent<T>);

  public ngOnInit(): void {
    this.comboboxComponentRef.search$
      .pipe(
        startWith(''),
        filter(tuiIsPresent),
        switchMap((search: string) => this.dataFetchFn(search)),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe({
        next: (response) => (this.comboboxComponentRef.items = response),
        error: () => (this.comboboxComponentRef.items = []),
      });
  }
}

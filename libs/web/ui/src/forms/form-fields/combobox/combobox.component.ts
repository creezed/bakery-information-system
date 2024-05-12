import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  Input,
  Output,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { AbstractFormField } from '../../abstract';
import {
  TUI_ITEMS_HANDLERS,
  TuiComboBoxComponent,
  TuiComboBoxModule,
  TuiFieldErrorPipeModule,
  TuiItemsHandlers,
} from '@taiga-ui/kit';
import { BehaviorSubject, ReplaySubject } from 'rxjs';
import {
  TuiDataListModule,
  TuiErrorModule,
  TuiValueContentContext,
} from '@taiga-ui/core';
import {
  PolymorpheusComponent,
  PolymorpheusContent,
  PolymorpheusModule,
} from '@tinkoff/ng-polymorpheus';
import { OptionDefaultTemplateComponent } from '../../templates/option-default-template/option-default-template.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AsyncPipe, NgIf } from '@angular/common';
import { InfinityDataListWrapperComponent } from '../../wrappers';

@Component({
  selector: 'ui-combobox',
  standalone: true,
  imports: [
    TuiComboBoxModule,
    ReactiveFormsModule,
    TuiDataListModule,
    PolymorpheusModule,
    NgIf,
    TuiErrorModule,
    InfinityDataListWrapperComponent,
    TuiFieldErrorPipeModule,
    AsyncPipe,
  ],
  templateUrl: './combobox.component.html',
  styleUrl: './combobox.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ComboboxComponent<T> extends AbstractFormField {
  private readonly cdr = inject(ChangeDetectorRef);

  private readonly itemsHandlers: TuiItemsHandlers<T> =
    inject(TUI_ITEMS_HANDLERS);

  public hasMorePages = true;

  public isLoading$ = new BehaviorSubject(false);

  @ViewChild(TuiComboBoxComponent, { static: true })
  public tuiComboboxComponent!: TuiComboBoxComponent<T>;

  @ViewChild('dataListTemplate', { static: true, read: TemplateRef })
  public dataListTemplate!: TemplateRef<unknown>;

  @Input()
  public items: T[] | null = null;

  @Input()
  public identityMatcher: TuiItemsHandlers<T>['identityMatcher'] =
    this.itemsHandlers.identityMatcher;

  @Input()
  public stringify: TuiItemsHandlers<T>['stringify'] =
    this.itemsHandlers.stringify;

  @Input()
  public placeholder?: string = '';

  @Input()
  public valueContent: PolymorpheusContent<TuiValueContentContext<T>> =
    new PolymorpheusComponent(OptionDefaultTemplateComponent);

  @Input()
  public itemContent: PolymorpheusContent<TuiValueContentContext<T>> =
    new PolymorpheusComponent(OptionDefaultTemplateComponent);

  @Input()
  public dropdownHeader: PolymorpheusContent | null = null;

  @Output()
  public search$ = new ReplaySubject<string | null>();

  @Output()
  public page$ = new BehaviorSubject(1);

  public appendItems(items: T[]): void {
    if (this.items) {
      this.items = [...this.items, ...items];
    } else {
      this.items = [...items];
    }
    this.cdr.markForCheck();
  }

  protected scrolled(): void {
    if (this.hasMorePages) {
      this.page$.next(this.page$.value + 1);
    }
  }
}

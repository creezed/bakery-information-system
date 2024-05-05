import {
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  ContentChildren,
  inject,
  QueryList,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  POLYMORPHEUS_CONTEXT,
  PolymorpheusModule,
} from '@tinkoff/ng-polymorpheus';
import { TuiButtonModule } from '@taiga-ui/core';
import { DEFAULT_DETAILS_TABS } from './tokens/default-details-tabs.token';
import { PageDetailItem } from './interfaces/page-detail-item';
import { EMPTY_QUERY } from '@taiga-ui/cdk';
import { RouterLinkActive } from '@angular/router';
import { TuiTabsModule } from '@taiga-ui/kit';
import { PageDetailTabDirective } from './directives/page-detail-tab.directive';
import { PageDetailActionsDirective } from './directives/page-detail-actions.directive';

@Component({
  selector: 'ui-page-details',
  standalone: true,
  imports: [
    CommonModule,
    PolymorpheusModule,
    TuiButtonModule,
    RouterLinkActive,
    TuiTabsModule,
  ],
  templateUrl: './page-details.component.html',
  styleUrl: './page-details.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageDetailsComponent {
  private _currentItem = inject<PageDetailItem>(POLYMORPHEUS_CONTEXT);

  @ContentChildren(PageDetailTabDirective)
  public readonly tabConnectors: QueryList<PageDetailTabDirective> =
    EMPTY_QUERY;

  @ContentChild(PageDetailActionsDirective)
  public readonly actions!: PageDetailActionsDirective;

  protected readonly defaultTabs = inject(DEFAULT_DETAILS_TABS);

  protected activeItemIndex = 0;

  protected close(): void {
    this._currentItem.observer.complete();
  }
}

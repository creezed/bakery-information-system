import {
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  ContentChildren,
  inject,
  Input,
  QueryList,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { EMPTY_QUERY, TuiReplacePipeModule } from '@taiga-ui/cdk';
import { PageTabDirective } from './page-tab.directive';
import { TuiTabsModule } from '@taiga-ui/kit';
import { RouterLink, RouterLinkActive } from '@angular/router';
import {
  TuiFadeModule,
  TuiIconModule,
  TuiNavigationModule,
} from '@taiga-ui/experimental';
import {
  TuiButtonModule,
  tuiHeightCollapse,
  TuiScrollbarModule,
} from '@taiga-ui/core';
import { PageActionsDirective } from './page-actions.directive';
import { DEFAULT_TABS } from '../../tokens';
import { PageDetailsComponent } from './details';
import { PolymorpheusModule } from '@tinkoff/ng-polymorpheus';
import { PAGE_DETAILS } from './details/tokens/details.token';

@Component({
  selector: 'ui-page',
  standalone: true,
  imports: [
    CommonModule,
    TuiTabsModule,
    RouterLink,
    TuiReplacePipeModule,
    RouterLinkActive,
    TuiNavigationModule,
    TuiIconModule,
    TuiButtonModule,
    TuiFadeModule,
    TuiScrollbarModule,
    PageDetailsComponent,
    PolymorpheusModule,
  ],
  templateUrl: './page.component.html',
  styleUrl: './page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [tuiHeightCollapse],
})
export class PageComponent {
  @Input()
  public header = '';

  @ContentChildren(PageTabDirective)
  public readonly tabConnectors: QueryList<PageTabDirective> = EMPTY_QUERY;

  @ContentChild(PageActionsDirective)
  public readonly actions?: PageActionsDirective;

  protected readonly defaultTabs = inject(DEFAULT_TABS);

  protected readonly details$ = inject(PAGE_DETAILS);

  protected activeItemIndex = 0;

  protected readonly from = / /g;
  protected readonly to = '_';
}

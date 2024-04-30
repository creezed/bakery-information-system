import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  TuiAppearanceModule,
  TuiAvatarModule,
  TuiBadgeNotificationModule,
  TuiButtonModule,
  TuiCardModule,
  TuiFadeModule,
  TuiHeaderModule,
  TuiIconModule,
  TuiNavigationModule,
  TuiSurfaceModule,
  TuiTitleModule,
} from '@taiga-ui/experimental';
import {
  TuiDataListModule,
  TuiExpandModule,
  TuiHostedDropdownModule,
} from '@taiga-ui/core';
import { TuiTabsModule } from '@taiga-ui/kit';
import { TuiRepeatTimesModule } from '@taiga-ui/cdk';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { LayoutAsideMenuComponent } from './menu/layout-aside-menu.component';
import { LayoutService } from './services/layout.service';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    CommonModule,
    TuiNavigationModule,
    TuiButtonModule,
    TuiIconModule,
    TuiHostedDropdownModule,
    TuiFadeModule,
    TuiDataListModule,
    TuiBadgeNotificationModule,
    TuiAvatarModule,
    TuiExpandModule,
    TuiTabsModule,
    TuiRepeatTimesModule,
    TuiCardModule,
    TuiHeaderModule,
    TuiSurfaceModule,
    TuiTitleModule,
    RouterLink,
    TuiAppearanceModule,
    RouterLinkActive,
    LayoutAsideMenuComponent,
    RouterOutlet,
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutComponent {
  protected service = inject(LayoutService);
  protected sidebarExpanded = this.service.sidebarExpanded;
}

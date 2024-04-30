import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Menu } from '../types/menu';
import { TuiAppearanceModule, TuiButtonModule } from '@taiga-ui/experimental';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NgForOf, NgIf, NgTemplateOutlet } from '@angular/common';
import {
  TuiDataListModule,
  TuiExpandModule,
  TuiHostedDropdownModule,
} from '@taiga-ui/core';
import { LayoutAsideMenuItemComponent } from './menu-item/layout-aside-menu-item.component';

@Component({
  selector: 'app-layout-aside-menu',
  standalone: true,
  imports: [
    TuiButtonModule,
    RouterLink,
    RouterLinkActive,
    TuiAppearanceModule,
    NgForOf,
    TuiDataListModule,
    TuiHostedDropdownModule,
    TuiExpandModule,
    NgTemplateOutlet,
    NgIf,
    LayoutAsideMenuItemComponent,
  ],
  templateUrl: './layout-aside-menu.component.html',
  styleUrl: './layout-aside-menu.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutAsideMenuComponent {
  @Input({ required: true })
  public menu: Menu = [];

  @Input({ required: true })
  public sidebarExpanded = false;
}

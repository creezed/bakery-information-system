import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuItem } from '../../types/menu';
import { RouterLink, RouterLinkActive } from '@angular/router';
import {
  TuiAppearanceModule,
  TuiButtonModule,
  TuiIconModule,
} from '@taiga-ui/experimental';
import {
  TuiDataListModule,
  TuiExpandModule,
  TuiHostedDropdownModule,
  TuiSvgModule,
} from '@taiga-ui/core';

@Component({
  selector: 'app-layout-aside-menu-item',
  standalone: true,
  imports: [
    CommonModule,
    RouterLinkActive,
    TuiAppearanceModule,
    TuiButtonModule,
    RouterLink,
    TuiHostedDropdownModule,
    TuiDataListModule,
    TuiExpandModule,
    TuiIconModule,
    TuiSvgModule,
  ],
  templateUrl: './layout-aside-menu-item.component.html',
  styleUrl: './layout-aside-menu-item.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutAsideMenuItemComponent {
  @Input({ required: true })
  public item!: MenuItem;

  @Input({ required: true })
  public sidebarExpanded = false;

  protected open = false;
  protected submenu = false;
}

import { Injectable } from '@angular/core';
import { Menu } from '../types/menu';

@Injectable({ providedIn: 'root' })
export class LayoutService {
  private readonly _menu: Menu = [
    {
      label: 'Номенклатура',
      iconLeft: 'tuiIconClipboard',
      children: [
        {
          label: 'Модификаторы',
        },
        {
          label: 'Блюда',
        },
        {
          label: 'Ингридиенты',
          routerLink: 'ingredients',
        },
        {
          label: 'Меню',
        },
      ],
    },
    {
      label: 'Справочники',
      iconLeft: 'tuiIconBook',
      children: [
        {
          label: 'Единицы измерения',
          routerLink: 'units',
        },
        {
          label: 'Поставщики',
          routerLink: 'suppliers',
        },
      ],
    },
    {
      label: 'Предприятие',
      iconLeft: 'tuiIconBox',
      children: [
        {
          label: 'Склады',
          routerLink: 'stocks',
        },
      ],
    },
  ];

  private _sidebarExpanded = false;

  public get menu() {
    return this._menu;
  }

  public toggleSidebar() {
    return (this._sidebarExpanded = !this._sidebarExpanded);
  }

  public get sidebarExpanded() {
    return this._sidebarExpanded;
  }
}

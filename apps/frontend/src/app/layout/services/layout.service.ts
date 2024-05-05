import { Injectable } from '@angular/core';
import { Menu } from '../types/menu';

@Injectable({ providedIn: 'root' })
export class LayoutService {
  private readonly _menu: Menu = [
    {
      label: 'Главная',
      iconLeft: 'tuiIconHome',
    },
    {
      label: 'Номенклатура',
      iconLeft: 'tuiIconTag',
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
      iconLeft: 'icons8::book',
      children: [
        {
          label: 'Единицы измерения',
          iconLeft: 'icons8::unit',
          routerLink: 'units',
        },
      ],
    },
    {
      label: 'Склад',
      iconLeft: 'tuiIconBox',
      children: [
        {
          label: 'Поставки',
        },
        {
          label: 'Поставщики',
        },
        {
          label: 'Остатки сырья',
        },
      ],
    },
    {
      label: 'Персонал',
      iconLeft: 'tuiIconUsers',
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

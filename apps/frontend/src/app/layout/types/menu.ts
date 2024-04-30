export interface MenuItem {
  readonly label: string;
  readonly iconLeft?: string;
  readonly iconRight?: string;
  readonly routerLink?: string;
  readonly children?: MenuItem[];
}

export type Menu = MenuItem[];

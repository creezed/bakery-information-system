import { tuiCreateToken } from '@taiga-ui/cdk';

export const DEFAULT_DETAILS_TABS = tuiCreateToken<readonly string[]>([
  'Основное',
]);

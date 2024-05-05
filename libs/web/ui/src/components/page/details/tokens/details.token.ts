import { tuiCreateToken } from '@taiga-ui/cdk';
import { BehaviorSubject } from 'rxjs';
import { PageDetailItem } from '../interfaces/page-detail-item';

export const PAGE_DETAILS = tuiCreateToken(
  new BehaviorSubject<Readonly<PageDetailItem> | null>(null)
);

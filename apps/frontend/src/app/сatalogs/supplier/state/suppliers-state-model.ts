import { Supplier } from '../models';

export interface SuppliersStateModel {
  suppliers: {
    items: Supplier[];
    total: number;
  };
  suppliersLoading: boolean;
  selectedSuppler: Supplier | null;
  selectedSupplierLoading: boolean;
}

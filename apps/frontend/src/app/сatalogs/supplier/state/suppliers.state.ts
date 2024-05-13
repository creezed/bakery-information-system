import { Action, State, StateContext } from '@ngxs/store';
import { append, patch, removeItem, updateItem } from '@ngxs/store/operators';
import { inject, Injectable } from '@angular/core';
import { SuppliersStateModel } from './suppliers-state-model';
import { SupplierDataSourceService } from '../services';
import {
  CreateSupplier,
  LoadSupplier,
  LoadSuppliers,
  RemoveSupplier,
  UpdateSupplier,
} from './suppliers.actions';
import { tap } from 'rxjs';
import { JsonPatchModel } from '@bakery-information-system/web/shared';
import { compare } from 'fast-json-patch';
import { UpdateSupplierModel } from '../models';

@State<SuppliersStateModel>({
  name: 'suppliers',
  defaults: {
    suppliers: {
      items: [],
      total: 0,
    },
    suppliersLoading: false,
    selectedSuppler: null,
    selectedSupplierLoading: false,
  },
})
@Injectable()
export class SuppliersState {
  private readonly _dataSourceService = inject(SupplierDataSourceService);

  @Action(LoadSuppliers)
  public loadSuppliers(
    ctx: StateContext<SuppliersStateModel>,
    { payload }: LoadSuppliers
  ) {
    const paginated = payload?.paginated;

    ctx.patchState({
      suppliersLoading: true,
    });

    return this._dataSourceService.getAll(paginated).pipe(
      tap((res) =>
        ctx.patchState({
          suppliers: {
            items: res.data,
            total: res.meta.totalItems,
          },
          suppliersLoading: false,
        })
      )
    );
  }

  @Action(CreateSupplier)
  public createSupplier(
    ctx: StateContext<SuppliersStateModel>,
    { payload }: CreateSupplier
  ) {
    const state = ctx.getState();

    return this._dataSourceService.create(payload.model).pipe(
      tap({
        next: (res) =>
          ctx.setState(
            patch({
              suppliers: patch({
                items: append([res]),
                total: state.suppliers.total + 1,
              }),
            })
          ),
      })
    );
  }

  @Action(LoadSupplier)
  public loadSupplier(
    ctx: StateContext<SuppliersStateModel>,
    { payload: { id } }: LoadSupplier
  ) {
    ctx.patchState({ selectedSupplierLoading: true });

    return this._dataSourceService.getOne(id).pipe(
      tap((supplier) =>
        ctx.patchState({
          selectedSuppler: supplier,
          selectedSupplierLoading: false,
        })
      )
    );
  }

  @Action(RemoveSupplier)
  public removeSupplier(
    ctx: StateContext<SuppliersStateModel>,
    { payload: { id } }: RemoveSupplier
  ) {
    const state = ctx.getState();

    return this._dataSourceService.remove(id).pipe(
      tap({
        next: () =>
          ctx.setState(
            patch({
              suppliers: patch({
                items: removeItem((supplier) => supplier.id === id),
                total: state.suppliers.total - 1,
              }),
            })
          ),
      })
    );
  }

  @Action(UpdateSupplier)
  public updateSupplier(
    ctx: StateContext<SuppliersStateModel>,
    { payload: { id, model } }: UpdateSupplier
  ) {
    const { selectedSuppler } = ctx.getState();

    if (!selectedSuppler) {
      return;
    }

    const updateModel: UpdateSupplierModel = {
      email: selectedSuppler.email,
      name: selectedSuppler.name,
      phone: selectedSuppler.phone,
    };

    const patchOperations: JsonPatchModel[] = compare(
      updateModel,
      model
    ) as JsonPatchModel[];

    return this._dataSourceService.update(id, patchOperations).pipe(
      tap({
        next: (res) =>
          ctx.setState(
            patch({
              suppliers: patch({
                items: updateItem((supplier) => supplier.id === res.id, res),
              }),
              selectedSuppler: res,
            })
          ),
      })
    );
  }
}

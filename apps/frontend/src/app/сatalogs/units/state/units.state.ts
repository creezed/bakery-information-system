import { Action, State, StateContext } from '@ngxs/store';
import { append, patch, removeItem, updateItem } from '@ngxs/store/operators';
import { inject, Injectable } from '@angular/core';
import { UnitsStateModel } from './units-state-model';
import { UnitsDataSourceService } from '../services';
import {
  CreateUnit,
  LoadUnit,
  LoadUnits,
  RemoveUnit,
  UpdateUnit,
} from './units.actions';
import { tap } from 'rxjs';
import { UpdateUnitModel } from '../models/update-unit.model';
import { JsonPatchModel } from '@bakery-information-system/web/shared';
import { compare } from 'fast-json-patch';

@State<UnitsStateModel>({
  name: 'units',
  defaults: {
    units: {
      items: [],
      total: 0,
    },
    unitsLoading: false,
    selectedUnit: null,
    selectedUnitLoading: false,
  },
})
@Injectable()
export class UnitsState {
  private readonly _dataSourceService = inject(UnitsDataSourceService);

  @Action(LoadUnits)
  public loadUnits(ctx: StateContext<UnitsStateModel>, { payload }: LoadUnits) {
    const paginated = payload?.paginated;

    ctx.patchState({
      unitsLoading: true,
    });

    return this._dataSourceService.getAll(paginated).pipe(
      tap((res) =>
        ctx.patchState({
          units: {
            items: res.data,
            total: res.meta.totalItems,
          },
          unitsLoading: false,
        })
      )
    );
  }

  @Action(CreateUnit)
  public createUnit(
    ctx: StateContext<UnitsStateModel>,
    { payload }: CreateUnit
  ) {
    const state = ctx.getState();

    return this._dataSourceService.create(payload.model).pipe(
      tap({
        next: (res) =>
          ctx.setState(
            patch({
              units: patch({
                items: append([res]),
                total: state.units.total + 1,
              }),
            })
          ),
      })
    );
  }

  @Action(LoadUnit)
  public loadUnit(
    ctx: StateContext<UnitsStateModel>,
    { payload: { id } }: LoadUnit
  ) {
    ctx.patchState({ selectedUnitLoading: true });

    return this._dataSourceService
      .getOne(id)
      .pipe(
        tap((unit) =>
          ctx.patchState({ selectedUnit: unit, selectedUnitLoading: false })
        )
      );
  }

  @Action(RemoveUnit)
  public removeUnit(
    ctx: StateContext<UnitsStateModel>,
    { payload: { id } }: RemoveUnit
  ) {
    const state = ctx.getState();

    return this._dataSourceService.remove(id).pipe(
      tap({
        next: () =>
          ctx.setState(
            patch({
              units: patch({
                items: removeItem((unit) => unit.id === id),
                total: state.units.total - 1,
              }),
            })
          ),
      })
    );
  }

  @Action(UpdateUnit)
  public updateUnit(
    ctx: StateContext<UnitsStateModel>,
    { payload: { id, model } }: UpdateUnit
  ) {
    const { selectedUnit } = ctx.getState();

    if (!selectedUnit) {
      return;
    }

    const updateModel: UpdateUnitModel = {
      name: selectedUnit.name,
      fullName: selectedUnit.fullName,
      code: selectedUnit.code,
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
              units: patch({
                items: updateItem((unit) => unit.id === res.id, res),
              }),
              selectedUnit: res,
            })
          ),
      })
    );
  }
}

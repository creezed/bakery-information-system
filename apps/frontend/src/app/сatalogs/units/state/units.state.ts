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
import { compare } from 'fast-json-patch';
import { JsonPatchModel } from '@bakery-information-system/web/shared';
import { UnitUpdateParams } from '../commands';

@State<UnitsStateModel>({
  name: 'units',
  defaults: {
    units: [],
    selectedUnit: null,
  },
})
@Injectable()
export class UnitsState {
  private readonly _dataSourceService = inject(UnitsDataSourceService);

  @Action(LoadUnits)
  public loadUnits(ctx: StateContext<UnitsStateModel>) {
    return this._dataSourceService
      .getAll()
      .pipe(tap((res) => ctx.patchState({ units: res.data })));
  }

  @Action(CreateUnit)
  public createUnit(
    ctx: StateContext<UnitsStateModel>,
    { payload }: CreateUnit
  ) {
    return this._dataSourceService.create(payload.model).pipe(
      tap({
        next: (res) =>
          ctx.setState(
            patch({
              units: append([res]),
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
    return this._dataSourceService
      .getOne(id)
      .pipe(tap((unit) => ctx.patchState({ selectedUnit: unit })));
  }

  @Action(RemoveUnit)
  public removeUnit(
    ctx: StateContext<UnitsStateModel>,
    { payload: { id } }: RemoveUnit
  ) {
    return this._dataSourceService.remove(id).pipe(
      tap({
        next: () =>
          ctx.setState(
            patch({
              units: removeItem((unit) => unit.id === id),
            })
          ),
      })
    );
  }

  @Action(UpdateUnit)
  public updateUnit(
    ctx: StateContext<UnitsStateModel>,
    { id, model }: UnitUpdateParams
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
              units: updateItem((unit) => unit.id === res.id, res),
            })
          ),
      })
    );
  }
}

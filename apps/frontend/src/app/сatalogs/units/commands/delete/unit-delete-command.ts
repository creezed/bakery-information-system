import { inject, Injectable } from '@angular/core';
import {
  ConfirmCommand,
  DELETE_COMMAND_TOKEN,
} from '@bakery-information-system/web/ui';
import { Unit } from '../../models/unit.model';

@Injectable()
export class UnitDeleteCommand extends ConfirmCommand<Unit> {
  constructor() {
    super(inject(DELETE_COMMAND_TOKEN));
  }
}

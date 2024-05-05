import { inject, Injectable } from '@angular/core';
import {
  ConfirmCommand,
  UPDATE_COMMAND_TOKEN,
} from '@bakery-information-system/web/ui';
import { UnitUpdateParams } from './unit-update-params';

@Injectable()
export class UnitUpdateCommand extends ConfirmCommand<UnitUpdateParams> {
  public constructor() {
    super(inject(UPDATE_COMMAND_TOKEN));
  }
}

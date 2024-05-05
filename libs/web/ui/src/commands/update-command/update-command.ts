import { inject, Injectable } from '@angular/core';
import { UPDATE_COMMAND_TOKEN } from './update-command.token';
import { ConfirmCommand } from '../confirm-command';

@Injectable()
export class UpdateCommand<TParams> extends ConfirmCommand<TParams> {
  public constructor() {
    super(inject(UPDATE_COMMAND_TOKEN));
  }
}

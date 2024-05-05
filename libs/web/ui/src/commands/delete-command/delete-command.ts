import { inject, Injectable } from '@angular/core';
import { ConfirmCommand } from '../confirm-command';
import { DELETE_COMMAND_TOKEN } from './delete-command.token';

@Injectable()
export class DeleteCommand<TParams> extends ConfirmCommand<TParams> {
  public constructor() {
    super(inject(DELETE_COMMAND_TOKEN));
  }
}

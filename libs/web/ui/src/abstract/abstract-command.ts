import { Injectable } from '@angular/core';

export interface CommandAppearance {
  readonly label: string;
  readonly icon: string;
}

export interface CommandModel<TParams> extends CommandAppearance {
  execute: (params: TParams) => void;
}

@Injectable()
export abstract class AbstractCommand<TParams = undefined> {
  abstract execute(params: TParams): void;
  abstract get appearance(): CommandAppearance;
}

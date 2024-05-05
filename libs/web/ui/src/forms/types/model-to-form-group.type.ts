import { FormControl } from '@angular/forms';

export type ModelToFormGroupType<TModel> = {
  [P in keyof TModel]: FormControl<TModel[P]>;
};

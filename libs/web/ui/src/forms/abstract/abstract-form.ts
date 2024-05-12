import { FormGroup } from '@angular/forms';
import { ModelToFormGroupType } from '../types';

export abstract class AbstractForm<FormModel, SubmitModel> {
  protected abstract form: FormGroup<ModelToFormGroupType<FormModel>>;
  protected abstract mapFormValueToModel: () => SubmitModel | null;
  protected abstract submitHandler: (model: SubmitModel) => void;

  protected submit(): void {
    if (!this.form.valid) {
      return;
    }

    const model = this.mapFormValueToModel();

    if (!model) {
      return;
    }

    this.submitHandler(model);
  }
}

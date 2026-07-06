import { Component, computed, input, Signal } from '@angular/core';
import { ValidationError, WithOptionalFieldTree } from '@angular/forms/signals';

@Component({
  selector: 'app-field-feedback',
  templateUrl: './field-feed-back.html',
})
export class FieldFeedBack {
  errors = input<readonly WithOptionalFieldTree<ValidationError>[]>([]);
  touched = input<boolean>(false);
  value = input<any>(undefined);
  validMessage = input('Validate');
  showIcon = input(true);
  hasError = computed(() =>
    !!this.errors().length && this.touched()
  );
  isValid = computed(() =>
    !this.errors().length &&
    !!this.value() &&
    this.touched()
  );
  errorMessage = computed(() =>
    this.errors()?.[0]?.message ?? ''
  );
}

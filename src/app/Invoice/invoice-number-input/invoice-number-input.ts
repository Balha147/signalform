import { NgClass } from '@angular/common';
import { Component, input, model } from '@angular/core';
import { FormValueControl, ValidationError, WithOptionalFieldTree } from '@angular/forms/signals';
import { FieldFeedBack } from '../../shared/field-feed-back/field-feed-back';
import { InvoiceNumberDirective } from './invoice-number';

@Component({
  selector: 'app-invoice-number-input',
  imports: [NgClass, FieldFeedBack, InvoiceNumberDirective],
  templateUrl: './invoice-number-input.html',
})
export class InvoiceNumberInput implements FormValueControl<string> {
  value = model<string>('');
  touched = model<boolean>(false);

  errors = input<
    readonly WithOptionalFieldTree<ValidationError>[]
  >([]);

  label = input<string>('');
  placeholder = input<string>('');

  hasValue = () => this.value().length > 0;
}

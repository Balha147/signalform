import {
  Directive,
  ElementRef,
  HostListener,
  inject,
} from '@angular/core';
import { processInvoiceInput } from './utils/invoice-number-logic';

@Directive({
  selector: 'input[appInvoiceNumber]',
})
export class InvoiceNumberDirective {
  private readonly element =
    inject(ElementRef<HTMLInputElement>);

  @HostListener('input')
  onInput(): void {
    const input = this.element.nativeElement;

    const result = processInvoiceInput({
      value: input.value,
      cursor: input.selectionStart ?? 0,
    });

    input.value = result.formatted;

    input.setSelectionRange(
      result.cursor,
      result.cursor
    );
  }
}
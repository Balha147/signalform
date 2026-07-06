import { NgClass } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { form, FormField } from '@angular/forms/signals';
import { InvoiceFormData, initialData, initialItem, invoiceSechma } from '../invoice';
import { InvoiceNumberInput } from '../invoice-number-input/invoice-number-input';
import { InvoiceTotal } from '../invoice-summary/invoice-total/invoice-total';
import { InvoiceService } from '../invoice.service';
import { FieldFeedBack } from '../../shared/field-feed-back/field-feed-back';
import { ClientProfileSnapshot } from '../../clients/client-profile';

@Component({
  selector: 'app-invoice-form',
  imports: [NgClass, FormField, InvoiceNumberInput, InvoiceTotal, FieldFeedBack],
  templateUrl: './invoice-form.html',
})
export class InvoiceForm {
  // Create a form model signal with form fields
  // This represents the form's data structure
  invoiceModel = signal<InvoiceFormData>(initialData);

  // Declare a form from the model and logic rules schema
  invoiceForm = form(this.invoiceModel, invoiceSechma);

  invoiceService = inject(InvoiceService);

  clients = this.invoiceService.clients;

  canRemoveItem = computed(() => this.invoiceModel().items.length > 1);

  selectedClientSnapshot = computed<ClientProfileSnapshot>(() => {
    const client = this.clients().find(c => c.id === this.invoiceModel().clientId);
    if (!client) {
      return { companyName: '', contactName: '', address: '', siret: '' };
    }
    return {
      companyName: client.companyName,
      contactName: client.contactName,
      address: client.address,
      siret: client.siret,
    };
  });

  // Add an empty item line
  addItem() {
    this.invoiceModel.update(data => ({
      ...data,
      items: [...data.items, { ...initialItem }],
    }));
  }

  // Delete an item line
  removeItem(index: number) {
    this.invoiceModel.update(data => ({
      ...data,
      items: data.items.filter((_, i) => i !== index),
    }));
  }

}

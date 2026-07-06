import { Component, inject, signal } from '@angular/core';
import { form, FormField, submit } from '@angular/forms/signals';
import { ClientCreate, ClientProfile, clientSchema, initialClientProfile } from '../client-profile';
import { ClientService } from '../client.service';
import { NgClass } from '@angular/common';
import { FieldFeedBack } from '../../shared/field-feed-back/field-feed-back';

@Component({
  selector: 'app-client-profile-form',
  imports: [FormField, NgClass, FieldFeedBack],
  templateUrl: './client-profile-form.html',
})
export class ClientProfileForm {

  private readonly clientService = inject(ClientService);

  clientModel = signal<ClientProfile>({ ...initialClientProfile });

  clientForm = form(this.clientModel, clientSchema);

  onFormSubmit(event: Event) {
    event.preventDefault();
    this.onSubmit();
  }

  onSubmit() {
    submit(this.clientForm, async () => {
      const formData = this.clientModel();
      const clientPayload: ClientCreate = {
        companyName: formData.companyName,
        contactName: formData.contactName,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        siret: formData.siret,
        preferredContact: formData.preferredContact
      };
      try {
        await this.clientService.create(clientPayload);
        this.onSuccess();
      } catch (err) {
        console.error("Erreur lors de l'enregistrement du client", err);
      }
    });
  }

  onCancel() {
    this.onSuccess();
  }

  private onSuccess() {
    this.clientForm().reset(initialClientProfile);
  }
}
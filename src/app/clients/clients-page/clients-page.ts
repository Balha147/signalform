import { Component } from '@angular/core';
import { ClientProfileForm } from '../client-profile-form/client-profile-form';
import { ClientsList } from '../clients-list/clients-list';

@Component({
  selector: 'app-clients-page',
  imports: [ClientProfileForm, ClientsList],
  templateUrl: './clients-page.html',
})
export class ClientsPage { }

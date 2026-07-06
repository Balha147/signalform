import { Component, computed, inject, signal } from '@angular/core';
import { ClientService } from '../client.service';
import { Search } from '../../shared/search/search';
import { ClientProfile } from '../client-profile';

@Component({
  selector: 'app-clients-list',
  imports: [Search],
  templateUrl: './clients-list.html',
})
export class ClientsList {
  private readonly clientService = inject(ClientService);

  readonly clients = this.clientService.clients;
  readonly totalClients = this.clientService.totalClients;

  clientToDelete = signal<ClientProfile | null>(null);
  isDeleting = signal(false);

  filterCriteria = signal('');

  filteredClients = computed(() => {
    const criteria = this.filterCriteria().toLocaleLowerCase().trim();

    if (!criteria) {
      return this.clients();
    }

    try {
      return this.clients().filter(client =>
        client.companyName.toLocaleLowerCase().includes(criteria) ||
        client.siret.toString().includes(criteria) ||
        client.email.toLocaleLowerCase().includes(criteria)
      );
    } catch (error) {
      console.error(error);
      return [];
    }
  });

  requestDeleteClient(client: ClientProfile) {
    this.clientToDelete.set(client);
  }

  cancelDelete() {
    this.clientToDelete.set(null);
  }

  async confirmDelete() {
    const client = this.clientToDelete();
    if (!client) return;

    this.isDeleting.set(true);
    try {
      await this.clientService.delete(client.id);
      this.clientToDelete.set(null);
    } catch (error) {
      console.error('Erreur lors de la suppression', error);
    } finally {
      this.isDeleting.set(false);
    }
  }
}

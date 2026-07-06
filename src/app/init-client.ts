import { inject } from '@angular/core';
import { ClientService } from './clients/client.service';

export function initClients() {
    const clientService = inject(ClientService);
    return clientService.init();
}
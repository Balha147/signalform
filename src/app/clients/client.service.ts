import { computed, inject, Service, signal } from "@angular/core";
import { ClientProfile } from "./client-profile";
import { DbService } from '../db.service';

@Service()
export class ClientService {
    private readonly _clients = signal<ClientProfile[]>([]);

    readonly clients = this._clients.asReadonly();

    readonly totalClients = computed(() =>
        this._clients().length
    );

    private db = inject(DbService);
    constructor() {
        this.init();
    }

    async init() {
        const data = await this.db.getAll<ClientProfile>('clients');
        this._clients.set(data);
    }

    getById(id: string): ClientProfile | undefined {
        return this._clients().find(c => c.id === id);
    }

    async create(client: Omit<ClientProfile, 'id' | 'createdAt'>) {
        const newClient: ClientProfile = {
            ...client,
            id: crypto.randomUUID(),
            createdAt: new Date()
        };
        await this.db.put('clients', newClient);
        this._clients.update(list => [...list, newClient]);
    }

    async delete(id: string) {
        await this.db.delete('clients', id);
        this._clients.update(list => list.filter(c => c.id !== id));
    }


    async reload() {
        const data = await this.db.getAll<ClientProfile>('clients');
        this._clients.set(data);
    }
}
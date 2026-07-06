import { Injectable } from '@angular/core';
import { openDB, IDBPDatabase } from 'idb';
import { ClientProfile } from './clients/client-profile';
import { InvoiceFormData } from './Invoice/invoice';

export interface AppDB {
    clients: ClientProfile;
    invoices: InvoiceFormData;
}

@Injectable({ providedIn: 'root' })
export class DbService {

    private dbPromise: Promise<IDBPDatabase<any>>;

    constructor() {
        this.dbPromise = openDB('app-db', 1, {
            upgrade(db) {

                if (!db.objectStoreNames.contains('clients')) {
                    db.createObjectStore('clients', {
                        keyPath: 'id'
                    });
                }

                if (!db.objectStoreNames.contains('invoices')) {
                    const store = db.createObjectStore('invoices', {
                        keyPath: 'id'
                    });

                    // relation client → invoices
                    store.createIndex('by-client', 'clientId');
                }
            }
        });
    }

    private async db() {
        return await this.dbPromise;
    }

    async getAll<T = any>(storeName: string): Promise<T[]> {
        const db = await this.db();
        return db.getAll(storeName);
    }

    async getById<T = any>(storeName: string, id: string): Promise<T | undefined> {
        const db = await this.db();
        return db.get(storeName, id);
    }

    async put<T = any>(storeName: string, value: T): Promise<void> {
        const db = await this.db();
        await db.put(storeName, value);
    }

    async delete(storeName: string, id: string): Promise<void> {
        const db = await this.db();
        await db.delete(storeName, id);
    }

    async getInvoicesByClient(clientId: string): Promise<InvoiceFormData[]> {
        const db = await this.db();
        return db.getAllFromIndex('invoices', 'by-client', clientId);
    }

    async clearStore(storeName: keyof AppDB) {
        const db = await this.db();
        await db.clear(storeName);
    }
}
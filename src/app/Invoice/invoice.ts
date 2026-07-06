import { applyEach, min, pattern, required, schema, SchemaPathTree, validate } from "@angular/forms/signals";
import { ClientProfile, ClientProfileSnapshot } from "../clients/client-profile";

export interface InvoiceItem {
    description: string;
    quantity: number;
    price: number;
}

export interface InvoiceFormData {
    clientId: string;
    clientSnapshot: ClientProfileSnapshot
    invoiceNumber: string;
    items: InvoiceItem[];
}

export const initialItem: InvoiceItem = {
    description: '',
    quantity: 1,
    price: 0,
};

export interface InvoicePdfModel {
    invoiceNumber: string;
    customer: ClientProfileSnapshot;
    items: InvoiceItem[];
    totals: InvoiceTotals;
    issuedAt: Date;
};

export const initialData: InvoiceFormData = {
    clientId: '',
    clientSnapshot: { companyName: '', contactName: '', address: '', siret: '' },
    invoiceNumber: '',
    items: [{ ...initialItem }],
};

export interface InvoiceTotals {
    subtotalHT: number;
    tvaAmount: number;
    totalTTC: number;
}

export const invoiceSechma = schema<InvoiceFormData>(rootPath => {
    required(rootPath.clientId, { message: 'Veuillez sélectionner un client' });
    required(rootPath.invoiceNumber, { message: 'Invoice number is required' });
    pattern(rootPath.invoiceNumber, /^DEV-\d{4}-(0[1-9]|1[0-2])$/, {
        message: 'Format must be DEV-YYYY-MM (MM between 01 and 12)',
    });
    validate(rootPath, (ctx) => {
        const { clientId, clientSnapshot } = ctx.value();
        if (clientId && !clientSnapshot.companyName) {
            return { kind: 'inconsistentSnapshot', message: 'Erreur interne : données client manquantes' };
        }
        return undefined;
    });
    applyEach(rootPath.items, itemSchema);
});

function itemSchema(item: SchemaPathTree<InvoiceItem>) {
    required(item.description, { message: 'La désignation est requise' });
    min(item.quantity, 1, { message: 'La quantité doit être au moins 1' });
    min(item.price, 0, { message: 'Le prix doit être positif' });
}
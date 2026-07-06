import { inject, Service, signal } from "@angular/core";
import { ClientProfile } from "../clients/client-profile";
import { DbService } from "../db.service";
import { InvoiceItem, InvoiceTotals } from "./invoice";

@Service()
export class InvoiceService {
    readonly clients = signal<ClientProfile[]>([]);

    private readonly db = inject(DbService);

    constructor() {
        this.init();
    }

    async init() {
        try {
            const clients = await this.db.getAll<ClientProfile>('clients');
            this.clients.set(clients);
        } catch (err) {
            console.error('Erreur lors du chargement des clients', err);
        }
    }

    getById(id: string): ClientProfile | undefined {
        return this.clients().find(i => i.id === id);
    }

    /**
    * Default VAT rate (20%).
    * Passed as a parameter to methods to stay flexible
    * (e.g. reduced rate depending on the type of service).
    */
    readonly defaultTvaRate = 0.20;

    /**
     * Computes the pre-tax total for a single line (quantity * unit price).
     * Guards against undefined/NaN values while the user is typing.
     */
    computeLineTotal(item: InvoiceItem): number {
        const quantity = Number.isFinite(item.quantity) ? item.quantity : 0;
        const price = Number.isFinite(item.price) ? item.price : 0;
        return quantity * price;
    }

    /**
     * Computes the pre-tax subtotal across all line items.
     */
    computeSubtotalHT(items: readonly InvoiceItem[]): number {
        return this.roundToCents(
            items.reduce((sum, item) => sum + this.computeLineTotal(item), 0)
        );
    }

    /**
     * Computes the VAT amount from a pre-tax subtotal.
     * @param subtotalHT Pre-tax subtotal
     * @param tvaRate VAT rate (0.20 = 20%), defaults to the service's rate
     */
    computeTva(subtotalHT: number, tvaRate: number = this.defaultTvaRate): number {
        return this.roundToCents(subtotalHT * tvaRate);
    }

    /**
     * Computes the total including tax.
     */
    computeTotalTTC(subtotalHT: number, tvaAmount: number): number {
        return this.roundToCents(subtotalHT + tvaAmount);
    }

    /**
     * Computes all totals at once (handy for a single call instead of
     * chaining computed() signals one by one on the component side).
     */
    computeTotals(items: readonly InvoiceItem[], tvaRate: number = this.defaultTvaRate): InvoiceTotals {
        const subtotalHT = this.computeSubtotalHT(items);
        const tvaAmount = this.computeTva(subtotalHT, tvaRate);
        const totalTTC = this.computeTotalTTC(subtotalHT, tvaAmount);
        return { subtotalHT, tvaAmount, totalTTC };
    }

    /**
     * Total number of line items.
     */
    countItems(items: readonly InvoiceItem[]): number {
        return items.length;
    }

    /**
     * Total quantity across all line items (e.g. "12 units total").
     */
    countTotalUnits(items: readonly InvoiceItem[]): number {
        return items.reduce((sum: number, item: InvoiceItem) => sum + (Number.isFinite(item.quantity) ? item.quantity : 0), 0);
    }

    /**
     * Rounds to 2 decimal places to avoid classic JS floating-point
     * rounding errors (e.g. 0.1 + 0.2 !== 0.3).
     */
    private roundToCents(value: number): number {
        return Math.round((value + Number.EPSILON) * 100) / 100;
    }
}
import { Component, computed, inject, injectAsync, input, signal } from '@angular/core';
import { InvoiceFormData, InvoiceItem, InvoiceTotals } from '../../invoice';
import { CurrencyPipe } from '@angular/common';
import { InvoiceService } from '../../invoice.service';
import { ClientProfileSnapshot } from '../../../clients/client-profile';

@Component({
  selector: 'app-invoice-total',
  imports: [CurrencyPipe],
  templateUrl: './invoice-total.html',
})
export class InvoiceTotal {
  private readonly invoiceSummaryService = inject(InvoiceService);

  private readonly invoicePdfService =
    injectAsync(
      () =>
        import('../../invoice-pdf.service')
          .then(m => m.InvoicePdfService)
    );

  readonly items = input.required<readonly InvoiceItem[]>();
  readonly tvaRate = input<number>(this.invoiceSummaryService.defaultTvaRate);

  readonly subtotalHT = computed(() => this.invoiceSummaryService.computeSubtotalHT(this.items()));
  readonly tvaAmount = computed(() => this.invoiceSummaryService.computeTva(this.subtotalHT(), this.tvaRate()));
  readonly totalTTC = computed(() => this.invoiceSummaryService.computeTotalTTC(this.subtotalHT(), this.tvaAmount()));

  readonly tvaRatePercent = computed(() => this.tvaRate() * 100);
  readonly totalUnits = computed(() => this.invoiceSummaryService.countTotalUnits(this.items()));
  readonly isGeneratingPdf = signal(false);
  readonly invoiceNumber = input.required<string>();
  readonly customer = input.required<ClientProfileSnapshot>();

  async onGeneratePdf() {
    if (this.isGeneratingPdf()) return;

    this.isGeneratingPdf.set(true);
    try {
      const service = await this.invoicePdfService();

      const totals: InvoiceTotals = {
        subtotalHT: this.subtotalHT(),
        tvaAmount: this.tvaAmount(),
        totalTTC: this.totalTTC(),
      };

      await service.download({
        invoiceNumber: this.invoiceNumber(),
        customer: this.customer(),
        items: [...this.items()],
        totals,
        issuedAt: new Date(),
      });
    } catch (error) {
      console.error('Échec de la génération du PDF', error);
    } finally {
      this.isGeneratingPdf.set(false);
    }
  }
}

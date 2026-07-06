// invoice-pdf.service.ts
import { inject, Service } from '@angular/core';
import { PdfLoaderService } from './pdf-loader.service';
import { InvoicePdfModel } from './invoice';
import { buildInvoiceDocument } from './invoice-document';

@Service()
export class InvoicePdfService {
    private readonly loader = inject(PdfLoaderService);

    async download(invoice: InvoicePdfModel, filename = `${invoice.invoiceNumber}.pdf`) {
        const pdfMake = await this.loader.load();
        const documentDefinition = buildInvoiceDocument(invoice);
        pdfMake.createPdf(documentDefinition).download(filename);
    }

    async open(invoice: InvoicePdfModel) {
        const pdfMake = await this.loader.load();
        pdfMake.createPdf(buildInvoiceDocument(invoice)).open();
    }
}
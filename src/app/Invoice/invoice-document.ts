import { TDocumentDefinitions } from "pdfmake/interfaces";
import { InvoicePdfModel } from "./invoice";

export function buildInvoiceDocument(
    invoice: InvoicePdfModel
): TDocumentDefinitions {
    return {
        content: [
            {
                text: 'FACTURE',
                style: 'title'
            },
            {
                columns: [
                    [
                        {
                            text: invoice.customer.companyName,
                            bold: true
                        },
                        invoice.customer.address,
                        invoice.customer.siret
                    ],
                    [
                        {
                            text: invoice.invoiceNumber,
                            alignment: 'right'
                        },
                        invoice.issuedAt.toLocaleDateString()
                    ]
                ]
            },

            {
                margin: [0, 20, 0, 20],
                table: {
                    widths: ['*', 60, 70, 80],
                    body: [
                        [
                            'Description',
                            'Qté',
                            'PU',
                            'Total'
                        ],
                        ...invoice.items.map(item => [
                            item.description,
                            item.quantity,
                            `${item.price} €`,
                            `${item.price * item.quantity} €`
                        ])
                    ]
                }
            },
            {
                alignment: 'right',
                table: {
                    body: [
                        ['HT', invoice.totals.subtotalHT],
                        ['TVA', invoice.totals.tvaAmount],
                        ['TTC', invoice.totals.totalTTC]
                    ]
                }
            }
        ]
    };
}
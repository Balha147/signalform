export const INVOICE_PREFIX = 'DEV-';
export const MAX_DIGITS = 6;

export function formatInvoiceNumber(value: string): string {
    const clean = value.replace(/\D/g, '').substring(0, MAX_DIGITS);

    if (!clean) return '';

    const year = clean.substring(0, 4);
    const month = clean.substring(4, 6);

    let formatted = `${INVOICE_PREFIX}${year}`;

    if (month) {
        formatted += `-${month}`;
    }

    return formatted;
}

export function countDigitsBeforeCursor(value: string, cursor: number): number {
    return value.substring(0, cursor).replace(/\D/g, '').length;
}

export function computeCursorPosition(
    formatted: string,
    digitsBeforeCursor: number
): number {
    if (digitsBeforeCursor <= 0) return 0;

    let seen = 0;

    for (let i = 0; i < formatted.length; i++) {
        if (/\d/.test(formatted[i])) {
            seen++;
            if (seen === digitsBeforeCursor) return i + 1;
        }
    }

    return formatted.length;
}

export function processInvoiceInput(params: {
    value: string;
    cursor: number;
}) {
    const digitsBeforeCursor = countDigitsBeforeCursor(
        params.value,
        params.cursor
    );

    const formatted = formatInvoiceNumber(params.value);

    const newCursor = computeCursorPosition(
        formatted,
        digitsBeforeCursor
    );

    return {
        formatted,
        cursor: newCursor,
    };
}
export interface Address {
    street: string;
    city: string;
    postCode: string;
    country: string;
}

export interface Item {
    id: string;
    name: string;
    quantity: number;
    price: number;
    total: number;
}

type InvoiceStatus = 'paid' | 'pending' | 'draft';

export interface Invoice {
    id: string; // e.g., RT3080
    createdAt: string; // YYYY-MM-DD
    paymentDue: string; // YYYY-MM-DD
    description: string;
    paymentTerms: number; // in days
    clientName: string;
    clientEmail: string;
    status: InvoiceStatus;
    senderAddress: Address;
    clientAddress: Address;
    items: Item[];
    total: number;
}

// For new invoices, ID might be generated, and total calculated
export type NewInvoice = Omit<Invoice, 'id' | 'total' | 'status'> & { status?: InvoiceStatus };
export type UpdatableInvoiceFields = Partial<Omit<Invoice, 'id'>>;
export type { InvoiceStatus };

import type { Item } from "../types";

export const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
    };
    return date.toLocaleDateString('en-GB', options); // e.g., 19 Aug 2021
};

export const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-GB', {
        style: 'currency',
        currency: 'GBP',
    }).format(amount);
};

export const generateInvoiceId = (): string => {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = '0123456789';
    let id = '';
    for (let i = 0; i < 2; i++) {
        id += letters.charAt(Math.floor(Math.random() * letters.length));
    }
    for (let i = 0; i < 4; i++) {
        id += numbers.charAt(Math.floor(Math.random() * numbers.length));
    }
    return id;
};

export const generateItemId = (): string => {
    return crypto.randomUUID?.() ?? `item-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

export const calculatePaymentDue = (createdAt: string, paymentTerms: number): string => {
    const date = new Date(createdAt);
    date.setDate(date.getDate() + paymentTerms);
    return date.toISOString().split('T')[0]; // YYYY-MM-DD
};

export const calculateItemTotal = (quantity: number, price: number): number => {
    return parseFloat((quantity * price).toFixed(2));
};

export const calculateInvoiceTotal = (items: Item[]): number => {
    return parseFloat(items.reduce((sum, item) => sum + item.total, 0).toFixed(2));
};

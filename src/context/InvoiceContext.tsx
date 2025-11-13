import React, { createContext, useState, useEffect, useCallback, type ReactNode } from 'react';
import type { Invoice, NewInvoice } from '../types';
import initialData from '../data/data.json';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { generateInvoiceId, calculateInvoiceTotal, calculatePaymentDue, calculateItemTotal } from '../utils/helpers';

const INVOICES_STORAGE_KEY = 'invoicesApp_invoices';

interface InvoiceContextType {
    invoices: Invoice[];
    getInvoiceById: (id: string) => Invoice | undefined;
    addInvoice: (newInvoiceData: NewInvoice, asDraft?: boolean) => Invoice;
    isLoading: boolean;
    isFormOpen: boolean;
    setIsFormOpen: React.Dispatch<React.SetStateAction<boolean>>;
    activeInvoiceId: string | null;
    setActiveInvoiceId: React.Dispatch<React.SetStateAction<string | null>>;
    openNewInvoiceForm: () => void;
    closeInvoiceForm: () => void;
}

export const InvoiceContext = createContext<InvoiceContextType | undefined>(undefined);

export const InvoiceProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [storedInvoices, setStoredInvoices] = useLocalStorage<Invoice[]>(INVOICES_STORAGE_KEY, []);
    const [isLoading, setIsLoading] = useState(true);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [activeInvoiceId, setActiveInvoiceId] = useState<string | null>(null);


    useEffect(() => {
        const dataFromStorage = localStorage.getItem(INVOICES_STORAGE_KEY);
        if (!dataFromStorage || JSON.parse(dataFromStorage).length === 0) {
            console.log("Initializing from data.json");
            setStoredInvoices(initialData as Invoice[]);
        }
        setIsLoading(false);
    }, [setStoredInvoices]);


    const getInvoiceById = useCallback((id: string): Invoice | undefined => {
        return storedInvoices.find(invoice => invoice.id === id);
    }, [storedInvoices]);

    const addInvoice = useCallback((newInvoiceData: NewInvoice, asDraft: boolean = false): Invoice => {
        const fullItems = newInvoiceData.items.map(item => ({
            ...item,
            total: calculateItemTotal(item.quantity, item.price)
        }));
        const total = calculateInvoiceTotal(fullItems);
        const newInvoice: Invoice = {
            ...newInvoiceData,
            id: activeInvoiceId || generateInvoiceId(),
            createdAt: newInvoiceData.createdAt || new Date().toISOString().split('T')[0],
            paymentDue: newInvoiceData.paymentDue || calculatePaymentDue(
                newInvoiceData.createdAt || new Date().toISOString().split('T')[0], 
                newInvoiceData.paymentTerms
            ),
            status: asDraft ? 'draft' : 'pending',
            items: fullItems,
            total: total,
        };
        setStoredInvoices(prev => [newInvoice, ...prev]);
        return newInvoice;
    }, [setStoredInvoices, activeInvoiceId]);

    const openNewInvoiceForm = () => {
        setActiveInvoiceId(generateInvoiceId());
        setIsFormOpen(true);
    };

    const closeInvoiceForm = () => {
        setIsFormOpen(false);
        setActiveInvoiceId(null);
    };


    return (
        <InvoiceContext.Provider value={{
            invoices: storedInvoices,
            getInvoiceById,
            addInvoice,
            isLoading,
            isFormOpen,
            setIsFormOpen,
            activeInvoiceId,
            setActiveInvoiceId,
            openNewInvoiceForm,
            closeInvoiceForm
        }}>
            {children}
        </InvoiceContext.Provider>
    );
};

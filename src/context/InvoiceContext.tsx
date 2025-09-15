import React, { createContext, useState, useEffect, type ReactNode } from 'react';
import type { Invoice } from '../types';
import initialData from '../data/data.json';
import { useLocalStorage } from '../hooks/useLocalStorage';

const INVOICES_STORAGE_KEY = 'invoicesApp_invoices';

interface InvoiceContextType {
    invoices: Invoice[];
    isLoading: boolean;
    isFormOpen: boolean;
    setIsFormOpen: React.Dispatch<React.SetStateAction<boolean>>;
    openNewInvoiceForm: () => void;
    closeInvoiceForm: () => void;
}

export const InvoiceContext = createContext<InvoiceContextType | undefined>(undefined);

export const InvoiceProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [storedInvoices, setStoredInvoices] = useLocalStorage<Invoice[]>(INVOICES_STORAGE_KEY, []);
    const [isLoading, setIsLoading] = useState(true);
    const [isFormOpen, setIsFormOpen] = useState(false);

    useEffect(() => {
        const dataFromStorage = localStorage.getItem(INVOICES_STORAGE_KEY);
        if (!dataFromStorage || JSON.parse(dataFromStorage).length === 0) {
            console.log("Initializing from data.json");
            setStoredInvoices(initialData as Invoice[]);
        }
        setIsLoading(false);
    }, [setStoredInvoices]);

    const openNewInvoiceForm = () => {
        setIsFormOpen(true);
    };

    const closeInvoiceForm = () => {
        setIsFormOpen(false);
    };

    return (
        <InvoiceContext.Provider value={{
            invoices: storedInvoices,
            isLoading,
            isFormOpen,
            setIsFormOpen,
            openNewInvoiceForm,
            closeInvoiceForm
        }}>
            {children}
        </InvoiceContext.Provider>
    );
};
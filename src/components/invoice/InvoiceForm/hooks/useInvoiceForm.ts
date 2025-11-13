import { useState, useEffect, useCallback, useMemo } from 'react';
import type { Invoice, Item as InvoiceItemType } from '../../../../types';
import { calculateItemTotal, calculatePaymentDue, generateItemId } from '../../../../utils/helpers';
import { FormErrors } from '../types';

const defaultItem: Omit<InvoiceItemType, 'id'> = { name: '', quantity: 1, price: 0, total: 0 };
const defaultAddress = { street: '', city: '', postCode: '', country: '' };

const getInitialFormData = (
    initialInvoice: Invoice | null | undefined,
): Omit<Invoice, 'id' | 'total' | 'status'> => {
    if (initialInvoice) {
        return {
            createdAt: initialInvoice.createdAt,
            paymentDue: initialInvoice.paymentDue,
            description: initialInvoice.description,
            paymentTerms: initialInvoice.paymentTerms,
            clientName: initialInvoice.clientName,
            clientEmail: initialInvoice.clientEmail,
            senderAddress: { ...initialInvoice.senderAddress },
            clientAddress: { ...initialInvoice.clientAddress },
            items: initialInvoice.items.map(item => ({ ...item })),
        };
    }
    return {
        createdAt: new Date().toISOString().split('T')[0],
        paymentDue: '',
        description: '',
        paymentTerms: 30,
        clientName: '',
        clientEmail: '',
        senderAddress: { ...defaultAddress },
        clientAddress: { ...defaultAddress },
        items: [{
            ...defaultItem,
            id: generateItemId()
        }],
    };
};

export const useInvoiceForm = (
    initialInvoice: Invoice | null | undefined,
    isOpen: boolean
) => {
    const [formData, setFormData] = useState(() => getInitialFormData(initialInvoice));
    const [initialData, setInitialData] = useState(() => getInitialFormData(initialInvoice));
    const [errors, setErrors] = useState<FormErrors>({});
    const [touched, setTouched] = useState<Set<string>>(new Set());

    const isDirty = useMemo(
        () => JSON.stringify(formData) !== JSON.stringify(initialData),
        [formData, initialData]
    );

    // Reset form when modal opens
    useEffect(() => {
        if (isOpen) {
            const newFormData = getInitialFormData(initialInvoice);
            setFormData(newFormData);
            setInitialData(newFormData);
            setErrors({});
            setTouched(new Set());
        }
    }, [isOpen, initialInvoice]);

    // Auto-calculate payment due date
    useEffect(() => {
        if (formData.createdAt && formData.paymentTerms) {
            const newPaymentDue = calculatePaymentDue(formData.createdAt, formData.paymentTerms);
            if (newPaymentDue !== formData.paymentDue) {
                setFormData(prev => ({ ...prev, paymentDue: newPaymentDue }));
            }
        }
    }, [formData.createdAt, formData.paymentTerms]);

    const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        const [section, field, indexStr] = name.split('.');

        setTouched(prev => new Set(prev).add(name));

        if (section === 'senderAddress' || section === 'clientAddress') {
            setFormData(prev => ({
                ...prev,
                [section]: { ...prev[section], [field]: value },
            }));
        } else if (section === 'items') {
            const index = parseInt(indexStr, 10);
            setFormData(prev => {
                const newItems = [...prev.items];
                const itemToUpdate: InvoiceItemType = { ...newItems[index] };
                if (field === 'quantity' || field === 'price') {
                    const numValue = parseFloat(value) || 0;
                    itemToUpdate[field] = numValue;
                    itemToUpdate.total = calculateItemTotal(itemToUpdate.quantity, itemToUpdate.price);
                } else if (field === 'name') {
                    itemToUpdate.name = value;
                }
                newItems[index] = itemToUpdate;
                return { ...prev, items: newItems };
            });
        } else {
            setFormData(prev => ({ 
                ...prev, 
                [name]: name === 'paymentTerms' ? parseInt(value) || 30 : value 
            }));
        }

        if (errors[name as keyof FormErrors]) {
            setErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors[name as keyof FormErrors];
                return newErrors;
            });
        }
    }, [errors]);

    const handleAddItem = useCallback(() => {
        const newItem: InvoiceItemType = {
            ...defaultItem,
            id: generateItemId()
        };
        setFormData(prev => ({
            ...prev,
            items: [...prev.items, newItem],
        }));
    }, []);

    const handleRemoveItem = useCallback((index: number) => {
        if (formData.items.length === 1) {
            setErrors(prev => ({ ...prev, items: 'Invoice must have at least one item' }));
            return;
        }
        setFormData(prev => ({
            ...prev,
            items: prev.items.filter((_, i) => i !== index),
        }));
        setErrors(prev => {
            const newErrors = { ...prev };
            delete newErrors.items;
            return newErrors;
        });
    }, [formData.items.length]);

    return {
        formData,
        errors,
        touched,
        isDirty,
        isEditing: !!initialInvoice,
        handleChange,
        handleAddItem,
        handleRemoveItem,
        setErrors,
        setTouched,
    };
};
import { useCallback } from 'react';
import type { Invoice } from '../../../../types';
import { FormErrors } from '../types';

const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

export const useInvoiceValidation = () => {
    const validateForm = useCallback((formData: Omit<Invoice, 'id' | 'total' | 'status'>): { 
        isValid: boolean; 
        errors: FormErrors 
    } => {
        const newErrors: FormErrors = {};

        if (!formData.clientName.trim()) {
            newErrors.clientName = 'Client name is required';
        }

        if (!formData.clientEmail.trim()) {
            newErrors.clientEmail = 'Client email is required';
        } else if (!validateEmail(formData.clientEmail)) {
            newErrors.clientEmail = 'Please enter a valid email address';
        }

        if (!formData.description.trim()) {
            newErrors.description = 'Project description is required';
        }

        if (formData.items.length === 0) {
            newErrors.items = 'At least one item is required';
        } else {
            const hasInvalidItem = formData.items.some(item => 
                !item.name.trim() || item.quantity <= 0 || item.price < 0
            );
            if (hasInvalidItem) {
                newErrors.items = 'All items must have a name, positive quantity, and valid price';
            }
        }

        return {
            isValid: Object.keys(newErrors).length === 0,
            errors: newErrors
        };
    }, []);

    return { validateForm };
};
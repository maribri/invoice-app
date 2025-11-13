import React, { useState, useEffect, useCallback } from 'react';
import styles from './InvoiceForm.module.scss';
import type { Invoice, NewInvoice } from '../../../types';
import { useInvoices } from '../../../hooks/useInvoices';
import { calculateItemTotal, calculateInvoiceTotal } from '../../../utils/helpers';
import { useInvoiceForm } from './hooks/useInvoiceForm';
import { useInvoiceValidation } from './hooks/useInvoiceValidation';
import FormField from "../../common/FormField/FormField";
import Input from "../../common/Input/Input";
import Select from "../../common/Select/Select";
import AddressFields from './components/AddressFields';
import BillToSection from './components/BillToSection';
import ItemList from './components/ItemList/ItemList';
import FormActions from './components/FormActions';

interface InvoiceFormProps {
    isOpen: boolean;
    onClose: () => void;
    initialInvoice?: Invoice | null;
}

const InvoiceForm: React.FC<InvoiceFormProps> = ({ isOpen, onClose, initialInvoice }) => {
    const { addInvoice } = useInvoices();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const {
        formData,
        errors,
        touched,
        isDirty,
        isEditing,
        handleChange,
        handleAddItem,
        handleRemoveItem,
        setErrors,
        setTouched,
    } = useInvoiceForm(initialInvoice, isOpen);

    const { validateForm } = useInvoiceValidation();

    const handleClose = useCallback(() => {
        if (isDirty && !isSubmitting) {
            const confirmClose = window.confirm(
                'You have unsaved changes. Are you sure you want to discard them?'
            );
            if (!confirmClose) return;
        }
        onClose();
    }, [isDirty, isSubmitting, onClose]);

    // Keyboard support (ESC to close)
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && isOpen) {
                handleClose();
            }
        };
        window.addEventListener('keydown', handleEscape);
        return () => window.removeEventListener('keydown', handleEscape);
    }, [isOpen, handleClose]);

    const handleSubmit = useCallback(async (asDraft: boolean = false) => {
        if (!asDraft) {
            const { isValid, errors: validationErrors } = validateForm(formData);
            if (!isValid) {
                setErrors(validationErrors);
                const allFields = new Set<string>([
                    'clientName',
                    'clientEmail',
                    'description',
                    ...formData.items.map((_, i) => `items.name.${i}`)
                ]);
                setTouched(allFields);
                return;
            }
        }

        setIsSubmitting(true);
        setErrors({});

        try {
            if (isEditing && initialInvoice) {
                const updatedFields: Partial<Invoice> = {
                    ...formData,
                    items: formData.items.map(item => ({
                        ...item,
                        total: calculateItemTotal(item.quantity, item.price)
                    })),
                };
                updatedFields.total = calculateInvoiceTotal(updatedFields.items!);
                
                if (!asDraft && initialInvoice.status === 'draft') {
                    updatedFields.status = 'pending';
                } else if (asDraft) {
                    updatedFields.status = 'draft';
                }

            } else {
                const invoicePayload: NewInvoice = {
                    ...formData,
                    status: asDraft ? 'draft' : 'pending',
                };
                addInvoice(invoicePayload, asDraft);
            }

            onClose();
        } catch (error) {
            console.error('Error saving invoice:', error);
            setErrors({ general: 'Failed to save invoice. Please try again.' });
        } finally {
            setIsSubmitting(false);
        }
    }, [formData, isEditing, initialInvoice, validateForm, addInvoice, onClose, setErrors, setTouched]);

    if (!isOpen) return null;

    return (
        <div className={styles.overlay} onClick={handleClose}>
            <div 
                className={`${styles.panel} ${isOpen ? styles['panel--opened'] : ''}`} 
                onClick={(e) => e.stopPropagation()}
                role="dialog"
                aria-modal="true"
                aria-labelledby="invoice-form-title"
            >
                <form 
                    className={styles.form} 
                    onSubmit={(e) => e.preventDefault()}
                    noValidate
                >
                    <h2 id="invoice-form-title" className={styles.form__header}>
                        {isEditing ? (
                            <>Edit <span className={styles.form__hash}>#</span>{initialInvoice?.id}</>
                        ) : (
                            'New Invoice'
                        )}
                    </h2>

                    {errors.general && (
                        <div className={styles.form__error} role="alert">
                            {errors.general}
                        </div>
                    )}

                    <AddressFields 
                        prefix="senderAddress"
                        address={formData.senderAddress}
                        onChange={handleChange}
                        legend="Bill From"
                        autoFocusFirst={true}
                    />

                    <BillToSection
                        clientName={formData.clientName}
                        clientEmail={formData.clientEmail}
                        clientAddress={formData.clientAddress}
                        errors={{ clientName: errors.clientName, clientEmail: errors.clientEmail }}
                        touched={touched}
                        onChange={handleChange}
                    />

                    <fieldset className={styles.form__section}>
                        <div className={`${styles.form__row} ${styles['form__row--2col']}`}>
                            <FormField inputId="createdAt" label="Invoice Date">
                                <Input 
                                    type="date" 
                                    id="createdAt" 
                                    value={formData.createdAt} 
                                    onChange={handleChange} 
                                />
                            </FormField>
                            <FormField inputId="paymentTerms" label="Payment Terms">
                                <Select 
                                    id="paymentTerms" 
                                    value={formData.paymentTerms} 
                                    onChange={handleChange} 
                                />
                            </FormField>
                        </div>
                        <FormField 
                            inputId="description" 
                            label="Project Description"
                            error={touched.has('description') ? errors.description : undefined}
                        >
                            <Input 
                                type="text" 
                                id="description" 
                                value={formData.description} 
                                placeholder="e.g. Graphic Design Service" 
                                onChange={handleChange}
                                aria-invalid={!!errors.description}
                                aria-describedby={errors.description ? "description-error" : undefined}
                                required
                            />
                        </FormField>
                    </fieldset>

                    <ItemList
                        items={formData.items}
                        error={errors.items}
                        onChange={handleChange}
                        onAdd={handleAddItem}
                        onRemove={handleRemoveItem}
                    />

                    <FormActions
                        isEditing={isEditing}
                        isSubmitting={isSubmitting}
                        onClose={handleClose}
                        onSave={() => handleSubmit(false)}
                        onSaveAsDraft={!isEditing ? () => handleSubmit(true) : undefined}
                    />
                </form>
            </div>
        </div>
    );
};

export default InvoiceForm;
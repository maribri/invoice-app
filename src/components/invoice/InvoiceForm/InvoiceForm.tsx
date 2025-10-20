import React, {useState, useEffect } from 'react';
import styles from './InvoiceForm.module.scss';
import type { Invoice, Item as InvoiceItemType } from '../../../types';
import FormField from "../../common/FormField/FormField";
import Input from "../../common/Input/Input";
import Select from "../../common/Select/Select";
import Button from "../../common/Button/Button";
import { IconDelete } from '../../../assets/icons';

interface InvoiceFormProps {
    isOpen: boolean;
    onClose: () => void;
    initialInvoice?: Invoice | null;
    invoiceId: string;
}

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
            items: initialInvoice.items.map(item => ({ ...item })), // Deep copy
        };
    }
    return {
        createdAt: new Date().toISOString().split('T')[0],
        paymentDue: '', // Will be calculated
        description: '',
        paymentTerms: 30,
        clientName: '',
        clientEmail: '',
        senderAddress: { ...defaultAddress },
        clientAddress: { ...defaultAddress },
        items: [{
            ...defaultItem,
            id: '35354'
        }],
    };
};

const InvoiceForm: React.FC<InvoiceFormProps> = ({ isOpen, onClose, initialInvoice, invoiceId }) => {
    const [formData, setFormData] = useState(() => getInitialFormData(initialInvoice));

    useEffect(() => {
        if (initialInvoice) {
            setFormData(getInitialFormData(initialInvoice));
        } else {
            setFormData(getInitialFormData(undefined));
        }
    }, [initialInvoice, isOpen, invoiceId]); // Reset form when it opens or dependencies change

    const isEditing = !!initialInvoice;

    const handleChange = () => {
        console.log('handle change');
    };

    const handleAddItem = () => {
        console.log('add item');
    };

    const handleRemoveItem = () => {
        console.log('remove item');
    };

    const handleSubmit = () => {
        console.log('submit');
    };

    if (!isOpen) return null;

    return (
        <div className={styles.overlay} onClick={onClose}>
            <div className={`${styles.panel} ${isOpen ? styles[`panel--opened`]: ''}`} onClick={(e) => e.stopPropagation()}>

                <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
                    <h2 className={styles.form__header}>
                        {isEditing ? <>Edit <span className={styles.form__hash}>#</span>{initialInvoice?.id}</> : 'New Invoice'}
                    </h2>
                    <fieldset className={styles.form__section}>
                        {/* Bill From */}
                        <legend className={styles.form__legend}>Bill From</legend>
                        <FormField inputId="senderAddress.street" label="Street Address">
                            <Input type="text" id="senderAddress.street" value={formData.senderAddress.street} onChange={handleChange} isFirst />
                        </FormField>
                        <div className={styles.form__row}>
                            <FormField inputId="senderAddress.city" label="City">
                                <Input type="text" id="senderAddress.city" value={formData.senderAddress.city} onChange={handleChange} />
                            </FormField>
                            <FormField inputId="senderAddress.postCode" label="Post Code">
                                <Input type="text" id="senderAddress.postCode" value={formData.senderAddress.postCode} onChange={handleChange} />
                            </FormField>
                            <FormField inputId="senderAddress.country" label="Country">
                                <Input type="text" id="senderAddress.country" value={formData.senderAddress.country} onChange={handleChange} />
                            </FormField>
                        </div>
                    </fieldset>

                    <fieldset className={styles.form__section}>
                        {/* Bill To */}
                        <legend className={styles.form__legend}>Bill To</legend>
                        <FormField inputId="clientName" label="Client's Name">
                            <Input type="text" id="clientName" value={formData.clientName} onChange={handleChange} />
                        </FormField>
                        <FormField inputId="clientEmail" label="Client's Email">
                            <Input type="text" id="clientEmail" value={formData.clientEmail} onChange={handleChange} />
                        </FormField>
                        <FormField inputId="clientAddress.street" label="Street Address">
                            <Input type="text" id="clientAddress.street" value={formData.clientAddress.street} onChange={handleChange} />
                        </FormField>
                        <div className={styles.form__row}>
                            <FormField inputId="clientAddress.city" label="City">
                                <Input type="text" id="clientAddress.city" value={formData.clientAddress.city} onChange={handleChange} />
                            </FormField>
                            <FormField inputId="clientAddress.postCode" label="Post Code">
                                <Input type="text" id="clientAddress.postCode" value={formData.clientAddress.postCode} onChange={handleChange} />
                            </FormField>
                            <FormField inputId="clientAddress.country" label="Country">
                                <Input type="text" id="clientAddress.country" value={formData.clientAddress.country} onChange={handleChange} />
                            </FormField>
                        </div>
                    </fieldset>
                    <fieldset className={styles.form__section}>
                        <div className={`${styles.form__row} ${styles[`form__row--2col`]}`}>
                            <FormField inputId="createdAt" label="Invoice Date">
                                <Input type="date" id="createdAt" value={formData.createdAt} onChange={handleChange} />
                            </FormField>
                            <FormField inputId="paymentTerms" label="Payment Terms">
                                <Select id="paymentTerms" value={formData.paymentTerms} onChange={handleChange} />
                            </FormField>
                        </div>
                        <FormField inputId="description" label="Project Description">
                            <Input type="text" id="description" value={formData.description} placeholder="e.g. Graphic Design Service" onChange={handleChange} />
                        </FormField>
                    </fieldset>
                    <div className={styles.form__items + ' ' + styles.items}>
                        <h3 className={styles.items__title}>Item List</h3>
                        {formData.items.length > 0 && (
                            <div className={styles.items__row + ' ' + styles.items__headers}>
                                <span>Item Name</span>
                                <span>Qty.</span>
                                <span>Price</span>
                                <span>Total</span>
                                <span>{/* For delete button column */}</span>
                            </div>
                        )}
                        <ul className={styles.items__list}>
                            {formData.items.map((item, index) => (
                                <li className={styles.items__row} key={item.id}>
                                    <Input type="text" name={`items.name.${index}`} value={item.name} onChange={handleChange} placeholder="Item Name" />
                                    <Input type="number" name={`items.quantity.${index}`} value={item.quantity} onChange={handleChange} placeholder="Qty." />
                                    <Input type="number" name={`items.price.${index}`} value={item.price} onChange={handleChange} placeholder="Price" />
                                    <Input type="text" value={555.00} readOnly />
                                    <Button
                                        className={`${styles[`items__delete-btn`]}`}
                                        variant="danger"
                                        icon={<IconDelete />}
                                        iconOnly={true}
                                        aria-label={item.name ? `Delete ${item.name}` : 'Delete item'}
                                        onClick={() => handleRemoveItem()}
                                    />
                                </li>
                            ))}
                        </ul>
                        <Button className={`${styles[`items__add-btn`]}`} variant="tertiary" wide onClick={handleAddItem}>+ Add New Item</Button>
                    </div>

                    <div className={styles.form__actions}>
                        {isEditing ? (
                            <>
                                <Button variant="tertiary" onClick={onClose}>Cancel</Button>
                                <Button onClick={() => handleSubmit()}>Save Changes</Button>
                            </>
                        ) : (
                            <>
                                <Button className={`${styles[`form__discard-btn`]}`} variant="tertiary" onClick={onClose}>Discard</Button>
                                <Button variant="secondary" onClick={() => handleSubmit()}>Save as Draft</Button>
                                <Button onClick={() => handleSubmit()}>Save & Send</Button>
                            </>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
};

export default InvoiceForm;

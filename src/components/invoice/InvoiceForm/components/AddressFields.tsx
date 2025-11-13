import React from 'react';
import styles from '../InvoiceForm.module.scss';
import FormField from '../../../common/FormField/FormField';
import Input from '../../../common/Input/Input';
import type { Address } from '../../../../types';

interface AddressFieldsProps {
    prefix: 'senderAddress' | 'clientAddress';
    address: Address;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    legend: string;
    autoFocusFirst?: boolean;
}

const AddressFields: React.FC<AddressFieldsProps> = ({ prefix, address, onChange, legend, autoFocusFirst = false }) => {
    return (
        <fieldset className={styles.form__section}>
            <legend className={styles.form__legend}>{legend}</legend>
            <FormField inputId={`${prefix}.street`} label="Street Address">
                <Input 
                    type="text" 
                    id={`${prefix}.street`} 
                    value={address.street} 
                    onChange={onChange} 
                    isFirst={autoFocusFirst}
                />
            </FormField>
            <div className={styles.form__row}>
                <FormField inputId={`${prefix}.city`} label="City">
                    <Input 
                        type="text" 
                        id={`${prefix}.city`} 
                        value={address.city} 
                        onChange={onChange} 
                    />
                </FormField>
                <FormField inputId={`${prefix}.postCode`} label="Post Code">
                    <Input 
                        type="text" 
                        id={`${prefix}.postCode`} 
                        value={address.postCode} 
                        onChange={onChange} 
                    />
                </FormField>
                <FormField inputId={`${prefix}.country`} label="Country">
                    <Input 
                        type="text" 
                        id={`${prefix}.country`} 
                        value={address.country} 
                        onChange={onChange} 
                    />
                </FormField>
            </div>
        </fieldset>
    );
};

export default AddressFields;
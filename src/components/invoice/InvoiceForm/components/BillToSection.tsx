import React from 'react';
import FormField from '../../../common/FormField/FormField';
import Input from '../../../common/Input/Input';
import AddressFields from './AddressFields';
import type { Address } from '../../../../types';
import styles from "../InvoiceForm.module.scss";

interface BillToSectionProps {
    clientName: string;
    clientEmail: string;
    clientAddress: Address;
    errors: { clientName?: string; clientEmail?: string };
    touched: Set<string>;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const BillToSection: React.FC<BillToSectionProps> = ({
    clientName,
    clientEmail,
    clientAddress,
    errors,
    touched,
    onChange
}) => {
    return (
        <>
            <fieldset className={styles.form__section}>
                <legend className={styles.form__legend}>Bill To</legend>
                <FormField 
                    inputId="clientName" 
                    label="Client's Name"
                    error={touched.has('clientName') ? errors.clientName : undefined}
                >
                    <Input 
                        type="text" 
                        id="clientName" 
                        value={clientName} 
                        onChange={onChange}
                        aria-invalid={!!errors.clientName}
                        aria-describedby={errors.clientName ? "clientName-error" : undefined}
                        required
                    />
                </FormField>
                <FormField 
                    inputId="clientEmail" 
                    label="Client's Email"
                    error={touched.has('clientEmail') ? errors.clientEmail : undefined}
                >
                    <Input 
                        type="email" 
                        id="clientEmail" 
                        value={clientEmail} 
                        onChange={onChange}
                        aria-invalid={!!errors.clientEmail}
                        aria-describedby={errors.clientEmail ? "clientEmail-error" : undefined}
                        required
                    />
                </FormField>
            </fieldset>
            <AddressFields 
                prefix="clientAddress"
                address={clientAddress}
                onChange={onChange}
                legend=""
            />
        </>
    );
};

export default BillToSection;
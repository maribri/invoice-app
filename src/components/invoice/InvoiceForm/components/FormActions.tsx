import React from 'react';
import styles from '../InvoiceForm.module.scss';
import Button from '../../../common/Button/Button';

interface FormActionsProps {
    isEditing: boolean;
    isSubmitting: boolean;
    onClose: () => void;
    onSave: () => void;
    onSaveAsDraft?: () => void;
}

const FormActions: React.FC<FormActionsProps> = ({
    isEditing,
    isSubmitting,
    onClose,
    onSave,
    onSaveAsDraft
}) => {
    return (
        <div className={styles.form__actions}>
            {isEditing ? (
                <>
                    <Button 
                        variant="tertiary" 
                        onClick={onClose}
                        disabled={isSubmitting}
                    >
                        Cancel
                    </Button>
                    <Button 
                        onClick={onSave}
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Saving...' : 'Save Changes'}
                    </Button>
                </>
            ) : (
                <>
                    <Button 
                        className={styles['form__discard-btn']} 
                        variant="tertiary" 
                        onClick={onClose}
                        disabled={isSubmitting}
                    >
                        Discard
                    </Button>
                    {onSaveAsDraft && (
                        <Button 
                            variant="secondary" 
                            onClick={onSaveAsDraft}
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Saving...' : 'Save as Draft'}
                        </Button>
                    )}
                    <Button 
                        onClick={onSave}
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Saving...' : 'Save & Send'}
                    </Button>
                </>
            )}
        </div>
    );
};

export default FormActions;
import React from 'react';
import styles from './ItemList.module.scss';
import Input from '../../../../common/Input/Input';
import Button from '../../../../common/Button/Button';
import { IconDelete } from '../../../../../assets/icons';
import { calculateItemTotal } from '../../../../../utils/helpers';
import type { Item } from '../../../../../types';

interface ItemRowProps {
    item: Item;
    index: number;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onRemove: (index: number) => void;
    canDelete: boolean;
}

const ItemRow: React.FC<ItemRowProps> = ({ item, index, onChange, onRemove, canDelete }) => {
    return (
        <li className={styles.items__row}>
            <Input 
                type="text" 
                name={`items.name.${index}`} 
                value={item.name} 
                onChange={onChange} 
                placeholder="Item Name"
                aria-label={`Item ${index + 1} name`}
            />
            <Input 
                type="number" 
                name={`items.quantity.${index}`} 
                value={item.quantity || ''}
                onChange={onChange} 
                placeholder="Qty."
                min="1"
                step="1"
                aria-label={`Item ${index + 1} quantity`}
            />
            <Input 
                type="number" 
                name={`items.price.${index}`} 
                value={item.price === 0 ? '0' : (item.price || '')}
                onChange={onChange} 
                placeholder="Price"
                min="0"
                step="0.01"
                aria-label={`Item ${index + 1} price`}
            />
            <Input 
                type="text" 
                value={calculateItemTotal(item.quantity, item.price).toFixed(2)} 
                readOnly 
                aria-label={`Item ${index + 1} total`}
            />
            <Button
                className={styles['items__delete-btn']}
                variant="danger"
                icon={<IconDelete />}
                iconOnly={true}
                aria-label={item.name ? `Delete ${item.name}` : `Delete item ${index + 1}`}
                onClick={() => onRemove(index)}
                disabled={!canDelete}
            />
        </li>
    );
};

export default ItemRow;
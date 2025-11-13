import React from 'react';
import styles from './ItemList.module.scss';
import Button from '../../../../common/Button/Button';
import ItemRow from './ItemRow';
import type { Item } from '../../../../../types';

interface ItemListProps {
    items: Item[];
    error?: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onAdd: () => void;
    onRemove: (index: number) => void;
}

const ItemList: React.FC<ItemListProps> = ({ items, error, onChange, onAdd, onRemove }) => {
    return (
        <div className={styles.items}>
            <h3 className={styles.items__title}>Item List</h3>
            
            {error && (
                <div className={styles.items__error} role="alert">
                    {error}
                </div>
            )}

            {items.length > 0 && (
                <div className={`${styles.items__row} ${styles.items__headers}`}>
                    <span>Item Name</span>
                    <span>Qty.</span>
                    <span>Price</span>
                    <span>Total</span>
                    <span>{/* For delete button */}</span>
                </div>
            )}
            
            <ul className={styles.items__list}>
                {items.map((item, index) => (
                    <ItemRow
                        key={item.id}
                        item={item}
                        index={index}
                        onChange={onChange}
                        onRemove={onRemove}
                        canDelete={items.length > 1}
                    />
                ))}
            </ul>
            
            <Button
                variant="tertiary" 
                wide 
                onClick={onAdd}
            >
                + Add New Item
            </Button>
        </div>
    );
};

export default ItemList;
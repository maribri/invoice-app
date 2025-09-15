import type { Meta, StoryObj } from '@storybook/react';
import Button from './Button';
import { IconPlus, IconArrowRight, IconDelete } from '../../../assets/icons';

const meta: Meta<typeof Button> = {
    component: Button,
    title: 'Common/Button',
};

export default meta;
type Story = StoryObj<typeof Button>;

// Base variants
export const Primary: Story = {
    args: { variant: 'primary', children: 'Primary Button' },
};

export const Secondary: Story = {
    args: { variant: 'secondary', children: 'Secondary Button' },
};

export const Tertiary: Story = {
    args: { variant: 'tertiary', children: 'Tertiary Button' },
};

export const Danger: Story = {
    args: { variant: 'danger', children: 'Danger Button' },
};

export const Disabled: Story = {
    args: { disabled: true, children: 'Disabled Button' },
};

export const Wide: Story = {
    args: { wide: true, children: 'Wide' },
};

// Icon variants
export const WithIcon: Story = {
    args: { icon: <IconPlus />, children: 'Button with Icon' },
};

export const IconOnly: Story = {
    args: { icon: <IconPlus />, iconOnly: true, children: 'Icon Only' },
};

// Type variants
export const SubmitButton: Story = {
    args: { type: 'submit', children: 'Submit Form' },
};

export const ResetButton: Story = {
    args: { type: 'reset', children: 'Reset Form' },
};

// Combination examples
export const PrimaryWithIcon: Story = {
    args: { variant: 'primary', icon: <IconPlus />, children: 'Add Item' },
};

export const DangerWithIcon: Story = {
    args: { variant: 'danger', icon: <IconDelete />, children: 'Delete Item' },
};

export const TertiaryIconOnly: Story = {
    args: { variant: 'tertiary', icon: <IconArrowRight />, iconOnly: true, children: 'Next' },
};

export const DisabledWithIcon: Story = {
    args: { disabled: true, icon: <IconPlus />, children: 'Cannot Add More' },
};
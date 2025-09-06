import { classNames } from '@/shared/lib/classNames/classNames';
import * as cls from './Cart.module.scss';
import { memo } from 'react';

interface CartProps {
    className?: string;
}

export const Cart = memo((props: CartProps) => {
    const { className } = props;
    
    return (
        <div className={classNames(cls.cart, {}, [className])}>
           
        </div>
    );
});
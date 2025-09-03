import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Category.module.scss';
import { memo } from 'react';

interface CategoryProps {
    className?: string;
}

export const Category = memo((props: CategoryProps) => {
    const { className } = props;
    
    return (
        <div className={classNames(cls.Category, {}, [className])}>
           
        </div>
    );
});
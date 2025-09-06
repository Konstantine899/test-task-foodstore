import React, { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';

interface IconProps extends React.SVGProps<SVGElement> {
  className?: string;
  Svg?: React.FC<React.SVGProps<SVGElement>>;
}

export const Icon = memo((props: IconProps) => {
  const { className, Svg, ...otherProps } = props;

  if (!Svg) {
    return null;
  }

  return <Svg className={classNames('', {}, [className])} {...otherProps} />;
});

Icon.displayName = `Icon`;

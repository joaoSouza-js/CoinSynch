import React, { ButtonHTMLAttributes, ComponentProps, forwardRef } from 'react';
import { cn } from '@/libs/cn';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'small' | 'large';
}


export const Button = forwardRef<
  HTMLButtonElement,
  ButtonProps
>(({className,
  variant = 'primary',
  size,
  ...restProps},ref) => {
  return  (
    <button
      className={cn(
        'rounded-[48px] h-12 gap-x-[10px] w-full text-white flex justify-center items-center px-6 py-[14px] bg-yellow-500 font-bold hover:bg-yellow-600 transition-all disabled:cursor-not-allowed ',
        {
            'bg-green-700 hover:bg-green-600' : variant === 'secondary',
            'px-4 py-2': size === 'small' 
        },
        className)} 
      {...restProps}
    />
      
  );
})





import React, { InputHTMLAttributes, ReactNode, useState } from 'react';
import { cn } from '@/libs/cn';
import { Slot } from '@radix-ui/react-slot';
import { EyeIcon, EyeSlashIcon, LockClosedIcon } from '@heroicons/react/24/solid';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    leftIcon?: () => ReactNode,
    rightIcon?: () => ReactNode,
    onRightClick?: () => void,
    hasBorder?: boolean
}

interface TextInputRoot{
    children: ReactNode
}

 function TextInputRoot({children}:TextInputRoot){
    
    return (
        <label className='flex flex-col gap-y-2 w-full'>
            {children}
        </label>
    )
}


 function TextInputInput({onRightClick,rightIcon:RightIcon,leftIcon:LeftIcon, hasBorder=true,...rest}: InputProps){
    return (
        <div className={cn(
            'flex w-full h-12 px-4 items-center rounded-lg bg-white border-2  focus-within:border-gray-700   ',{
                'border border-gray-500': hasBorder
            }
            )}>
            {
                LeftIcon  && <LeftIcon/>
            }
            <input
                className={`flex-grow ${!!LeftIcon && 'px-2'}  text-gray-800 focus:outline-none placeholder:text-gray-400  focus:shadow-none`}
                {...rest}

            />
            {
                RightIcon && (
                    <button onClick={onRightClick}>
                        {<RightIcon/>}
                    </button>
                )
            }

        </div>
    )
}



interface TextInputPasswordProps extends InputHTMLAttributes<HTMLInputElement> {
    visible?: boolean,
    hasBorder?: boolean,
    variant?: 'primary' | 'secondary'
}

function TextInputPassword({visible=false,variant='primary',...rest}:TextInputPasswordProps){
    const [isVisible, setIsVisible]= useState(!visible)

    function handleChangeVisibility(){
        setIsVisible(state => !state)
    }

    return (
        <TextInputInput 
            leftIcon={() => <LockClosedIcon className={cn('w-4 h-4 text-gray-300',{
                'text-gray-500': variant === 'secondary'
            })}/>}
            type={isVisible ? 'text' : 'password'}
            onRightClick={handleChangeVisibility}
            rightIcon={
                () => isVisible ? <EyeIcon className={cn('w-4 h-4 text-gray-300',{
                    'text-gray-500': variant === 'secondary'
                })}/> : <EyeSlashIcon className={cn('w-4 h-4 text-gray-300',{
                    'text-gray-500': variant === 'secondary'
                })}/>
            }
            {...rest}
            
        />
    )
}

interface TextInputLabelProps {
    asChild?: boolean,
    className?: string,
    children: ReactNode
}

export function TextInputLabel({children,className,asChild}:TextInputLabelProps){
    const Comp = asChild ? Slot : 'span';
    return (
        <Comp className={cn('text-white text-sm',className)}>
            {children}
        </Comp>
    ) 
}


export const TextInput = {
    Root: TextInputRoot,
    Input: TextInputInput,
    Password: TextInputPassword,
    Label: TextInputLabel
}

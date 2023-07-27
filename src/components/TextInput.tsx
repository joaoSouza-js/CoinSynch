import React, { InputHTMLAttributes, ReactNode, useState } from 'react';
import { cn } from '@/libs/cn';
import { Slot } from '@radix-ui/react-slot';
import { EyeIcon, EyeSlashIcon, LockClosedIcon } from '@heroicons/react/24/solid';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    leftIcon?: () => ReactNode,
    rightIcon?: () => ReactNode,
    onRightClick?: () => void,
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


 function TextInputInput({onRightClick,rightIcon:RightIcon,leftIcon:LeftIcon,...rest}: InputProps){
    return (
        <div className='flex w-full h-12 px-4 items-center rounded-lg bg-white border-2  focus-within:border-gray-700 focus-within: '>
            {
                LeftIcon  && <LeftIcon/>
            }
            <input
                className={`flex-grow ${!!LeftIcon && 'px-2'}  text-gray-800 focus:outline-none placeholder:text-gray-400`}
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
    visible?: boolean
}

function TextInputPassword({visible=false,...rest}:TextInputPasswordProps){
    const [isVisible, setIsVisible]= useState(!visible)

    function handleChangeVisibility(){
        setIsVisible(state => !state)
    }

    return (
        <TextInputInput 
            leftIcon={() => <LockClosedIcon className='w-4 h-4'/>}
            type={isVisible ? 'text' : 'password'}
            onRightClick={handleChangeVisibility}
            rightIcon={
                () => isVisible ? <EyeIcon className='w-4 h-4'/> : <EyeSlashIcon className='w-4 h-4'/>
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

import { cn } from '@/libs/cn';
import { Slot } from '@radix-ui/react-slot';
import { EyeIcon, EyeSlashIcon, LockClosedIcon } from '@heroicons/react/24/solid';
import React, { InputHTMLAttributes, ReactNode, forwardRef,useState } from 'react';



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

TextInputRoot.displayName = 'TextInputRoot';



interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
    leftIcon?: () => ReactNode,
    rightIcon?: () => ReactNode,
    onRightClick?: () => void,
    hasBorder?: boolean,
    isInvalid?: boolean
}

const TextInputInput = forwardRef<
    HTMLInputElement,
    TextInputProps
>(({
    onRightClick,
    rightIcon:RightIcon,
    leftIcon:LeftIcon, 
    isInvalid, 
    hasBorder=true,
    ...rest
},ref) => {
    return  (
        <div className={cn(
            'flex w-full h-12 px-4 items-center rounded-lg bg-white border-2  focus-within:border-gray-700  ',{
                'border border-gray-500': hasBorder,
                'border-red-500  focus-within:border-red-500': isInvalid
            }
            )}>
            {
                LeftIcon  && <LeftIcon/>
            }
            <input
                ref={ref}
                className={`flex-grow ${!!LeftIcon && 'px-2'}  text-gray-800 focus:outline-none placeholder:text-gray-400  focus:shadow-none disabled:opacity-80 disabled:cursor-not-allowed `}
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
})

TextInputInput.displayName = 'TextInputInput'

interface TextInputPasswordProps extends InputHTMLAttributes<HTMLInputElement> {
    visible?: boolean,
    hasBorder?: boolean,
    isInvalid?: boolean,
    variant?: 'primary' | 'secondary'
}


const TextInputPassword = forwardRef<
    HTMLInputElement,
    TextInputPasswordProps
>(({
    visible=false,
    variant='primary',...rest
},ref) => {
    const [isVisible, setIsVisible]= useState(visible)

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
            ref={ref}
            {...rest}
            
        />
    )
})

TextInputPassword.displayName = 'TextInputPassword'


interface TextInputLabelProps {
    asChild?: boolean,
    className?: string,
    children: ReactNode
}

function TextInputLabel({children,className,asChild}:TextInputLabelProps){
    const Comp = asChild ? Slot : 'span';
    return (
        <Comp className={cn('text-white text-sm',className)}>
            {children}
        </Comp>
    ) 
}

interface TextInputErrorProps {
    asChild?: boolean,
    className?: string,
    children: ReactNode
}

function TextInputError({children,className,asChild}:TextInputErrorProps){
    const Comp = asChild ? Slot : 'span';
    return (
        <Comp className={cn('text-red-500 mt-[2px] text-sm',className)}>
            {children}
        </Comp>
    ) 
}

TextInputError.displayName = 'TextInputError';


export const TextInput = {
    Root: TextInputRoot,
    Input: TextInputInput,
    Password: TextInputPassword,
    Label: TextInputLabel,
    Error: TextInputError
}

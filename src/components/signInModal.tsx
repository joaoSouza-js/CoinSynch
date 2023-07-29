'use client'

import * as Dialog from '@radix-ui/react-dialog'
import { DialogPortal } from './DialogPortal'
import { ReactNode } from 'react'
import { TextInput } from './TextInput'
import {  EnvelopeIcon, UserIcon } from '@heroicons/react/24/solid';
import Button from './Button'
import Link from 'next/link'

interface SignModalProps {
    children: ReactNode
}

export function SignInModal({children}: SignModalProps){
    return(
        <Dialog.Root>
            <Dialog.Trigger asChild>
                {children}
            </Dialog.Trigger>
            <DialogPortal>
                <form className='flex flex-col gap-6'>
                    <Dialog.Title  className='text-2xl text-center leading-tight'>
                        Sign up to 
                        <span className='font-bold text-yellow-500'> Coin</span>
                        <span className='font-bold text-gray-500'>Synch</span>
                    </Dialog.Title>
                    <TextInput.Root>
                        <TextInput.Input
                            placeholder='Email'
                            leftIcon={() => <EnvelopeIcon className='w-4 h-4 text-gray-300'/>}

                        />
                    </TextInput.Root>

                    <TextInput.Root>
                        <TextInput.Password
                            placeholder='Password'
                            
                        />
                        <Link href={'#'} className='inline-block text-xs mt-2 ml-auto text-gray-500 hover:underline'>Forgot password?</Link >
                    </TextInput.Root>
                    <Button>Sign in</Button>
                    <footer className='text-center' >
                        <span>
                            Don’t have an account?   
                            <Link href={'#'}  className=' text-center leading-tight underline mx-1'>
                                 Sign up 
                            </Link >
                            <span className='font-bold text-yellow-500'>to  Coin</span>
                            <span className='font-bold text-gray-500'>Synch</span>
                        </span>
                    </footer>
                </form>
            </DialogPortal>
        </Dialog.Root>
    )
}
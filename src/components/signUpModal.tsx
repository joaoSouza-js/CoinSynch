'use client'

import * as Dialog from '@radix-ui/react-dialog';
import Button from './Button';
import Logo from '@/assets/Logo.svg'
import * as Checkbox from '@radix-ui/react-checkbox';

import { DialogPortal } from './DialogPortal';
import { ButtonHTMLAttributes, ReactNode } from 'react';
import Image from 'next/image';
import { TextInput } from './TextInput';
import { CheckIcon, EnvelopeIcon, UserIcon } from '@heroicons/react/24/solid';

interface SignUpModalProps {
    children: ReactNode
}

export function SignUpModal({children}:SignUpModalProps){
    return (
        <Dialog.Root>
            <Dialog.Trigger asChild>
                {children}
            </Dialog.Trigger>
            <DialogPortal>
                <div className='flex flex-col gap-6'>
                    
                    <Dialog.Title  className='text-2xl text-center leading-tight'>
                        Sign up to 
                        <span className='font-bold text-yellow-500'> Coin</span>
                        <span className='font-bold text-gray-500'>Synch</span>
                    </Dialog.Title>
                    <TextInput.Root>
                        <TextInput.Input
                            placeholder='Name'
                            leftIcon={() => <UserIcon className='w-4 h-4 text-gray-300'/>}

                        />
                    </TextInput.Root>
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
                        
                    </TextInput.Root>

                    <TextInput.Root>
                        <TextInput.Password
                            
                            placeholder='Password'
                            
                        />
                        
                    </TextInput.Root>

                    <label className='flex gap-4  ' htmlFor="checkbox">
                        <div className=' h-5 w-5 '>
                            <Checkbox.Root id='checkbox' className='border h-5 w-5 flex rounded    items-center justify-center border-yellow-500'>
                                <Checkbox.Indicator className="text-violet11">
                                    <CheckIcon className='w-3 h-3 text-yellow-500' />
                                </Checkbox.Indicator>
                            </Checkbox.Root>

                        </div>
                        <p className='flex-grow-1'>
                        I have read and accept the <strong>Privacy Policy </strong>and Terms of User <strong>Sign up.</strong>
                        </p>

                    </label>

                    <Button>
                        Sign in
                    </Button>

                 
                    

                </div>
            </DialogPortal>
        </Dialog.Root>
    )
}
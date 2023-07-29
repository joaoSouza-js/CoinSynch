'use client'


import * as z from 'zod'
import Link from 'next/link'
import { ReactNode } from 'react'
import { useForm} from 'react-hook-form'
import * as Dialog from '@radix-ui/react-dialog'
import { zodResolver } from '@hookform/resolvers/zod'
import {  EnvelopeIcon } from '@heroicons/react/24/solid';


import Button from './Button'
import { TextInput } from './TextInput'
import { DialogPortal } from './DialogPortal'

interface SignModalProps {
    children: ReactNode
}

const SignInFormSchema = z.object({
    email: z.string({required_error:"Digite o seu Email."}).email('Digite um email válido'),
    password: z.string({required_error:"Digite a Senha."}).min(1, 'Digite a Senha.'),   
})

type SignInFormSchemaData = z.input<typeof SignInFormSchema>

export function SignInModal({children}: SignModalProps){

    const {formState,register, handleSubmit,} = useForm<SignInFormSchemaData>({
        resolver: zodResolver(SignInFormSchema)
    })

    const { errors, isSubmitting} = formState

    async function handleSignIn(formData: SignInFormSchemaData){
        console.log(formData)
    }

    return(
        <Dialog.Root>
            <Dialog.Trigger asChild>
                {children}
            </Dialog.Trigger>
            <DialogPortal>
                <form 
                    onSubmit={handleSubmit(handleSignIn)}
                    className='flex flex-col gap-6'
                >
                    <Dialog.Title  className='text-2xl text-center leading-tight'>
                        Sign up to 
                        <span className='font-bold text-yellow-500'> Coin</span>
                        <span className='font-bold text-gray-500'>Synch</span>
                    </Dialog.Title>
                    <TextInput.Root>
                        <TextInput.Input
                            placeholder='Email'
                            {...register('email')}
                            isInvalid={!!errors.email}
                            leftIcon={() => <EnvelopeIcon className='w-4 h-4 text-gray-300'/>}

                        />
                        {
                            errors.email && (
                                <TextInput.Error>
                                    {errors.email.message}
                                </TextInput.Error>
                            )
                        }
                    </TextInput.Root>

                    <TextInput.Root>
                        <TextInput.Password
                            isInvalid={!!errors.password}
                            placeholder='Password'
                            {...register('password')}
                            
                        />
                         <div className='flex'>
                            {
                                errors.password && (
                                    <TextInput.Error>
                                        {errors.password.message}
                                    </TextInput.Error>
                                )
                            }
                            <Link href={'#'} className='inline-block text-xs mt-2 ml-auto text-gray-500 hover:underline'>Forgot password?</Link >
                        </div>
                    </TextInput.Root>

                    <Button 
                        disabled={isSubmitting}
                        type='submit'
                    >Sign in
                    </Button>
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
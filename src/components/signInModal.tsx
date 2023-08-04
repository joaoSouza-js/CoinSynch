'use client'

import * as z from 'zod'
import Link from 'next/link'
import { useForm} from 'react-hook-form'
import * as Dialog from '@radix-ui/react-dialog'
import { zodResolver } from '@hookform/resolvers/zod'
import {  EnvelopeIcon } from '@heroicons/react/24/solid';


import  { ButtonProps, Button } from './Button'
import { TextInput } from './TextInput'
import { DialogPortal } from './DialogPortal'
import axios, { AxiosError, isAxiosError } from 'axios'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { SignUpModal } from './signUpModal'
interface SignModalProps extends ButtonProps, Dialog.DialogProps {
    unstyled?: boolean,
    redirect?: string,
    handleCloseSignUpModal?: () => void

}

const SignInFormSchema = z.object({
    email: z.string({required_error:"Digite o seu Email."}).email('Digite um email válido'),
    password: z.string({required_error:"Digite a Senha."}).min(1, 'Digite a Senha.'),   
})

type SignInFormSchemaData = z.input<typeof SignInFormSchema>

export function SignInModal({unstyled=false,className,children,redirect,open,handleCloseSignUpModal, ...rest}: SignModalProps){
    const [modalIsOpen, setModalIsOpen] = useState(open)
    const {formState,register, handleSubmit,} = useForm<SignInFormSchemaData>({
        resolver: zodResolver(SignInFormSchema)
    })

    function handleCloseSignInModal(){
        setModalIsOpen(false)
    }

    function handleSignInModalChange(state:boolean){
        if(modalIsOpen && !!handleCloseSignUpModal){
            handleCloseSignUpModal()
        }
        setModalIsOpen(state)
        
    }

    const router = useRouter()

    const { errors, isSubmitting} = formState

    async function handleSignIn(formData: SignInFormSchemaData){

        try {
            const response = await axios.post('/api/session', {
                email: formData.email,
                password: formData.password,
            })
            if(redirect) return router.push(redirect)

            location.reload()
            
            
        } catch (error) {
            if (axios.isAxiosError(error)) {
                alert(error.response?.data)
            }
        }

        
    }

    return(
        <Dialog.Root  open={modalIsOpen} onOpenChange={handleSignInModalChange} {...rest}>
            <Dialog.Trigger asChild>
                {
                    unstyled 
                        ? (<button className={className} >{children}</button>) 
                        : <Button className={className} >{children}</Button>
                }
                
            </Dialog.Trigger>
            <DialogPortal>
                <form 
                    onSubmit={handleSubmit(handleSignIn)}
                    className='flex flex-col gap-6'
                >
                    <Dialog.Title  className='text-2xl text-center leading-tight'>
                        Sign in to 
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

                            <SignUpModal  handleCloseSignInModal={handleCloseSignInModal}  unstyled={true}>
                                <button className='font-bold mx-px'>
                                    SignUp

                                </button>
                            </SignUpModal>

                            <span className='font-bold text-yellow-500'>to  Coin</span>
                            <span className='font-bold text-gray-500'>Synch</span>
                        </span>
                    </footer>
                </form>
            </DialogPortal>
        </Dialog.Root>
    )
}
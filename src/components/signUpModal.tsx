'use client'

import * as z from 'zod';
import axios from 'axios';
import * as Dialog from '@radix-ui/react-dialog';
import * as Checkbox from '@radix-ui/react-checkbox';
import { useForm, Controller} from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod';
import { CheckIcon, EnvelopeIcon, UserIcon } from '@heroicons/react/24/solid';

import { PasswordRegex } from '@/utils/regex'

import  {Button, ButtonProps } from './Button';
import { TextInput } from './TextInput';
import { DialogPortal } from './DialogPortal';
import { useRouter } from 'next/navigation'

interface SignUpModalProps  extends ButtonProps{
    unstyled?: boolean
}

const { passwordErrorMessage, Regex: passwordRegex } = PasswordRegex

const NewUserFormSchema = z.object({
    name: z.string({required_error:"Digite o seu Nome."}).min(4, 'Nome Precisa de 4 ou mais letras'),
    email: z.string({required_error:"Digite o seu Email."}).email('Digite um email válido'),
    password: z.string({required_error:"Digite a Senha."}).regex(passwordRegex,passwordErrorMessage),
    confirm_password: z.string({required_error:"Digite a Senha novamente."}),
    agree_with_terms: z.boolean().default(false).refine(agree_with_terms => agree_with_terms === true , 'Aceite os termos para continuar')
  }).superRefine((schemaData, context) => {
    if (schemaData.password !== schemaData.confirm_password) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["confirm_password"],
        message: "Confirme a Senha",
      })
    }
  })

type NewUserFormSchemaData = z.input<typeof NewUserFormSchema>

export function SignUpModal({unstyled,children, ...rest}:SignUpModalProps){

    const router = useRouter()

    const {formState, control, register, handleSubmit,watch} = useForm<NewUserFormSchemaData>({
        resolver: zodResolver(NewUserFormSchema)
    })
    
    const { errors, isSubmitting} = formState

    async function handleCreateNewUser(formData: NewUserFormSchemaData ){
        try {
            await axios.post('/api/user', {
                email: formData.email,
                name: formData.name,
                password: formData.password,
            })

            router.push('/dashboard')
            
        } catch (error) {
            if (axios.isAxiosError(error)) {
                alert(error.response?.data)
            }
        }
    }
    
    return (
        <Dialog.Root>
            <Dialog.Trigger asChild>
                {
                    unstyled 
                        ? (<button>{children}</button>) 
                        : <Button {...rest}>{children}</Button>
                }
          
            </Dialog.Trigger>
            <DialogPortal>
                <form 
                    onSubmit={handleSubmit(handleCreateNewUser)}  
                     className='flex flex-col gap-6'
                >
                    
                    <Dialog.Title  className='text-2xl text-center leading-tight'>
                        Sign up to 
                        <span className='font-bold text-yellow-500'> Coin</span>
                        <span className='font-bold text-gray-500'>Synch</span>
                    </Dialog.Title>
                    <TextInput.Root>
                        <TextInput.Input
                            placeholder='Name'
                            {...register('name')}
                            isInvalid={!!errors.name}
                            leftIcon={() => <UserIcon className='w-4 h-4 text-gray-300'/>}

                        />
                        {
                            errors.name && (
                                <TextInput.Error>
                                    {errors.name.message}
                                </TextInput.Error>
                            )
                        }
                    </TextInput.Root>
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
                         {
                            errors.password?.message && (
                                <TextInput.Error>
                                    {errors.password.message}
                                </TextInput.Error>
                            )
                        }
                    </TextInput.Root>

                    <TextInput.Root>
                    <TextInput.Password
                            {...register('confirm_password')}
                            isInvalid={!!errors.confirm_password}
                            placeholder='Password'
                            
                        />
                         {
                            errors.confirm_password && (
                                <TextInput.Error>
                                    {errors.confirm_password.message}
                                </TextInput.Error>
                            )
                        }
                        
                    </TextInput.Root>

                        <Controller
                            control={control}
                            name='agree_with_terms'
                            render={({field:{onChange}}) =>  (
                            
                            <label className='flex gap-4  ' htmlFor="checkbox">
                                <div className=' h-5 w-5 '>
                                    <Checkbox.Root onCheckedChange={onChange} id='checkbox' className='border h-5 w-5 flex rounded    items-center justify-center border-yellow-500'>
                                        <Checkbox.Indicator className="text-violet11">
                                            <CheckIcon className='w-3 h-3 text-yellow-500' />
                                        </Checkbox.Indicator>
                                    </Checkbox.Root>
                                </div>
                                <div>
                                    <p className='flex-grow-1'>
                                        I have read and accept the <strong>Privacy Policy </strong>and Terms of User <strong>Sign up.</strong>
                                    </p>
                                    {
                                        errors.agree_with_terms && (
                                            <span className=' text-sm text-red-500 mt-1'>{errors.agree_with_terms.message}</span>
                                        )
                                    }

                                </div>

                            </label>

                            )}
                        />

                    <Button 
                        disabled={isSubmitting}
                        type='submit'
                    >
                        Sign in
                    </Button>

                 
                    

                </form>
            </DialogPortal>
        </Dialog.Root>
    )
}
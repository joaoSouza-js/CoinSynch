'use client'

import { CoinProps } from '@/DTO/COIN_DTO'
import { Button, ButtonProps } from '@/components/Button'
import { DialogPortal } from '@/components/DialogPortal'
import { TextInput } from '@/components/TextInput'
import { getUserInClientSide } from '@/utils/userInClientSide'
import { ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon, ChevronUpIcon } from '@heroicons/react/24/solid'
import { zodResolver } from '@hookform/resolvers/zod'
import * as Dialog from '@radix-ui/react-dialog'
import * as Select from '@radix-ui/react-select';
import axios from 'axios'
import Image from 'next/image'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'


interface AddCryptoModalProps extends  ButtonProps {
    coins: CoinProps[]
}

const RegisterNewCoinSchema = z.object({
    coinId: z.coerce.number({required_error:'Selecione Uma Moeda',invalid_type_error:'Selecione Uma Moeda'}),
    amount: z.coerce.number({required_error: 'Digite um valor'}).positive('o numero tem que ser possitivo ou maior que 0').default(0.1) 
})

type RegisterNewCoinSchemaData = z.input<typeof RegisterNewCoinSchema>

export function  AddCryptoModal({ coins, ...rest}: AddCryptoModalProps){
    const [modalIsOpen, setModalIsOpen] = useState(false)
    const [SelectIsVisible, setSelectIsVisible] = useState(false)
    const {formState, control, register, handleSubmit,reset} = useForm<RegisterNewCoinSchemaData>({
        resolver: zodResolver(RegisterNewCoinSchema)
    })
    const user = getUserInClientSide()

    const { errors, isSubmitting} = formState

    async function handleAddNewCoin(formData:RegisterNewCoinSchemaData ){
        const coin = coins.find(coin => coin.id === formData.coinId)

        if(!coin){
            return alert("can't find coin ")
        }
        if(!user){
            return alert("you're not logged in")
        }

        try {
            await axios.post('/api/coin', {
                amount: formData.amount,
                coinId: formData.coinId,
                name: coin.name,
                url: coin.url,
                userId: user.id
        
            })

            setModalIsOpen(false)

        } catch (error) {
            if (axios.isAxiosError(error)) {
                alert(error.response?.data)
            }
        }
    }

    function handleModalVisibility(state: boolean){
        reset()
        setModalIsOpen(state)
    }


    return (
        <Dialog.Root open={modalIsOpen}  onOpenChange={handleModalVisibility} >
            <Dialog.Trigger asChild>
                <Button {...rest} />  
            </Dialog.Trigger>   
            <DialogPortal >
                <form onSubmit={handleSubmit(handleAddNewCoin)} action="">
                    <div className='flex flex-col gap-6'>
                        <Dialog.Title className='font-bold text-2xl text-center'>
                            Add Crypto
                        </Dialog.Title>
                        <div >
                            <Controller
                                control={control}
                                name='coinId'
                                render={({field}) => 
                                    (
                                        
                                        <Select.Root onValueChange={field.onChange} open={SelectIsVisible} onOpenChange={setSelectIsVisible} >
                                            <Select.Trigger
                                                className='p-4 flex justify-between border border-gray-300 rounded-md w-full'
                                                aria-label="Food"
                                            >
                                                <Select.Value placeholder="Choose" />
                                                <Select.Icon className="text-violet11">
                                                    {
                                                        SelectIsVisible 
                                                            ? <ChevronUpIcon className='w-5 h-5 text-yellow-500'/>
                                                            : <ChevronDownIcon className='w-5 h-5' />
                                                    }
                                                    
                                                </Select.Icon>
                                            </Select.Trigger>
                        
                                            <Select.Content   position='popper' sticky='always'  className="overflow-hidden w-[90vw] max-w-[386px]  bg-white border-gray-300 rounded-md border   ">
                                                <Select.Viewport className=" w-full max-h-[246px]">

                                                    {coins.map(coin => (
                                                        <Select.Item 
                                                            key={coin.id} 
                                                            value={String(coin.id)} 
                                                            className='flex justify-between border border-gray-300 py-4 px-6'
                                                        >
                                                            <div className='flex gap-2 items-center'>
                                                                <Image
                                                                    src={coin.url ?? ''}
                                                                    alt={`icone da moeda ${coin.name}`}
                                                                    width={16}
                                                                    height={16}
                                                                    className='w4 h-4'
                                                                />
                                                                <Select.ItemText className='text-sm'>{coin.name} <span className='text-gray-500'>{coin.symbol}</span></Select.ItemText>
                                                            </div>
                                                            <Select.Icon>
                                                                <ChevronRightIcon className='w-4 h-4'/>
                                                            </Select.Icon>
                                                        </Select.Item>

                                                    ))}
                                                </Select.Viewport>
                                            </Select.Content>
                                        


                                        </Select.Root>
                                           
                                       
                                    )
                                }
                            />
                             {
                                errors.coinId  && (
                                    <span className='mt-2 block text-red-500 text-sm'>{errors.coinId.message}</span>
                                )
                            }

                        </div>
                        


                        <TextInput.Root >
                            <TextInput.Input {...register('amount')} defaultValue={0.1} type='number'/>
                            {
                                errors.amount  && (
                                    <TextInput.Error>{errors.amount.message}</TextInput.Error>
                                )
                            }
                        </TextInput.Root>

                    </div>

                    <Button disabled={isSubmitting}  className='mt-8'>Add Crypto</Button>
                </form>
            </DialogPortal> 
        </Dialog.Root>
    )
}
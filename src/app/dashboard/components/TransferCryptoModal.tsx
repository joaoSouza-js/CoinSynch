'use client'

import { CoinProps } from "@/DTO/COIN_DTO";
import { Button } from "@/components/Button";
import { DialogPortal } from "@/components/DialogPortal";
import { TextInput } from "@/components/TextInput";
import { getUserInClientSide } from "@/utils/userInClientSide";
import { ChevronUpIcon, ChevronDownIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import { zodResolver } from "@hookform/resolvers/zod";
import * as Dialog from "@radix-ui/react-dialog";
import axios from "axios";
import * as Select from '@radix-ui/react-select';

import { ReactNode, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import Image from "next/image";
import { TransferCoinProps } from "./Wallet";

interface TransferCryptoModalProps {
    children: ReactNode,
    coinSelected: CoinProps,
    TransferCoin: (props: TransferCoinProps) => Promise<void>

}

const RegisterNewCoinSchema = z.object({
    isTransferIn: z.coerce.boolean({required_error:''}).default(true),
    amount: z.coerce.number({required_error: 'Digite um valor'}).positive('o numero tem que ser possitivo ou maior que 0').default(0.1) 
})

type RegisterNewCoinSchemaData = z.input<typeof RegisterNewCoinSchema>



export function TransferCryptoModal({children,coinSelected,TransferCoin}:TransferCryptoModalProps){

    const [modalIsOpen, setModalIsOpen] = useState(false)
    const [SelectIsVisible, setSelectIsVisible] = useState(false)
    const {formState, control, register, handleSubmit,reset} = useForm<RegisterNewCoinSchemaData>({
        resolver: zodResolver(RegisterNewCoinSchema)
    })
    const user = getUserInClientSide()
    const { errors, isSubmitting} = formState


    async function handleAddNewCoin(formData:RegisterNewCoinSchemaData ){
        try {
            await TransferCoin({
                amount: formData.amount as number,
                coinId: coinSelected.id,
                userId: user?.id as string,
                isTransferIn: formData.isTransferIn as boolean
            })
            setModalIsOpen(false)
        } catch (error) {
                console.log(error)
            if (axios.isAxiosError(error)) {
                alert(error.response?.data)
            }
        }
    }

    return (
        <Dialog.Root open={modalIsOpen} onOpenChange={setModalIsOpen}> 
            <Dialog.Trigger asChild>
                {children}
            </Dialog.Trigger>
            <DialogPortal>
            <form onSubmit={handleSubmit(handleAddNewCoin)} action="">
                    <div className='flex flex-col gap-6'>
                        <Dialog.Title className='font-bold text-2xl text-center'>
                            Tansfer Crypto
                        </Dialog.Title>
                        <div className="flex gap-6 justify-center items-center text-sm">
                            <span className="block">You are transfering</span>
                            <div  className="flex items-center gap-2">
                                <Image className="w-8 h-8 " width={32} height={32} alt="" src={coinSelected?.url ?? ''}/> 
                                <span>
                                    {coinSelected?.name} <span className="text-gray-500"> {coinSelected?.symbol}</span>
                                </span>
                            </div>
                        </div>
                        <div >
                            <Controller
                                control={control}
                                name='isTransferIn'
                                render={({field}) => 
                                    (
                                        
                                        <Select.Root onValueChange={value => value === 'true'? field.onChange(true) : field.onChange(false) } open={SelectIsVisible} onOpenChange={setSelectIsVisible} >
                                            <Select.Trigger
                                                className='p-4 flex justify-between border border-gray-300 rounded-md w-full'
                                                defaultValue={'true'}
                                                aria-label="Food"
                                            >
                                                <Select.Value  placeholder="Tranfer In" />
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
                                                    <Select.Item className="py-4 px-6" value="true">
                                                        <Select.ItemText>Transfer in</Select.ItemText>
                                                    </Select.Item>
                                                    <Select.Item className="py-4 px-6" value="false">
                                                        <Select.ItemText>Transfer Out</Select.ItemText>
                                                    </Select.Item>
                                                    
                                                </Select.Viewport>
                                            </Select.Content>
                                        


                                        </Select.Root>
                                           
                                       
                                    )
                                }
                            />
                             {
                                errors.isTransferIn  && (
                                    <span className='mt-2 block text-red-500 text-sm'>{errors.isTransferIn.message}</span>
                                )
                            }

                        </div>
                        


                        <TextInput.Root >
                            <TextInput.Input step={0.01}  {...register('amount')}  type='number'/>
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
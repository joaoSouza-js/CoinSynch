'use client'

import { CoinProps } from '@/DTO/COIN_DTO'
import { Button, ButtonProps } from '@/components/Button'
import { DialogPortal } from '@/components/DialogPortal'
import { TextInput } from '@/components/TextInput'
import { ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon, ChevronUpIcon } from '@heroicons/react/24/solid'
import * as Dialog from '@radix-ui/react-dialog'
import * as Select from '@radix-ui/react-select';
import Image from 'next/image'
import { useState } from 'react'


interface AddCryptoModalProps extends  ButtonProps {
    coins: CoinProps[]
}

export function  AddCryptoModal({ coins, ...rest}: AddCryptoModalProps){
    const [SelectIsVisible, setSelectIsVisible] = useState(false)
    return (
        <Dialog.Root >
            <Dialog.Trigger asChild>
                <Button {...rest} />  
            </Dialog.Trigger>   
            <DialogPortal>
                <div className='flex flex-col gap-6'>
                    <Dialog.Title className='font-bold text-2xl text-center'>
                        Add Crypto
                    </Dialog.Title>
                    <Select.Root open={SelectIsVisible} onOpenChange={setSelectIsVisible} >
                        <Select.Trigger
                            className='p-4 flex justify-between border border-gray-300 rounded-md'
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
                                    <Select.Item value={String(coin.id)} className='flex justify-between border border-gray-300 py-4 px-6'>
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


                    <TextInput.Root>
                        <TextInput.Input defaultValue={0} type='number'/>
                    </TextInput.Root>

                </div>
                <Button className='mt-8'>Add Crypto</Button>
            </DialogPortal> 
        </Dialog.Root>
    )
}
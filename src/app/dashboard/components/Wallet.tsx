

import WalletSvg from '@/assets/wallet.svg'
import { PlusIcon } from '@heroicons/react/24/solid'
import Image from 'next/image'
import { WalletEmpty } from './WalletEmpty'
import { AddCryptoModal } from './AddCryptoModal'
import { SignInModal } from '@/components/signInModal'
import { CoinProps } from '@/DTO/COIN_DTO'
import { getUser } from '@/utils/user'
import { cn } from '@/libs/cn'

interface WalletProps {
    className?: string
    coins: CoinProps[],
    userIsLoggedIn?: boolean
}

export   function Wallet({className,coins,}: WalletProps){
    const user = getUser()
    const userIsLoggedIn = !!user

    const userCoins: string[] = []


    return (
        
        <section className={cn('shadow-md  bg-white min-h-[28rem] flex flex-col rounded-lg ',className)}>
            <div className='flex justify-between px-6 py-6 border-b-gray-100 border-b'>
                <div className='flex gap-x-4'>
                    <Image
                        className='w-8 h-8'
                        alt=''
                        width={32}
                        height={32}
                        src={WalletSvg}
                    />
                    <strong className='font-bold text-2xl text-gray-700'>My Wallet</strong>
                    

                    
                </div>

                {
                  userIsLoggedIn ? (
                    <AddCryptoModal 
                    coins={coins}
                 className='flex gap-2  w-max'>
                    <PlusIcon className='w-4 h-4'/>
                    Add crypto
                     </AddCryptoModal>
                  )
                  : (
                    <SignInModal 
                        
                         className='flex gap-2  w-max'
                    >
                        <PlusIcon className='w-4 h-4'/>
                        Add crypto
                    </SignInModal>

                  )
                }
            </div>

        {
            userCoins.length ? (<></>)
            : <WalletEmpty/>
        }
    </section>
    )
}
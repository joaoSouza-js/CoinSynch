'use client'

import WalletSvg from '@/assets/wallet.svg'
import { PlusIcon } from '@heroicons/react/24/solid'
import Image from 'next/image'
import { WalletEmpty } from './WalletEmpty'
import { AddCryptoModal } from './AddCryptoModal'
import { SignInModal } from '@/components/signInModal'
import { CoinProps } from '@/DTO/COIN_DTO'
import { getUser } from '@/utils/user'
import { cn } from '@/libs/cn'
import axios from 'axios'
import { getUserCoinsCurrentData } from '@/utils/getUserCoins'
import { UserTableCoin } from './UserTableCoin'
import { getCoins } from '@/utils/getCoins'
import { getUserInClientSide } from '@/utils/userInClientSide'
import { useState } from 'react'

interface WalletProps {
    className?: string,
    coins: CoinProps[]
    userCoins: CoinProps[]  
    userIsLoggedIn: boolean
}


export interface addNewCoinProps {
    amount: number,
    coinId: number,
    name: string,
    url: string,
    userId: string,
}

export interface TransferCoinProps {
    amount: number,
    coinId: number,
    userId:string,
    isTransferIn: boolean
}

export   function Wallet({className,coins,userCoins:user_coins,userIsLoggedIn}: WalletProps){
    const [userCoins,setUserCoins] = useState(user_coins)

    async function handleAddNewCoin({amount,coinId,name,url,userId}:addNewCoinProps){
        try {
            await axios.post('/api/coin', {
                amount: amount,
                coinId: coinId,
                name: name,
                url: url,
                userId: userId,
        
            })

            const coin = coins.find(coin => coin.id)
            
            if(!coin) return

            const userAlreadyHasCoin = userCoins.some(userCoin => userCoin.id === coinId)

            if(userAlreadyHasCoin) {
                const coinWithCoinUpdated = userCoins.map(userCoin => {
                    if(userCoin.id ===  coin.id) {
                        
                        return {
                            ...userCoin,
                            amount: userCoin.amount ? userCoin.amount + amount : 0,
                        }
                    }
                    return userCoin
                })

                setUserCoins(coinWithCoinUpdated)

            }

            const userCoinsWithMoreOneCoin  = [...userCoins,coin]

            setUserCoins(userCoinsWithMoreOneCoin)
    
        } catch (error) {
            throw error
        }

    }

    async function handleTransferCoin({amount,coinId,userId,isTransferIn}:TransferCoinProps){
        try {
            const response = await axios.put<{
                isDeleted: boolean
            }>('/api/coin',{
                amount: amount,
                coinId: coinId,
                userId: userId,
                isTransferIn: isTransferIn
            })
    
            const {isDeleted} = response.data
            

            if(!isDeleted) return 
    
            const userCoinsWithOneDeleted = userCoins.filter(coin => coin.id !== coinId )
    
            setUserCoins(userCoinsWithOneDeleted)
            
        } catch (error) {
            throw error
        }
    }

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
                    addNewCoin={handleAddNewCoin}
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
            userCoins.length && userIsLoggedIn ? 
                (
                <UserTableCoin
                    TransferCoin={handleTransferCoin}
                    userCoins={userCoins} 
    
                />)
                : <WalletEmpty/>
            
        }
    </section>
    )
}
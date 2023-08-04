'use client'

import Image from "next/image";
import TranferSvg from '@/assets/tranfer.svg'
import { CoinProps,  } from "@/DTO/COIN_DTO";
import { Tooltip } from "./Tooltip";
import { FormatPercentage, FormatPrice } from "@/utils/format";
import { TransferCryptoModal } from "./TransferCryptoModal";
import { useState } from "react";
import { TransferCoinProps } from "./Wallet";


interface UserTableCoinProps {
    userCoins: CoinProps[];
    TransferCoin: (props: TransferCoinProps) => Promise<void>}


export function UserTableCoin({userCoins,TransferCoin}:UserTableCoinProps){
    return (
        <section className='w-full mx-auto px-6 '>
            <table className='w-full mt-12 table-auto border-collapse'>
                <thead className='text-left text-gray-700' >
                    <tr  className=" text-gray-700" >
                        <th className='px-6 text-gray-500'>#</th>
                        <th className="font-normal">Crypto</th>
                        <th className='px-6 text-gray-500 font-normal'>Holdings</th>
                        <th className='px-6 text-gray-500 font-normal'>Change</th>
                        <th className='  px-6 text-gray-500 font-normal text-end' >trade</th>
                    </tr>

                </thead>
                <tbody  >
                    {userCoins.map((coin,index) => (
                        <tr key={coin.id} >
                            <td className='h-16 px-6 ' >{String(index +1).padStart(2,'0')}</td>
                            <td className='h-16 py-6  '>
                                <div className="flex items-center gap-4">
                                    <Image className="w-8 h-8 " width={32} height={32} alt="" src={coin.url ?? ''}/> 
                                    <span>
                                        {coin.name} <span className="text-gray-500"> {coin.symbol}</span>
                                    </span>


                                </div>
                            </td>
                            <td className='h-16 p-6'>
                                    {
                                        coin.amount && (
                                            <>
                                            <span className="block">US {FormatPrice.format(coin.quote.USD.price * coin.amount )}</span>
                                            <span className="text-yellow-500 block mt-1 text-xs"> { coin.amount.toFixed(4)} {coin.symbol}</span>
                                            </>

                                        )
                                    }
                            </td>
                            <td className={`h-16 p-6 ${coin.quote.USD.percent_change_24h > 0 ? 'text-green-500' : 'text-red-500'}`} > 
                                {FormatPercentage.format(coin.quote.USD.percent_change_1h / 100).replace('-','')}
                            </td>
                            <td className='h-16 text-center p-6 text-end'>
                                <TransferCryptoModal  TransferCoin={TransferCoin} coinSelected={coin} >
                                    <Tooltip
                                        label="tranfer crypto" 
                                        className='text-red-300' 
                                    >
                                    <Image
                                        src={TranferSvg}
                                        alt=""
                                        className='w-4 h-4'
                                        width={16}
                                        height={16}
                                    />
                                    </Tooltip>
                                </TransferCryptoModal>
                            </td>
                        </tr>

                    ))}
                

                    
                </tbody>
            </table>
           
        </section>
    )
}
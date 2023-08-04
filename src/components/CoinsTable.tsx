'use client'

import { CoinProps, CoinWithImageProps } from "@/DTO/COIN_DTO";
import { Button } from "@/components/Button";
import { FormatPercentage, FormatPrice } from "@/utils/format";
import { MinusIcon, PlusIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";


interface CoinsTableProps {
    coins: CoinProps[];
}


export function CoinsTable({coins}:CoinsTableProps){
    const [showAll, setShowAll] = useState(false)
    const coinsVisible = coins.slice(0, showAll ? coins.length : 5)

    function handleCoinsLength(){
        showAll ? setShowAll(false) : setShowAll(true)
    }
    return (
        <section className='max-w-7xl mx-auto px-6 '>
            <h2 className="text-gray-700 font-bold text-[2rem] text-center">Top Cryptos</h2>
            <table className='w-full mt-12 table-auto border-collapse'>
                <thead className='text-left' >
                    <tr >
                        <th className='px-6'>#</th>
                        <th>Crypto</th>
                        <th className='px-6'>Price</th>
                        <th className='px-6'>Change</th>
                        <th className=' text-center px-6' >trade</th>
                    </tr>

                </thead>
                <tbody  >
                    {coinsVisible.map((coin,index) => (
                        <tr key={coin.id} >
                            <td className='p-6' >{String(index +1).padStart(2,'0')}</td>
                            <td className='p-6 flex items-center gap-4'>
                                <Image className="w-8 h-8 " width={32} height={32} alt="" src={coin.url ?? ''}/> 
                                <span>
                                    {coin.name} <span className="text-gray-500"> {coin.symbol}</span>
                                </span>
                            </td>
                            <td className='p-6'>US$ {FormatPrice.format(coin.quote.USD.price)}</td>
                            <td className={`p-6 ${coin.quote.USD.percent_change_24h > 0 ? 'text-green-500' : 'text-red-500'}`} > {FormatPercentage.format(coin.quote.USD.percent_change_1h / 100).replace('-','')}</td>
                            <td className='text-center p-6'>
                                <Link className="px-4 py-2 w-20  rounded-[32px] text-sm text-white bg-green-500 hover:bg-green-600 transition-all" href={'/dashboard'} >Buy</Link>
                            </td>
                        </tr>

                    ))}
                

                    
                </tbody>
            </table>
            <div className="mt-6 mx-auto  flex justify-center">
                <button  
                    onClick={handleCoinsLength}  
                    className="text-yellow-500 flex  items-center gap-2 "
                >
                    {
                        showAll ?  (
                            <>
                                View less
                            </>
                        )
                        : (
                            <>
                                View More <PlusIcon className="w-3 h-3"/>
                            </>
                        )
                    }
                </button>

            </div>
        </section>
    )
}
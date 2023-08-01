'use client'

import { Button } from "@/components/Button";
import { FormatPercentage, FormatPrice } from "@/utils/format";
import { MinusIcon, PlusIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import { useState } from "react";

interface Coin {
    url: string;
    id: number;
    name: string;
    symbol: string;
    slug: string;
    quote: {
        USD: {
            percent_change_1h: number;
            price: number;
            percent_change_24h: number;
        };
    };
}[]

interface CoinsTableProps {
    coins: Coin[];
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
                            <td className='p-6' >{index +1}</td>
                            <td className='p-6 flex items-center gap-4'>
                                <Image className="w-8 h-8 " width={32} height={32} alt="" src={coin.url}/> 
                                <span>
                                    {coin.name} <span className="text-gray-500"> {coin.symbol}</span>
                                </span>
                            </td>
                            <td className='p-6'>US$ {FormatPrice.format(coin.quote.USD.price)}</td>
                            <td className={`p-6 ${coin.quote.USD.percent_change_24h > 0 ? 'text-green-500' : 'text-red-500'}`} > {FormatPercentage.format(coin.quote.USD.percent_change_1h)}</td>
                            <td className='text-center p-6'>
                                <Button className='w-20 mx-auto' size='small' variant='secondary'>Buy</Button>
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
                                View less <MinusIcon className="w-3 h-3"/>
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
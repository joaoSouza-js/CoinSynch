'use client'
import { Tooltip } from "./Tooltip"
import WalletSvg from '@/assets/wallet.svg'
import TradeSvg from '@/assets/trade.svg'
import CoinSvg from '@/assets/coin.svg'
import GraphicSvg from  '@/assets/coin.svg'
import Image from "next/image"

 

export function SideBar(){
    return (
        <div className="bg-white  shadow-lg mt-px py-11 pl-6 pr-8  flex flex-col  gap-y-8 ">
            <Tooltip
          
                label="carteira"
            >
                  <Image
                    alt=''
                    width={32}
                    height={32}
                    src={WalletSvg}
            className='w-8  h-8'
                 />
            </Tooltip>
            <Tooltip
                 label="trade"
            >
                <Image
                    src={TradeSvg}
                    alt=""
                    width={32}
                    height={32}
                />
            </Tooltip>
             <Tooltip
                 label="Moeda"
            >
                <Image
                    src={CoinSvg}
                    alt=""
                    width={32}
                    height={32}
                />
            </Tooltip>
            <Tooltip
                 label="grafico"
            >
                <Image
                    src={GraphicSvg}
                    alt=""
                    width={32}
                    height={32}
                />
            </Tooltip>
        </div>
    )
}
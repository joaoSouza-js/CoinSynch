'use client'
import { Tooltip } from "./Tooltip"
import WalletSvg from '@/assets/wallet.svg'
import TradeSvg from '@/assets/trade.svg'
import CoinSvg from '@/assets/coin.svg'
import GraphicSvg from  '@/assets/coin.svg'

 

export function SideBar(){
    return (
        <div className="bg-white shadow-lg mt-px py-11 pl-6 pr-8 h-full flex flex-col  gap-y-8 ">
            <Tooltip
                svg={WalletSvg}
                label="carteira"
            />
            <Tooltip
                 svg={TradeSvg}
                 label="trade"
            />
             <Tooltip
                 svg={CoinSvg}
                 label="Moeda"
            />
            <Tooltip
                 svg={GraphicSvg}
                 label="grafico"
            />
        </div>
    )
}
import { ReactNode } from "react";
import Logo from '@/assets/Logo.svg'
import WalletSvg from '@/assets/wallet.svg'
import TradeSvg from '@/assets/trade.svg'
import CoinSvg from '@/assets/coin.svg'
import GraphicSvg from  '@/assets/coin.svg'

import Image from "next/image";
import { getUser } from "@/utils/user";
import { SideBar } from "./components/Sidebar";
import { UserInfo } from "./components/UserInfo";
interface DashboardLayoutProps {
    children: ReactNode
}


export default function DashboardLayout({children}: DashboardLayoutProps) {
   

    const user = getUser()
    const firstName = user?.name.split(' ')[0] ?? ''

    return (
        <div className="mx-auto flex flex-col bg-gray-100 w-screen h-screen">
            <header className=' py-4 px-4 flex justify-between shadow-md   w-full text-sm bg-white'>
                <Image
                    src={Logo}
                    alt=""
                />
               
                <UserInfo name={firstName} />
            </header>
            
            <div className="flex flex-grow ">
                <SideBar/>
                {children}
            </div>
            
        </div>
    )
}
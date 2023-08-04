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
        <div className="mx-auto flex flex-col bg-gray-100  min-h-screen">
            <header className=' py-4 pr-8 pl-10 flex justify-between shadow-md   w-full text-sm bg-white'>
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
            <footer className="w-full p-8 shadow-[0_3px_8px_0px_rgba(0,0,0,0.3)] bg-white  text-center mt-px text-gray-700">
                Copyright © 2022 -  All rights reserved
            </footer>
            
        </div>
    )
}
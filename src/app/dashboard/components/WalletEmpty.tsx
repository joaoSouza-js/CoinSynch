import Image from "next/image";
import WalletEmptySvg from '@/assets/walletEmpty.svg'

export function WalletEmpty(){
    return (
        <div className="flex-grow text-gray-700 flex justify-center items-center flex-col   ">
            <Image
                src={WalletEmptySvg}
                alt=""
                width={60}
                height={60}
                className="w-16 h-16"
            />
            <strong className="font-bold text-xl mt-8">Nothing here yet...</strong>
            <span className="mt-2">Add a crypto and start earning</span>
        </div>
    )
}
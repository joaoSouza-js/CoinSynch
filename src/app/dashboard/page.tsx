import BallanceIcon from '@/assets/ballence.svg'
import Image from 'next/image'
import WalletSvg from '@/assets/wallet.svg'
import { Button } from '@/components/Button'
import { PlusIcon } from '@heroicons/react/24/solid'
import { Wallet } from './components/Wallet'
import { getCoins } from '@/utils/getCoins'
import { getUser } from '@/utils/user'
import { getUserCoinsCurrentData } from '@/utils/getUserCoins'

interface UserCoin {
    id: string;
    coinId: number;
    name: string;
    amount: number;
    url: string;
}


export default async function Dashboard(){

    const user = getUser()
    const userIsLoggedIn = !!user?.id

    async function fetchUserCoins() {
        const userCoinsEmpty = [] as UserCoin[]
        
        if(!userIsLoggedIn){
            return userCoinsEmpty
        }

       
        try {
            const response =  await fetch(`http://localhost:3000/api/coin/${user.id}`,{
                cache: 'no-cache'
            })
            const data: {coins: UserCoin[]} = await response.json()
           
            return data.coins    
        } catch (error) {
            console.log(error)
            return userCoinsEmpty
        }
        
        
    }

    const coins = await getCoins({include_images:true})
    const userCoins = await fetchUserCoins()
    const userCoinsCurrentData = await getUserCoinsCurrentData(userCoins)
    
    
    return (
        <div className='w-full max-w-[1216px] mx-auto p-6 pt-4'>
            <header  className='  grid   gap-8   grid-cols-[1fr_minmax(0,_280px)_minmax(0,_280px)] w-full   mx-auto mt-14 h-28 '>
                <div className='h-full  bg-white  flex rounded-full  '>
                    <div className='bg-white flex items-center gap-x-4 px-8'>
                        <div className='bg-yellow-100 h-16 w-16 flex justify-center items-center rounded-full'>
                            <Image
                                alt=''
                                src={BallanceIcon}

                            />
                        </div>
                        <div >
                            <strong className='text-2xl block'>Balance in US$</strong>
                            <span className='text-gray-500'>approximately</span>
                        </div>
                    </div>
                    <div className='bg-red-100 flex-grow flex justify-center items-center'>
                        <strong className='text-3xl'>
                            $32,256.56
                        </strong>
                    </div>
                </div>

                <div className='bg-red-600 h-9'></div>
                <div className='bg-red-600 h-9'></div>
            </header>
            
            <Wallet
                coins={coins}
                userIsLoggedIn={userIsLoggedIn}
                userCoins={userCoinsCurrentData}
             className='mt-8'
             />

        </div>
    )
}
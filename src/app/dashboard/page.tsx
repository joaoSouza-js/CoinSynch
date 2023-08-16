import BallanceIcon from '@/assets/ballence.svg'
import Image from 'next/image'
import { Wallet } from './components/Wallet'
import { getCoins } from '@/utils/getCoins'
import { getUser } from '@/utils/user'
import { getUserCoinsCurrentData } from '@/utils/getUserCoins'
import { CoinStatics } from './components/CoinStatics'
import { FormatPercentage, FormatPrice } from '@/utils/format'
import ElephantImage from '@/assets/elephant.png'
import Link from 'next/link'
import { Metadata } from 'next'

interface UserCoin {
    id: string;
    coinId: number;
    name: string;
    amount: number;
    url: string;
}

export const metadata: Metadata = {
    title:'Dashboard',
    description: "Introducing our powerful Dashboard Screen, your central hub for comprehensive insights and control. With an intuitive and visually engaging interface, our Dashboard Screen brings together all your essential data and analytics in one place. Stay informed with real-time updates on key metrics, performance trends, and user activities. Customize your view to focus on what matters most to you and easily navigate through your data with interactive charts and graphs. From business analytics to personal goals tracking, our Dashboard Screen empowers you to make data-driven decisions and drive success. Take charge of your information like never before and experience the convenience of a unified data management solution with our Dashboard Screen."
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
            const response =  await fetch(`${process.env.NEXT_PUBLIC_APPLICATION_URL}/api/coin/${user.id}`,{
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

    
    const userCoinValues = userCoinsCurrentData.map(coin => coin.amount ? coin.amount * coin.quote.USD.price : 0)
    const balance = userCoinValues.reduce((acc, value) => acc + value, 0);

    const radomNumber = Math.floor(Math.random() * coins.length)

    const randomCoin = coins[radomNumber]
    
    
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
                            {FormatPrice.format(balance)}
                        </strong>
                    </div>
                </div>

                <CoinStatics coin={randomCoin}/>
                <div className='grid grid-cols-2 items-center bg-white rounded-md shadow text-xs' >
                    <div className='p-4'>
                        <strong>NFT’s NEWS</strong>
                        <span className='text-gray-500 inline-block mt-1'>New ElephantX NFTto be lauched!  </span>
                        <Link href={'#'} className='text-yellow-500 mt-4 block'> Read more +</Link>
                    </div>
                    <Image
                        src={ElephantImage}
                        alt=''
                        width={140}
                        height={143}
                        className='h-full'

                    />
                </div>
            </header>
                    
            
            <Wallet
                coins={coins}
                userId={user?.id}
                userIsLoggedIn={userIsLoggedIn}
                userCoins={userCoinsCurrentData}
             className='mt-8'
             />

        </div>
    )
}
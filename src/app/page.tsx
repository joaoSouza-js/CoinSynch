
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRightIcon } from '@heroicons/react/24/solid'

import Logo from '@/assets/Logo.svg'
import CoinSvg from '@/assets/coin.svg'
import WavesImage from '@/assets/waves.svg'
import GraphicSvg from '@/assets/graphic.svg'
import DevicesSvg from '@/assets/devices.svg'
import WavesFormImage from '@/assets/wavesForm.svg'
import HappyWomenImage  from '@/assets/happy-woman.png'


import { Card } from '@/components/Card'
import { CoinsTable } from '@/components/CoinsTable'
import { SignUpModal } from '@/components/signUpModal'
import { SignInModal } from '@/components/signInModal'
import { ImagesCarrousel } from '@/components/ImagesCarrousel'
import { NewsLetterForm } from '@/components/NewsLetterForm'

import TradeSvg from '@/assets/trade.svg'
import { getCoins } from '@/utils/getCoins'
import { CoinsStatus } from '@/components/CoinsStatus'

export const revalidate = 30 


export default async function Home() {
  const CoinsWithLogoImage  = await getCoins({include_images:true})
  
  return (
   <div>
    <header className=' py-4 px-4 flex justify-center fixed top-0 shadow-md   w-full text-sm bg-white z-10 max-[908px]:pb-9'>
      <div className='flex w-full justify-between max-w-7xl '>

        <div className='flex items-center'>
          <Image src={Logo} alt=''/>
          <nav className='flex gap-x-6 ml-10'>
            <Link
              className='hover:text-gray-600 transition-all'
              href={'/dashboard'}

            >
              About us
            </Link>
            <Link
              className='hover:text-gray-600 transition-all'
              href={'#'}

            >
            Top Cryptos
            </Link>

          </nav>

        </div>
        <div className='flex items-center gap-x-20 max-[908px]:flex-col-reverse'>
          <div>
            <div className='max-[908px]:absolute left-0 right-0 flex justify-center mt-3 '>
              <CoinsStatus coins={CoinsWithLogoImage}/>

            </div>

          </div>
          <div className='flex  items-center gap-x-6'>
            <SignInModal redirect='/dashboard' unstyled  className='min-w-fit'>
                  Sign in   
            </SignInModal>
            <SignUpModal className='py-2'>
                Sign up
            </SignUpModal>
          </div>
        </div>
        
      </div>


    </header>

    <section className='mt-40 grid px-4  items-center grid-cols-[60%_40%] max-w-7xl m-auto'>
      <div>
          <h1 className='text-5xl text-yellow-500 font-bold'>
            Lorem ipsum dolor sit amet, consectetur
          </h1>
          <p className='text-xl mt-6'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit 
            amet luctus venenatis, lectus magna fringilla urna, porttitor
          </p>
           <SignUpModal  className='w-72 mt-8'>
              
                SIGN UP NOW
                <ArrowRightIcon className="h-4 w-4 font-bold text-white" />
              
           </SignUpModal>

          <div className='text-xl text-yellow-500 gap-x-16 flex mt-20'>
              <span className='inline-block px-4 py-2 bg-yellow-100 rounded'>Cryptos</span>
              <span className='inline-block px-4 py-2 bg-yellow-100 rounded'>NFTs</span>
              <span className='inline-block px-4 py-2 bg-yellow-100 rounded'>Games</span>

          </div>
      </div>
      <div>
       
        <ImagesCarrousel
          images={[
            {
             
              src: HappyWomenImage.src,
              alt:'happyWomen',
            },
            {
           
              src: HappyWomenImage.src,
              alt:'happyWomen',
            },
        
          ]}
        />
      </div>
    </section>

    <Image
      alt=''
      className='w-full'
      src={WavesImage}
    />

    <section className='grid pt-32 max-w-7xl mx-auto grid-cols-[60%_40%]  bg-gradient-to-b pb-32 from-white to-[#F7F7F7] max-md:flex max-md:px-4 max-md:flex-col-reverse max-md:gap-y-10'>
      <div className='flex flex-col gap-8 max-md:flex-grow  max-md:w-full'>
          <div className='flex gap-x-8 '>

            <Card
              icon={CoinSvg}
              altIcon=''
              subtitle='Crypto Solutions'
              title='Crypto Solutions'
              content='Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, '

            />
              <Card
              icon={TradeSvg}
              altIcon=''
              subtitle='Crypto Solutions'
              title='Crypto Solutions'
              content='Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, '

            />
          </div>
          <div className='flex gap-x-8 self-end'>
            <Card
                icon={GraphicSvg}
                altIcon=''
                subtitle='Crypto Solutions'
                title='Crypto Solutions'
                content='Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, '

              />
                <Card
                icon={DevicesSvg}
                altIcon=''
                subtitle='Crypto Solutions'
                title='Crypto Solutions'
                content='Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, '

              />


          </div>
      </div>
      <div className='flex flex-col justify-center pl-8 max-md:max-w-[494px] max-md:mx-auto '>
        <strong className='text-yellow-500 text-xl font-bold'>Lorem ipsum </strong>
        <span className='text-5xl mt-1 block text-gray-700 font-bold'>Lorem ipsum </span>
        <p className='mt-4 '>Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit amet luctus venenatis, lectus magna fringilla urna, porttitor</p>
        <SignUpModal className='mt-10 w-44'>
       
            Sign up now
          
        </SignUpModal>

      </div>
      
    </section>

     
      <CoinsTable coins={CoinsWithLogoImage}/>
    

    <section className='bg-yellow-600 mt-32 px-6  py-32 flex justify-center  relative'>
      <div className='flex w-full justify-between max-w-5xl gap-8'>
        <div className='text-white z-10  max-md:w-1/2'>
          <h2 className='font-bold text-2xl text-yellow-200'>
            Lorem ipsum 
          </h2>
          <span className='block mt-1 font-bold text-4xl'>Lorem ipsum </span>
          <p className='mt-4 max-w-sm'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit amet luctus venenatis, lectus magna fringilla urna, porttitor
          </p>
        </div>
        <div className='w-full max-w-[384px]  z-10 max-md:w-1/2'>
          <NewsLetterForm/>

        </div>
        <Image
          className='absolute top-4 -z-3 left-0 right-0'
          src={WavesFormImage}
          alt=''
        />

      </div>

    </section>

    <footer className=' mx-auto p-6 items-center flex justify-around'>
          <span className='text-gray-700'>Copyright © 2022 -  All rights reserved</span>
          <Image className='w-24' src={Logo} alt=''/>
    </footer>

    
   </div>
  )
}

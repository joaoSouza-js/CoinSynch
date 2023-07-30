'use client'
import Image from 'next/image'
import {Button} from '@/components/Button'
import Logo from '@/assets/Logo.svg'
import Link from 'next/link'
import HappyWomenImage  from '@/assets/happy-woman.png'
import { ArrowRightIcon } from '@heroicons/react/24/solid'
import WavesImage from '@/assets/waves.svg'
import WavesFormImage from '@/assets/wavesForm.svg'
import { Card } from '@/components/Card'
import CoinSvg from '@/assets/coin.svg'
import { NewsLetterForm } from '@/components/NewsLetterForm'
import { ImagesCarrousel } from '@/components/ImagesCarrousel'
import { SignUpModal } from '@/components/signUpModal'
import { SignInModal } from '@/components/signInModal'

export default function Home() {
  return (
   <div>
    <header className=' py-4 px-4 flex justify-center fixed top-0   w-full text-sm bg-white z-10'>
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
        <div className='flex items-center gap-x-20'>
          <div>
            <span>BIT </span>
          </div>
          <div className='flex  items-center gap-x-6'>
            <SignInModal unstyled  className='min-w-fit'>
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

    <section className='grid pt-32 max-w-7xl mx-auto grid-cols-[60%_40%]  bg-gradient-to-b pb-32 from-white to-[#F7F7F7] '>
      <div className='flex flex-col gap-8'>
          <div className='flex gap-x-8'>

            <Card
              icon={() => ( <Image src={CoinSvg} alt=''/>)}
              subtitle='Crypto Solutions'
              title='Crypto Solutions'
              content='Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, '

            />
              <Card
              icon={() => ( <Image src={CoinSvg} alt=''/>)}
              subtitle='Crypto Solutions'
              title='Crypto Solutions'
              content='Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, '

            />
          </div>
          <div className='flex gap-x-8 self-end'>
            <Card
                icon={() => ( <Image src={CoinSvg} alt=''/>)}
                subtitle='Crypto Solutions'
                title='Crypto Solutions'
                content='Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, '

              />
                <Card
                icon={() => ( <Image src={CoinSvg} alt=''/>)}
                subtitle='Crypto Solutions'
                title='Crypto Solutions'
                content='Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, '

              />


          </div>
      </div>
      <div className='flex flex-col justify-center pl-8  max-w-md'>
        <strong className='text-yellow-500 text-xl font-bold'>Lorem ipsum </strong>
        <span className='text-5xl mt-1 block text-gray-700 font-bold'>Lorem ipsum </span>
        <p className='mt-4 '>Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit amet luctus venenatis, lectus magna fringilla urna, porttitor</p>
        <SignUpModal className='mt-10 w-44'>
       
            Sign up now
          
        </SignUpModal>

      </div>
      
    </section>

    <section className='max-w-7xl mx-auto px-6 '>
      <h2>Top Cryptos</h2>
      <table className='w-full table-auto border-collapse'>
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
            <tr >
                <td className='p-6' >01</td>
                <td className='p-6'>Bitcoin BTC</td>
                <td className='p-6'>US$ 25.499,52</td>
                <td className='p-6' >+5,65%</td>
                <td className='text-center p-6'>
                  <Button className='w-20 mx-auto' size='small' variant='secondary'>Buy</Button>
                </td>
            </tr>
           

             
        </tbody>
      </table>
    </section>

    <section className='bg-yellow-600 px-6  py-32 flex justify-center  relative'>
      <div className='flex w-full justify-between max-w-5xl'>
        <div className='text-white z-10'>
          <h2 className='font-bold text-2xl text-yellow-200'>
            Lorem ipsum 
          </h2>
          <span className='block mt-1 font-bold text-4xl'>Lorem ipsum </span>
          <p className='mt-4 max-w-sm'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit amet luctus venenatis, lectus magna fringilla urna, porttitor
          </p>
        </div>
        <div className='w-full max-w-[384px]  z-10'>
          <NewsLetterForm/>

        </div>
        <Image
          className='absolute top-4 -z-3 left-0 right-0'
          src={WavesFormImage}
          alt=''
        />

      </div>

    </section>

    
   </div>
  )
}

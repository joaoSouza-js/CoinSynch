import BallanceIcon from '@/assets/ballence.svg'
import Image from 'next/image'


export default function Dashboard(){
    return (
        <div className='w-full'>
            <header  className='  grid   gap-8   grid-cols-[1fr_minmax(0,_280px)_minmax(0,_280px)] w-full max-w-[1170px]  mx-auto mt-14 h-28 '>
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
        </div>
    )
}
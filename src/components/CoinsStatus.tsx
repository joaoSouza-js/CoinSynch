'use client'
import { CoinProps } from '@/DTO/COIN_DTO'
import { FormatPercentage, FormatPrice } from '@/utils/format'
import 'keen-slider/keen-slider.min.css'
import { useKeenSlider } from 'keen-slider/react'
import { useEffect } from 'react'


interface CoinsStatusProps{
    coins: CoinProps[]
}

export function CoinsStatus({coins}:CoinsStatusProps){
    const [sliderRef, instanceRef] = useKeenSlider(
        {
        vertical: false,
        loop: true,
        defaultAnimation: {
            duration: 4000
        },
         slides: {
            spacing:  0,
             perView: 2.2
         }
        },
        
    )

    function dragToRight(){
        instanceRef.current?.on('animationStarted', () => {
            return
        })
        instanceRef.current?.on('animationEnded', () => {
            return
        })
        
        instanceRef.current?.next()
    }

    useEffect(() => {
        setInterval(dragToRight, 7000)
    })

    

    return (
     <div className='w-96 '>
            <div  ref={sliderRef} className="keen-slider   ">

                {
                    coins.map(coin => (
                        <div key={coin.id} className="keen-slider__slide flex gap-2">
                            <span className='inline-block text-gray-800'>{coin.symbol}</span>
                            <span className='inline-block'>{FormatPrice.format(coin.quote.USD.price)}</span>
                            <span className={`inline-block  ${coin.quote.USD.percent_change_1h >= 0 ? 'text-green-500': 'text-red-500'}`}>{FormatPercentage.format(coin.quote.USD.percent_change_1h /100).replace('-','')}</span>
                        </div>

                    ))
                }
            </div>

     </div>   
    )
}
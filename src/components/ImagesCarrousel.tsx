'use client'
import 'keen-slider/keen-slider.min.css'
import { useKeenSlider } from 'keen-slider/react'

import Image,{ImageProps} from "next/image";
import { useEffect } from 'react';



interface ImagesCarrouselProps {
    images: ImageProps[]
}

export function ImagesCarrousel({images}:ImagesCarrouselProps){
  
    
    const [sliderRef, instanceRef] = useKeenSlider(
        {
        loop: true,
        defaultAnimation: {
            duration: 2000
        },
         slides: {
            
             perView: 1.2
         }
        },
        
      )

      let hasScrolled = false;

    function handleScroll() {
        if (!hasScrolled) {
          instanceRef.current?.next()
          console.log('User has scrolled for the first time!');
          hasScrolled = true;
        }
    }
    

    useEffect(() => {
        setTimeout(() => {
            window.addEventListener('scroll', handleScroll);
        },500)
    })
 
    

    
  

      return (
        <div  ref={sliderRef} className="keen-slider w-full  ">
            {
                images.map((image,index) => (
                    <Image
                        {...image}
                        className="keen-slider__slide w-[500px]  h-[480px] "
                        width={500}
                        height={600}
                        key={index}
                        alt={image.alt}
                    />
                ))
            }
        </div>

      )

}
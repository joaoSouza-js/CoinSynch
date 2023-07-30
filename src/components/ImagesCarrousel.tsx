
import 'keen-slider/keen-slider.min.css'
import { useKeenSlider } from 'keen-slider/react'

import Image,{ImageProps} from "next/image";



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
 
    

    
  

      return (
        <div  ref={sliderRef} className="keen-slider w-full  ">
            {
                images.map((image,index) => (
                    <Image
                        className="keen-slider__slide w-[500px]  h-[480px] "
                        width={500}
                        height={600}
                        key={index}
                        {...image}
                    />
                ))
            }
        </div>

      )

}
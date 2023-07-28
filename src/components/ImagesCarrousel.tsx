
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
 
    
    let hasScrolled = false;

    function handleScroll() {
        if (!hasScrolled) {
          instanceRef.current?.next()
          console.log('User has scrolled for the first time!');
          hasScrolled = true;
        }
      
        // You can add additional code here to handle subsequent scrolls if needed.
      }
      
      // Add the event listener to the 'scroll' event
      window.addEventListener('scroll', handleScroll);
    
  

      return (
        <div onScroll={() => {
            console.log('oi mundo')
        }} ref={sliderRef} className="keen-slider w-full ">
            {
                images.map(image => (
                    <Image
                        className="keen-slider__slide"
                        width={500}
                        height={600}
                        {...image}
                    />
                ))
            }
        </div>

      )

}
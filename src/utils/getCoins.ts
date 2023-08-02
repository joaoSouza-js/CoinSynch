import { CoinProps } from "@/DTO/COIN_DTO";
import axios from "axios";

interface getCoinsProps {
    start?: number,
    limit?: number,
    include_images?: boolean
}

interface CoinImagesResponse {
    data:   {
      id: number;
      logo: string;
    }[];
  }
  

export async  function getCoins({limit=10,start=1,include_images=false}:getCoinsProps){
    const coinsResponse =  await axios.get<{
        data: CoinProps[]
      }>('https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest',{
        params: {
          start: start,
          limit: limit,
          convert: 'USD'
        },
        headers: {
          'X-CMC_PRO_API_KEY': process.env.NEXT_PUBLIC_COIN_MARKET_API_KEY
        }
      })
      const Coins =   coinsResponse.data.data

      if(!include_images){
        return Coins
      }
    
      const CoinsOnlyId =  Coins.map(coin => coin.id).join(',')
    
      const coinsImagesResponse = await axios.get< CoinImagesResponse >(
        'https://pro-api.coinmarketcap.com/v2/cryptocurrency/info',
        {
          params: {
            id: CoinsOnlyId
          },
          headers: {
            'X-CMC_PRO_API_KEY': process.env.NEXT_PUBLIC_COIN_MARKET_API_KEY
          }
        }
      );
      
      const coinImagesData = coinsImagesResponse.data.data;
      
      
    
      const CoinsWithLogoImage=   Coins.map(coin => {
        const  CoinImage = coinImagesData[coin.id]
        
    
        return {
          ...coin,
          url: CoinImage.logo 
        }
      })

      return CoinsWithLogoImage
}
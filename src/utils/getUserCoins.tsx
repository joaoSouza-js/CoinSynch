import { CoinProps } from "@/DTO/COIN_DTO";
import axios from "axios";



interface CoinQuotesProps {
    data:  CoinProps[];
}

interface UserCoin {
    id: string;
    coinId: number;
    name: string;
    amount: number;
    url: string;
}


export async  function getUserCoinsCurrentData(userCoins:UserCoin[]){
    
    const userCoinsOnlyIdString =  userCoins.map(coin => coin.coinId).join(',')
    
    const coinsResponse =  await axios.get<CoinQuotesProps>('https://pro-api.coinmarketcap.com/v2/cryptocurrency/quotes/latest',{
        params: {
          id: userCoinsOnlyIdString
        },
        headers: {
          'X-CMC_PRO_API_KEY': process.env.NEXT_PUBLIC_COIN_MARKET_API_KEY
        }
      })

      const CoinsQuote =   coinsResponse.data.data

      const CoinsQuoteArray = Object.values(CoinsQuote)

      const CoinsQuoteCurrentData = CoinsQuoteArray.map(coinQuote => {
            const url = userCoins.find(coin => coin.coinId === coinQuote.id)
            return {
                ...coinQuote,
                url: url?.url
            }
      })

    
      return CoinsQuoteCurrentData
}
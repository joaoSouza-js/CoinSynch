export interface CoinProps {
    url?: string
    id: number,
    name: string,
    symbol: string
    slug: string,
    quote: {
      USD: {
        percent_change_1h: number,
        price: number,
        percent_change_24h: number
      }
    }
}

export interface CoinWithImageProps extends CoinProps {
    url: string
}
  
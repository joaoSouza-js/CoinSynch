export interface CoinProps {
    amount?: number,
    url?: string
    id: number,
    name: string,
    symbol: string
    slug: string,
    quote: {
      USD: {
        percent_change_1h: number,
        percent_change_7d: number
        price: number,
        percent_change_24h: number
      }
    }
}

export interface CoinWithImageProps extends CoinProps {
    url: string
}
  
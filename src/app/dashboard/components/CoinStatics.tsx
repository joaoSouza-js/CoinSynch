"use client"

import { CoinProps } from '@/DTO/COIN_DTO';
import { FormatPercentage } from '@/utils/format';
import Image from 'next/image';
import { VictoryChart, VictoryArea, VictoryAxis,VictoryLine, VictoryTheme } from 'victory';


const data = [
    { x: 1, y: 20 },
    { x: 2, y: 40 },
    { x: 3, y: 80 },
    { x: 4, y: 60 },
];

  interface CoinGraphicProps {
      coin: CoinProps
  }

export function CoinStatics({coin}:CoinGraphicProps){
  console.log(coin)
  const {percent_change_1h,percent_change_24h,percent_change_7d} = coin.quote.USD
  const data = [
    { x:1 , y: percent_change_1h  },
    { x:24 , y: percent_change_24h  },
    { x:24 * 7 , y: percent_change_7d  },
  ];


    return (

      <div className='flex items-center bg-white  rounded-md shadow' >
            <div className='w-36 text-xs p-2'>
                <span>Daily Variation</span>
                <div className="flex items-center gap-2 mt-4">
                    <Image className="w-6 h-6 " width={24} height={24} alt={`imagem do icone da moeda ${coin.name}`} src={coin.url ?? ''}/> 
                    <span>
                        {coin.symbol}
                    </span>


                </div>
                <span
                    className={`inline-block mt-2 ${coin.quote.USD.percent_change_24h > 0 ? 'text-green-500' : 'text-red-500'}`}
                >{FormatPercentage.format(coin.quote.USD.percent_change_1h / 100).replace('-','')}</span>
            </div>
            <VictoryChart
          
            domainPadding={20}
            height={150}
            theme={VictoryTheme.material}
            padding={{ top: 10, bottom: 0, left: 0,right:20 }}
          >
              <VictoryLine
                interpolation="natural"
                style={{
                data: { stroke: "#FFB94F"},
                parent: { border: "1px solid #ccc"}
                }}
                data={data}
      />
          <VictoryAxis
            style={{ axis: { stroke: "transparent" } }} // Remove a linha do eixo X
            tickFormat={() => ''} // Remove os rótulos e indicadores do eixo X
          />
          <VictoryAxis
            dependentAxis
            style={{ axis: { stroke: "transparent" } }} // Remove a linha do eixo Y
            tickFormat={() => ''} // Remove os rótulos e indicadores do eixo Y
          />
          </VictoryChart>
                 
      </div>
    )
}
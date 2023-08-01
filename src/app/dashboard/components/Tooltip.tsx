import * as ToolTipRadix from '@radix-ui/react-tooltip';
import Image from 'next/image';
import { ComponentProps } from 'react';


interface TooltipProps extends ComponentProps<'button'>{
  label: string;
  svg: string;
}

export function Tooltip({label,svg,...rest}: TooltipProps){
    return (
    <ToolTipRadix.Provider>
    <ToolTipRadix.Root >
      <ToolTipRadix.Trigger   asChild>
        <button >
          <Image
            alt=''
            width={32}
            height={32}
            src={svg}
            className='w-8  h-8'
          />
          
        
        </button>
      </ToolTipRadix.Trigger>
      <ToolTipRadix.Portal>
        <ToolTipRadix.Content
          side='right'
          className="data-[state=delayed-open]:data-[side=top]:animate-slideDownAndFade data-[state=delayed-open]:data-[side=right]:animate-slideLeftAndFade data-[state=delayed-open]:data-[side=left]:animate-slideRightAndFade data-[state=delayed-open]:data-[side=bottom]:animate-slideUpAndFade text-white select-none rounded-[4px] bg-yellow-500 px-[15px] py-[10px] text-[15px] leading-none shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] will-change-[transform,opacity]"
          sideOffset={5}
        >
          {label}
          <ToolTipRadix.Arrow className="fill-yellow-500" />
        </ToolTipRadix.Content>
      </ToolTipRadix.Portal>
    </ToolTipRadix.Root>
  </ToolTipRadix.Provider>

    )
}
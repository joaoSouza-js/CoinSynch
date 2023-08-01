'use client'

import { getUser } from '@/utils/user';
import { ArrowRightOnRectangleIcon } from '@heroicons/react/24/solid';
import * as Avatar from '@radix-ui/react-avatar';

import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

interface  UserInfoProps {
  name: string;
}

export function UserInfo({name}: UserInfoProps){
  


    const router = useRouter()

    async function handleSignOut(){
         Cookies.remove('user')  
         router.push('/') 
    }

    return (
        <DropdownMenu.Root>
        <DropdownMenu.Trigger asChild>
          <button
            className='h-8 '
            aria-label="Customise options"
          >
            <Avatar.Root className="bg-blackA3 inline-flex h-8 w-8 select-none items-center justify-center overflow-hidden rounded-full align-middle">
                    <Avatar.Image
                        className="h-full w-full rounded-[inherit] object-cover"
                        src="https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=128&h=128&dpr=2&q=80"
                        alt="Colm Tuite"
                    />
                    <Avatar.Fallback
                        className="text-violet11 leading-1 flex h-full w-full items-center justify-center bg-white text-[15px] font-medium"
                        delayMs={600}
                    >
                    CT
                    </Avatar.Fallback>

                </Avatar.Root>
                <span> {name} </span>
            
            
          </button>
        </DropdownMenu.Trigger>
  
        <DropdownMenu.Portal>
          <DropdownMenu.Content
            className=" py-4 px-6 bg-white rounded-md p-[5px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[opacity,transform] data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade"
            sideOffset={5}
          >
            <DropdownMenu.Item
                onClick={handleSignOut}
                className='text-base flex gap-x-4 text-gray-500 items-center'
             >
                <ArrowRightOnRectangleIcon className='w-5 h-5'/>
                 <span className='block'>Logout</span>
               
          </DropdownMenu.Item>
            
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
    )
}
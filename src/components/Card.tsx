import Image from 'next/image';
import React, { ReactNode } from 'react';// Replace with the actual path to your SvgProps file


interface SvgProps extends React.SVGProps<SVGSVGElement> {}
interface CardProps {
  title: string;
  subtitle: string;
  content: string;
  icon:  string
  altIcon: string
}

export function Card({ content, subtitle, title, icon,altIcon }: CardProps) {
  return (
    <div className='max-w-[242px] w-full p-6 shadow-md rounded-lg'>

      <Image width={64} height={64}  className='h-16 w-16' src={icon} alt={altIcon}/>
      <strong className='mt-4 text-yellow-500 block'>{title}</strong>
      <span className='font-bold text-2xl block text-gray-700'>{subtitle}</span>
      <p className='mt-2'>{content}</p>
     
    </div>
  );
}

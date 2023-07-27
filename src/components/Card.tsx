import React, { ReactNode } from 'react';// Replace with the actual path to your SvgProps file


interface SvgProps extends React.SVGProps<SVGSVGElement> {}
interface CardProps {
  title: string;
  subtitle: string;
  content: string;
  icon:  () => ReactNode;
}

export function Card({ content, subtitle, title, icon: Icon }: CardProps) {
  return (
    <div className='max-w-[242px] w-full p-6 shadow-md rounded-lg'>

     <Icon/>
      <strong className='mt-4 text-yellow-500 block'>{title}</strong>
      <span className='font-bold text-2xl block text-gray-700'>{subtitle}</span>
      <p className='mt-2'>{content}</p>
     
    </div>
  );
}

"use client"
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';


export default function Slidercard({products}:any) {

 
  return (
    <ul className='flex gap-2 overflow-x-scroll scrollbar-hide'>
    {products.map((product: { slug: React.Key | null | undefined; image: (string | StaticImport)[]; price: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | React.PromiseLikeOfReactNode | null | undefined; }) => (
          <li key={product.slug}className="text-center">
            <Link href={`/products/${product.slug}`}>
            <Image
            className="w-full h-full scale-90 hover:scale-100 
            transition-transform duration-300 
            rounded-lg min-h-[300px] max-h-[300px] min-w-[200px] cursor-pointer "
            width={200}
            height={200}
            src={ product.image[0]}
            alt="productImage"
                     
          /> 
          </Link>
          <p className="font-semibold text-black text-[18px]">€{product.price}</p>
          </li>
          ))}
    </ul>
                    
                
  );
}

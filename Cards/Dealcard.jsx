"use client"
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function Dealcard({ product }) {
  return (
    
    product.topDeal === "true" ? (
      <div className="card_container">
        <div>
          <h2 className="card_headline">Top Deal</h2>
        </div>
        <div className="grow mb-[44px] max-h-[400px] relative py-0 px-5 ">
          <div className="relative ">
            <div className="justify-center cursor-pointer w-[340px] h-[280px]">
              <Link href={`/products/${product.slug}`}>
                <Image
                  alt="Essentials"
                  src={product.image[0]}
                  width={340}
                  height={280}
                  priority
                  className='max-h-[280px] min-h-[280px] md:w-[340px] sm:w-auto pb-1'
                />
              </Link>
            </div>
          </div>
          <div className="flex mt-2">
            <span className="bg-[#CC0C39] realtive text-white px-[4px] py-[6px] text-sm">
              Up to {product.discount} % off
            </span>
            <span className="ml-1 p-1"><b>Top deal</b></span>
          </div>
          <div className="text-xs pt-1 mt-2">
            {product.name.substring(0, 40)}
          </div>
          <div className="w-full text-[17px] absolute block px-0 pt-2 ">
            <a className="cursor-pointer text-[14px] text-primary font-semibold">
              See all deals
            </a>
          </div>
        </div>
      </div>
    ) : product.isFeature === "true" ? (
      <div className="card_container" >
      <div className="card_headline">
        {product.subcategory} -New Arrival-
      </div>
      <div className=" grow mb-[44px] max-h-[400px] relative py-0 px-5 ">
        <div className="relative ">
          <div className="justify-center cursor-pointer group">
      <Link href={`/products/${product.slug}`}>
      <div className="relative overflow-hidden ">
      {/* Image 0 */}
      <Image
        width={340}
        height={340}
        alt=""
        src={product.image[0]}
        priority
        className="max-h-[340px] "
      />
      
      {/* Image 1 */}
      <Image
        width={340}
        height={340}
        alt=""
        src={product.image[1]}
        priority
        className="max-h-[340px] min-h-[340px] transition-opacity absolute
        duration-300 ease-in-out opacity-0 bottom-2 group-hover:opacity-100"
      />
    </div>
        </Link>
        <div className="w-full text-[17px] absolute block px-0 pt-4">
          <a className="cursor-pointer  text-[14px] text-primary font-semibold" >
            See more
          </a>
        </div>
        </div>
        </div>
      </div>
    </div>
    ):
    (
      <div className="card_container " >
        <div className="card_headline">
       {product.brand}
        </div>
      <div className='grid grid-cols-2 grid-rows-2'>
        <div className="mb-[6px]  relative  py-0 px-5 ">
          <div className="inline-block relative ">
             <div className=" hover:cursor-pointer">
             <Link href={`/products/${product.slug}`}>
            <Image
              width={129}
              height={119}
              alt=""
              src={product.image[0]}
              priority
              className='max-h-[119px] min-h-[119px] relative'
            />
          </Link>
         
          </div>
          </div>
          </div>
  {/* ************************** 1 ***************************** */}
  <div className="mb-[6px] relative  py-0 px-5 ">
          <div className="inline-block relative ">
             <div className=" hover:cursor-pointer">
             <Link href={`/products/${product.slug}`}>
            <Image
              width={129}
              height={119}
              alt=""
              src={product.image[1]}
              priority
              className='max-h-[119px] min-h-[119px] relative'
            />
          </Link>
         
          </div>
          </div>
          </div>
          {/* ***************************** 2 ***************************** */}
          <div className="mb-[6px]  relative  py-0 px-5 ">
          <div className="inline-block relative ">
             <div className="hover:cursor-pointer">
             <Link href={`/products/${product.slug}`}>
            <Image
              width={129}
              height={119}
              alt=""
              src={product.image[2]}
              priority
              className='max-h-[119px] min-h-[119px] relative'
            />
          </Link>

          </div>
          </div>
          </div>
          {/* *************************** 3 ************** */}
          <div className="mb-[6px]  relative  py-0 px-5 ">
          <div className="inline-block relative ">
             <div className=" hover:cursor-pointer">
             <Link href={`/products/${product.slug}`}>
            <Image
              width={129}
              height={119}
              alt=""
              src={product.image[3]}
              priority
              className='max-h-[119px] min-h-[119px]  relative'
            />
          </Link>
        
          </div>
          </div>
          </div>
    </div>
        {/* **************************************** */}
        <div className="text-xs pt-1 mt-2">
            {product.name.substring(0, 40)}
          </div>
          <div className="w-full text-[17px] absolute block px-5 pt-[60px]">
            <a className="cursor-pointer text-[14px] text-primary font-semibold " >
              See more
            </a>
          
        </div>
      </div>
  )
  );
}

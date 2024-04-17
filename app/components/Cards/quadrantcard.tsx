"use client"
import Image from 'next/image'
import React from 'react'
import Link from 'next/link'
import { StaticImport } from 'next/dist/shared/lib/get-img-props'

const Cuadcard = (props: { headline: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | React.PromiseLikeOfReactNode | null | undefined; subcategory: (string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | React.PromiseLikeOfReactNode | null | undefined)[]; singleImage: (string | StaticImport)[] }) => {

  return (

    <div className="card_container " >
      <div className="card_headline">
        {props.headline}
      </div>
    <div className='grid grid-cols-2 grid-rows-2'>
      <div className="mb-[6px] rounded-lg  relative bg-[#58abb3] py-0 px-5 ">
        <div className="inline-block rounded-2xl relative ">
           <div className=" hover:cursor-pointer rounded-2xl">
        <Link href={`/search?subcategory=${props.subcategory[0]}`} >
          <Image
            width={129}
            height={119}
            alt=""
            src={props.singleImage[0]}
            priority
            className='max-h-[119px] min-h-[119px] max-w-[129px] min-w-[129px] rounded-2xl relative'
          />
        </Link>
        <span className="text-[14px] text-black font-bold">{props.subcategory[0]}</span>
        </div>
        </div>
        </div>
{/* ************************** 1 ***************************** */}
<div className="mb-[6px] rounded-lg  relative bg-[#58abb3] py-0 px-5 ">
        <div className="inline-block rounded-2xl relative ">
           <div className=" hover:cursor-pointer rounded-2xl">
        <Link href={`/search?subcategory=${props.subcategory[1]}`} >
          <Image
            width={129}
            height={119}
            alt=""
            src={props.singleImage[1]}
            priority
            className='max-h-[119px] min-h-[119px] max-w-[129px] min-w-[129px] rounded-2xl relative'
          />
        </Link>
        <span className="text-[14px] text-black font-bold">{props.subcategory[1]}</span>
        </div>
        </div>
        </div>
        {/* ***************************** 2 ***************************** */}
        <div className="mb-[6px] rounded-2xl  relative bg-[#58abb3] py-0 px-5 ">
        <div className="inline-block rounded-2xl relative ">
           <div className="hover:cursor-pointer rounded-2xl">
        <Link href={`/search?subcategory=${props.subcategory[2]}`} >
          <Image
            width={129}
            height={119}
            alt=""
            src={props.singleImage[2]}
            priority
            className='max-h-[119px] min-h-[119px] max-w-[129px] min-w-[129px] rounded-2xl relative'
          />
        </Link>
        <span className="text-[14px] text-black font-bold">{props.subcategory[2]}</span>
        </div>
        </div>
        </div>
        {/* *************************** 3 ************** */}
        <div className="mb-[6px] rounded-lg  relative bg-[#58abb3] py-0 px-5 ">
        <div className="inline-block rounded-2xl relative ">
           <div className=" hover:cursor-pointer rounded-2xl">
        <Link href={`/search?subcategory=${props.subcategory[3]}`} >
          <Image
            width={129}
            height={119}
            alt=""
            src={props.singleImage[3]}
            priority
            className='max-h-[119px] min-h-[119px] max-w-[129px] min-w-[129px] rounded-2xl relative'
          />
        </Link>
        <span className="text-[14px] text-black font-bold">{props.subcategory[3]}</span>
        </div>
        </div>
        </div>
  </div>
      {/* **************************************** */}
        <div className="w-full text-[17px] absolute block px-5 pt-[60px]">
          <a className="cursor-pointer text-[14px] text-black font-semibold " >
            Ver Más
          </a>
        
      </div>
    </div>

  );
}

export default Cuadcard

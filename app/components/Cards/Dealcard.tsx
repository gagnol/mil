"use client"
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';


export default function Dealcard({deals}:any) {

 
  return (
    <div className="card_container">
      <div >
        <h2 className="card_headline">Ofertas en {deals.category}</h2>
      </div>
      <div className="grow mb-[44px] max-h-[400px] relative py-0 px-5 ">
        <div className="relative bg-white">
          <div className="justify-center cursor-pointer w-[340] h-[280]" >
            <Link href={`/products/${deals.slug}`} >
              <Image alt="Essentials" src={deals.image[0]} 
              width={340} height={280} priority 
              className='max-h-[280px] min-h-[280px]  pb-1'
              />
            </Link>
          </div>
        </div>
        <div className=" flex mt-2 ">
          <span className="bg-[#CC0C39] realtive text-white px-[10px] py-[6px] text-sm ">
            {deals.discount}  % off
          </span>
          <span className="ml-1 p-1 text-white"><b>Oferta del día</b></span>
        </div>
        <div className="text-xs pt-1 mt-2 text-white">
   
        {deals.name.substring(0,40)}
        </div>
        <div className="w-full text-[17px] absolute block px-0 pt-2 ">
          <a className="cursor-pointer text-[14px] text-primary font-semibold " >
           Ver Ofertas
          </a>
        </div>
      </div>
    </div>
  );
}

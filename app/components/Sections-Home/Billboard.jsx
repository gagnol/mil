"use client"
import React, { useState } from 'react';
import Rating from '../rating';
import Link from 'next/link';
import { InView } from 'react-intersection-observer'
import Image from 'next/image';
import CountdownTimer from './CountdownTimer';

const Billboard = ({ product }) => {
  const [index, setIndex] = useState(0);
  return (
    <InView as="div" onChange={(inView, entry) => console.log('Inview0:', inView)}>
      <div className="container pt-[55px] xl:pt-[50px]  ">
        <div className="w-full ml-5">
          <div className='flex px-2'>
            <h4 className="text-[16px] xl:text-[24px] text-white">{product.name}</h4>
          </div>
        </div>
        <div className="flex flex-wrap items-center space-x-2 mb-2 border-b-2" 
        >
          <div className="my-2">
            <div className="flex mx-6">
              <span className="mx-1">{product?.rating}</span>
              <Rating value={product.rating} />
            </div>
          </div>
          <span className="ml-1"> |&nbsp;{product.numReviews} ratings</span>
        </div>
      </div>
      <div className='p-4 bg-cover block'>
    <div className='block'>
        <div className="flex flex-wrap justify-start mx-5 my-10 " >
        <Link href={`/products/${product.slug}`}  >
          <Image
            src={product.image[index]}
            alt={product.name}
            width={483}
            height={483}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="xl:max-h-[483px] xl:min-h-[483px] xl:min-w-[483px] 
            cursor-pointer hover:opacity-45"
          />
          </Link>
          <div className="mx-10 xl:mx-5 w-[30%]">
            <CountdownTimer />
            {product.image?.map((item, i) => (
              <div className='inline-flex justify-between mt-4 border-transparent border-[3px]
            max-h-[100px]
                hover:border-[#c45500] cursor-pointer'
                key={i}>
                <Image
                  width={100}
                  height={100}
                  className="max-h-[100px] min-h-[100px]"
                  alt=""
                  key={i}
                  src={(item)}
                  onMouseEnter={() => setIndex(i)}
                  loading='lazy'
                />
              </div>
            ))}
             <div className='mt-10  w-[50%] '>
              <div className='bg-white mx-5'>
              <h2 className='text-2xl font-semibold text-black text-center'> <span> € {Math.ceil(product.price - (product.price * (product.discount / 100)))}.00</span> </h2>
              <h2 className='text-lg text-black text-center'>Precio de lista : &nbsp;<span className="line-through"> ${product.price}</span> </h2>
              </div>
              <div className=" mt-20 block justify-center items-center w-full text-center" >
                <Link href="/" >
                  <button className="bg-[#58abb3] text-white px-6 py-2 
                   rounded-md hover:bg-[#5e514b] hover:opacity-55">
                    Explorar Ofertas
                  </button>
                </Link>
              </div>
            </div>
          
            </div>

          <div className='mx-5 text-center w-[30%] border-1'>
             <h1 className=' text-xl xl:text-4xl text-white font-bold text-center'>
              Oferta del día
             </h1>
            <h1 className=' text-xl xl:text-4xl text-white font-bold text-center'>{/* some text */} 
            <span className='text-red-700'>{product.discount}%&nbsp;OFF</span>
            </h1>
           </div>
                  
          </div>
         </div>
      </div>


    </InView>
  )
}
export default Billboard;

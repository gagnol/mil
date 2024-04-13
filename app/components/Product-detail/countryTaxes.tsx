"use client"
import React from 'react'
import { FaCaretDown } from 'react-icons/fa'

const CountryTaxes = ({ discountPrice,product }: any) => {
   
    const totalPrice = Math.ceil(discountPrice + product.shipping )

    return (
        <>
            <div className="group border border-transparent  hover:cursor-pointer ">
                <h4 className="text-neutral-300 text-[14px] my-2 flex ">
                    € {product.shipping} Costo de envío 
                </h4>
                <span className="flex py-3 text-primary ">Detalles <FaCaretDown className=' text-[14px] pt-2' /></span>
                <span className="absolute w-[300px] h-[170px] rounded-sm hidden
                        bg-neutral-600 border-[1px] text-neutral top-[220px] right-11
                        border-[#777] z-[1]  group-hover:block ">
                    <div className='p-2'>
                        <ul className='m-0 p-0 '>
                            <h4 className='text-[18px] font-bold p-2 border-b text-white'>
                                Precio Final 
                            </h4>
                            <li className="nav_text">Precio
                             <span className='float-right'>€{discountPrice}</span></li>
                            <li className="nav_text">Costo de envío
                                <span className='float-right'>€{product.shipping}</span></li>
                            
                            <h4 className='font-bold text-[14px] pt-2 text-neutral-200'>Total
                                <span className='float-right'>€{totalPrice}</span>
                            </h4>
                        </ul>
                    </div>
                </span>
                <br />
            </div>
            
        </>
    )
}

export default CountryTaxes

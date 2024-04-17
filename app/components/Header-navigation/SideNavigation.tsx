"use client"
import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import { FaChevronDown, FaChevronUp, FaTimes, FaUserCircle } from 'react-icons/fa';
import { LuMenu } from 'react-icons/lu';
import useSWR from 'swr'
import { removeUser } from "@/store/nextSlice"

const fetcher = (url: any) => fetch(url).then((res) => res.json());
const SideBar = () => {
    const [open, setOpen] = useState(false);
    const [show, setShow] = useState(false);
    const { data, error } = useSWR('/api/products/categories', fetcher)
    const { data: session } = useSession();

    
    const handleSignOutClick: React.MouseEventHandler<HTMLParagraphElement> = (event) => {

        removeUser()
        signOut({redirect:false})
    };
    return (
        <>
            <button onClick={() => setOpen(true)}>
                <p className="flex items-center gap-1 h-8 px-2 border border-transparent
                text-white  hover:border-white cursor-pointer duration-300" >
                    <LuMenu className="text-xl text-white font-extrabold" /> <span className='font-bold'>Todo</span>
                </p>
            </button>
            <div className='py-3 top-0 left-0 right-0 shadow-md z-30 text-white'>
                <div className={`${!open && "hidden"} bg-gray-600/50 min-h-screen w-full 
              fixed top-0 left-0 right-0 `} onClick={() => setOpen(false)}></div>
                <div className={`${open ? "w-80" : "w-0"}  bg-black min-h-screen fixed overflow-y-scroll
                top-0 left-0 transition-all duration-300 `}>
                    <div className={`${!open && "hidden"} pt-3 mt-[80px]`}>
                        {session?.user ? (
                            <>
                                <div className='flex mx-5'>
                                    {session.user.image ? ( // Add a check for null or undefined
                                        <Image
                                            src={session.user.image} // This assumes session.user.image is a string
                                            alt=""
                                            width={100}
                                            height={100}
                                            className="w-11 h-11 rounded-full object-cover"
                                        />
                                    ) : (
                                        // Handle the case where session.user.image is null or undefined
                                        <div>Image not available</div>
                                    )}
                                    <div className="text-xs text-white flex flex-col pl-5 ">
                                        <p className="text-base font-bold text-[18px]">{session.user.name}</p>
                                        <p>{session.user.email}</p>
                                    </div>
                                    <button className='ml-auto ' aria-label="close" onClick={() => setOpen(false)}>
                                        <FaTimes color='#fff' />
                                    </button>
                                </div>
                            </>
                        ) : (
                            <div className="flex bg-black text-white text-[22px] justify-between p-5">
                                <i> <FaUserCircle /></i>
                                <Link href='/signin'>
                                    <h2>Hola, <span>Identificate</span></h2>
                                </Link>
                                <button aria-label="close" onClick={() => setOpen(false)}>
                                    <FaTimes color='#fff' />
                                </button>
                            </div>)}
                        <div className="p-5 text-neutral-content">
                            <h2 className='text-[18px] font-semibold mb-2 text-white'>Comprar por Departamento</h2>
                            <ul>
                                {data?.categories.map((category: string) => (
                                    <Link key={category} href={`/search?category=${category}`}>
                                        <li className='py-2 text-white hover:bg-[#babebe]  
                                        hover:text-black cursor-pointer'
                                            key={category} value={category} onClick={() => setOpen(false)}>
                                            <p>{category}</p>
                                        </li>
                                    </Link>
                                )).slice(0, 3)}
                                {!show &&
                                    <div className="flex py-2 leading-3 text-primary
                                    hover:text-orange-400 cursor-pointer">
                                        <li onClick={() => setShow(true)}>Ver Mas</li>
                                        <FaChevronDown />
                                    </div>
                                }
                            </ul>
                            {show &&
                                <ul >
                                    {data?.categories.map((category: string) => (
                                        <Link key={category} href={`/search?category=${category}`}>
                                            <li className='py-2 hover:bg-[#babebe] text-white  hover:text-black cursor-pointer'
                                                key={category} value={category} onClick={() => setOpen(false)}>
                                                <p>{category}</p>
                                            </li>
                                        </Link>
                                    )).slice(3, 10)}
                                    <div className='flex py-2 leading-3 text-primary
                                     hover:text-orange-400 cursor-pointer'>
                                        <li onClick={() => setShow(false)} >Ver Menos</li>
                                        <FaChevronUp />
                                    </div>
                                </ul>
                            }
                        </div>
                       
                        <div className="p-5 text-neutral-content border-t-2 border-gray-400">
                            <h2 className='text-[18px] font-semibold mb-2 text-white'>Tu cuenta</h2>
                            <p className='py-2 hover:bg-[#babebe] text-white hover:text-black cursor-pointer'>Cuenta</p>
                            <p className='py-2 hover:bg-[#babebe] text-white hover:text-black cursor-pointer'><Link href="/customer">Servicio al cliente</Link></p>
                            {session?.user ? (  
                                <p className='py-2 hover:bg-[#babebe] text-white hover:text-black cursor-pointer' onClick={handleSignOutClick}> Cerrar sessión </p>
                            ):(
                            <>
                                <p className='py-2 hover:bg-[#babebe] text-white  hover:text-black cursor-pointer'>  <Link href="/signin">Identificate </Link></p>
                            
                            </>
                            )}
                            </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SideBar
"use client"
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect } from 'react'
import { FaCaretDown } from 'react-icons/fa'
import { addUser, removeUser } from "@/store/nextSlice"
import { signOut, useSession } from "next-auth/react";
import { useDispatch } from 'react-redux'
import { useRouter } from 'next/navigation'

function SigninTool() {
    const { data: session } = useSession();
    const dispatch = useDispatch();
   
    useEffect(() => {
        if (session) {
            dispatch(
                addUser({
                    ...session

                })
            );
        }
    }, [dispatch, session]);

    const router = useRouter();

    const handleSignOutClick: React.MouseEventHandler<HTMLLIElement> = (event) => {
           
        // Redirect to "/" before signing out
        router.push('/');
    
        // Wait for 2 seconds before executing signOut
        setTimeout(() => {
            removeUser();
            signOut({ redirect: false });
        }, 2000);
    };
    return (
        <>
            {session?.user ? (
                <>
                    <div
                        className="group text-xs text-gray-100 hidden xl:flex flex-col justify-center 
                    px-2 border border-transparent hover:border-white cursor-pointer
                    overflow-x-hidden
                    duration-300 h-[70%]">
                        <p > Hola,&nbsp;{session.user.name?.substring(0, 10)}</p>
                        <p className="text-white font-bold flex items-center">
                             Tu Cuenta 
                            <i aria-hidden="true">
                                <FaCaretDown />
                            </i>
                        </p>
                        <span className="a_tooltip group-hover:block ">
                            <div className="a_tooltip-header ">

                                <Image src={session?.user?.image || ''} alt="" width={100} height={100}
                                    className="w-11 h-11 rounded-full object-cover"
                                />
                                <div className="text-xs text-gray-600 flex flex-col pl-5 pt-2">
                                    <p className="text-black font-bold text-[18px]">{session.user.name}</p>
                                    <p>{session?.user?.email}</p>
                                </div>
                            </div>
                            <div className='flex justify-between z-30 absolute '>
                                <div className='a_list_left'>
                                    {session?.user?.email === "admin@example.com"}
                                    <ul className='m-0 p-0'>
                                        <h4 className='text-[16px] font-bold pb-2 text-white'>
                                            Tu Lista de Favoritos </h4>
                                        
                                        <Link href="/main">
                                            {session?.user?.email === "admin@example.com" ?
                                                (<li className="nav_text font-bold">Panel Administrador</li>) : (<></>)
                                            }
                                        </Link>
                                    </ul>
                                </div>
                                <div className='border-l-[2px] border-l-[#fff] '></div>
                                <div className='flex-1 flex flex-row max-w-[50%] relative mx-4 my-0 '>
                                    <ul>
                                        <h4 className='text-[16px] font-bold pb-2 text-white '>
                                            Tu Cuenta
                                        </h4>
                                        <li className="nav_text">
                                            <Link href="/profile">
                                                Cuenta
                                            </Link>
                                        </li>
                                        <li className="nav_text">Compras</li>
                                        <li className="nav_text">Recomendaciones</li>
                                        
                                        <li className="nav_text"> 
                                         <Link href="/customer">Servicio al Cliente </Link>
                                        </li>

                                        <li className="nav_text" onClick={handleSignOutClick}>
                                            Cerrar Sesion
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </span>
                    </div>
                </>
            ) : (
                <>
                    <div className="group hidden xl:flex items-center px-2 border border-transparent
                    hover:border-white cursor-pointer duration-300 h-[70%] " >
                        <div className='block'>
                            <p className='text-[12px]'>Hola,&nbsp;Identificate </p>
                            <p className="text-white font-bold items-center text-[14px] flex" >
                                Tu Cuenta
                                <i aria-hidden="true">
                                    <FaCaretDown color='grey' />
                                </i>
                            </p>
                        </div>
                        <span className="a_tooltip group-hover:block ">


                            <div className="text-center text-[14px] my-[19px] px-5 mx-auto" >
                                <div className=" my-2 block justify-center" >
                                    <Link href="/signin" >
                                        <button className="h-[29px] w-[220px] 
                                        px-5 py-1 text-[#111] font-medium
                         border-[#a88734] rounded-sm bg-gradient-to-b from-[#f7dfa5]
                          to-[#f0c14b] hover:cursor-pointer hover:opacity-75" >
                                            Identificate
                                        </button>
                                    </Link>
                                </div>
                                <div >
                                    <p className='text-white'>¿Eres un cliente nuevo?&nbsp;</p>
                                    <Link href="/register" >
                                        <span className="text-primary">
                                        Empieza aquí.
                                        </span>
                                    </Link>
                                </div>
                            </div>
                        </span>
                    </div>
                </>)}
        </>
    )
}

export default SigninTool

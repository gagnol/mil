"use client"
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import { footerLinks } from "@/constant";
import { FaFacebookF, FaLinkedinIn } from "react-icons/fa";
import { BsTwitter, BsPinterest } from "react-icons/bs";


const FooterColumnMiddle = ({ title, links }:any) => (
    <div className="mx-auto">
        <h3 className="font-semibold m-1 text-white">{title}</h3>
        <ul className="footer_ul m-1">
            {links.map((link:any) => <Link href="/" key={link} className='text-[13px]
            text-white mb-1 relative block pt-5 hover:underline'>{link}</Link>)}
        </ul>
    </div>
);

const Footer = () => {

    const ScrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };
    return (
        <>
            <footer>
                <div className="footer_back" onClick={ScrollToTop}>
                    <a>Inicio de Página</a>
                    
                </div>
                <div className="footer_middle ">
                    <FooterColumnMiddle title={footerLinks[0].title} links={footerLinks[0].links} />
                    <FooterColumnMiddle title={footerLinks[1].title} links={footerLinks[1].links} />
                    <FooterColumnMiddle title={footerLinks[2].title} links={footerLinks[2].links} />
                    <FooterColumnMiddle title={footerLinks[3].title} links={footerLinks[3].links} />
                </div>
                <div className='block bg-black'>
                    <div className='flex w-full items-center justify-center pt-2 text-center border-t' >
                        <Link href="/" >
                            <Image
                                alt='logo'
                                width={200}
                                height={100}
                                style={{ width: 200, height: "auto" }}
                                src='/logo2.png'
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                loading='lazy'
                            />
                        </Link>
                       </div>
                       <div className=' w-full items-center justify-center 
                        p-1 text-center '>
                       <div className="flex w-full items-center justify-center 
                         text-center gap-8 text-[#5e514b] text-2xl">
                            <Link href="/"
                             className='cursor-pointer hover:text-[#5e514b]'>
                            <FaFacebookF className='text-[#58abb3] hover:text-[#5e514b]'/>
                            </Link>
                            <BsTwitter className='text-[#58abb3] hover:text-[#5e514b]'/>
                            <BsPinterest className='text-[#58abb3] hover:text-[#5e514b]'/>
                            <FaLinkedinIn className='text-[#58abb3] hover:text-[#5e514b]'/>
                        </div>
                    </div>
                </div>
                <div className="footer_bottom ">
                    <div className='footer_copyright text-white pt-1 mx-auto'>
                       
                    <div className="flex gap-10 mx-auto justify-center">
                            <p className='text-[14px] relative hover:underline cursor-pointer'>
                                Términos y condiciones
                            </p>
                            <Link href="/legal">
                            <p className='text-[14px] relative hover:underline cursor-pointer'>Aviso Legal</p>
                            </Link>
                            <Link href="/aviso">
                            <p className='text-[14px] relative hover:underline cursor-pointer'>Privacidad</p>
                            </Link>
                            <Link href="/cookies">
                            <p className='text-[14px] relative hover:underline cursor-pointer'>
                                Política de cookies</p>
                            </Link>
                        </div>
                         <p className='text-center pt-5'> &copy; 2023-{new Date().getFullYear()},
                          Milproveedores, Todos los derechos reservados.</p>
                        <br/>
                    </div>
                </div>
            </footer>
        </>
    )
}

export default Footer

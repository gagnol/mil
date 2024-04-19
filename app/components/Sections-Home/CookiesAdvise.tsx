"use client"
import React from "react";
import { InView } from "react-intersection-observer";
import CookiesConcent from 'react-cookie-consent'
import Link from "next/link";


const Cookies = () => {
    
  return (
    <InView as="div" onChange={(inView, entry) => console.log('Inview3:', inView)}>
    <div className="container pt-10 pb-5 text-center">
    <CookiesConcent debug={true} buttonText="Acepto" expires={30}>Este sitio utiliza cookies para mejorar tu navegación
    <Link href="/aviso"><p className="cursor-pointer text-primary">Políticas de Cookies</p></Link>
    </CookiesConcent>    
    </div>
    </InView>
  );
};

export default Cookies;

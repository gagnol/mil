"use client"
import React, { useEffect } from 'react'
import Link from 'next/link'
import toast from "react-hot-toast";
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { signIn, useSession } from 'next-auth/react';


export default function Signin() {
    const { data: session } = useSession();

    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm();

    const router = useRouter();
   
      
    useEffect(() => {
        if (session?.user) {
            router.push('/');
          }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const submitHandler = async ({ email, password }:any) => {
        try {
            const result = await signIn('credentials', {
                redirect: false,
                email,
                password,
              });
              if (result && result.error) {
                toast.error(result.error);
              }
                const { data } = await axios.post('/api/auth/signin', {
                email,
                password,
            });
         
            router.push( '/');

        } catch (err:any) {
            toast.error(
                err,
                {
                    duration: 4000,
                    position: "top-center",
                }
            );
        }
    };

    return (
        <div className='a_page'>
           <div className='a_container'>
                <h1 className='text-[21px] font-bold pb-5 text-white'>Identificate</h1>
                <form onSubmit={handleSubmit(submitHandler)} >
                    <h5>Email</h5>
                    <input
                        className='a_input'
                        id="email"
                        type="text"
                        {...register("email", 
                        { required: true, pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/ })}
                        aria-invalid={errors.email ? "true" : "false"}
                    />
                    {errors.email?.type === 'required' && <p className='a_error'> El email es requerido</p>}
                    {errors.email?.type === 'pattern' && <p className='a_error'> El formato de email no es válido</p>}

                    <h5>Contraseña</h5>
                    <input
                        className='a_input'
                        id="password"
                        type="password"
                        {...register("password", { required: true, minLength: 6, maxLength: 20 })}
                        aria-invalid={errors.password ? "true" : "false"}
                    />
                    {errors.password?.type === 'required' && <p className='a_error'> La contraseña es requerida.</p>}
                    {errors.password?.type === 'minLength' && <p className='a_error'> La contraseña debe contener al menos 6 caractéres.</p>}
                    {errors.password?.type === 'maxLength' && <p className='a_error'> La contraseña no debe superar los 20 caractéres</p>}

                    <br /><br />
                    <button className='btn btn-outline btn-primary w-full' type='submit' >Continue</button>
                </form>

                <div className='a_label'>Si Ud continua, acepta lo siguiente de Milproveedores&apos;s
                    <Link href="/terminos" className='text-[#0066c0]'>
                        Términos y condiciones </Link>
                    y <Link href="/aviso" className='text-[#0066c0]'> Privacidad</Link>
                </div>
                <br />
                <div className='a_flabel mb-4'>
                    <Link href="/forgot" >
                        <p className='text-primary font-semibold mb-2 hover:text-[#c45500] cursor-pointer' >
                        ¿Olvidaste la contraseña?
                        </p>
                    </Link>
                </div>
          
          
          
            <div className='a_divider'>¿Sos cliente nuevo de Milproveedores? </div>   
                <Link href="/register" >
                <button className='a_regbtn'>Create tu cuenta aquí </button>
                </Link>
            </div>
        </div>
    )
}

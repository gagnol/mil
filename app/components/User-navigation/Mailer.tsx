"use client"
import emailjs from "emailjs-com";
import Image from 'next/image';
import { useState } from "react";
import toast from "react-hot-toast";


const Mailer = ({ session }:any) => {

  const initialState = {
    err: "",
    success: "",
  };

  const [data, setData] = useState(initialState);
  const { success } = data;

  const sendEmail: any = (e: any) => {
    e.preventDefault();

    emailjs
      .sendForm(
        'service_zm06g9f', 'template_lk616vr', e.target,'tOLhRuJUPiui-K7mq'
        
      )
      .then((res) => {
        console.log(res);
        return setData({
          ...data,
          success: toast.success("Su consulta fue enviada , le responderemos a la brevedad", { duration: 4000, position: "top-center", })
        });

      })
      .then((res: any) => {
        e.target.reset();
        console.log(res);
      })
      .catch((err: any) => console.log(err));
  };



  return (

    <div className="grid lg:grid-cols-[50%,1fr] gap-20 text-white">
      <div>
        <Image
          className="w-[80%] h-auto lg:w-auto lg:h-auto mx-auto"
          src="/logo.png"
          width={500}
          height={500}
          alt="survey image"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          loading="lazy"
        />
      </div>
      <div className="self-center mx-5 xl:mx-0">
        <h2 className="text-2xl xl:text-4xl font-bold mx-2 text-white">Contactanos</h2>

        <div className="min-h-[400px] mt-5">

        <form onSubmit={sendEmail} className="flex flex-col">
                <input
                  name="name"
                  type="text"
                  placeholder="Tu nombre"
                  required
                  autoComplete="false"
                  className="bg-[#18191E] border
                  border-[#33353F] placeholder-[#9CA2A9] text-gray-100 
                  text-sm rounded-lg block w-3/4 p-2.5 mb-4"
                />
                <input
                  name="email"
                  type="text"
                  className="bg-[#18191E] border
                  border-[#33353F] placeholder-[#9CA2A9] text-gray-100 
                  text-sm rounded-lg block w-3/4 p-2.5 mb-4"
                  placeholder="Tu Email *no es editable"
                  defaultValue={session.user.email}
                  autoComplete="false"
                />
                <input
                  name="subjet"
                  type="text"
                  placeholder="Asunto"
                  required
                  className="bg-[#18191E] border border-[#33353F] placeholder-[#9CA2A9]
                   text-gray-100 text-sm rounded-lg block w-3/4 p-2.5 mb-4"
                   autoComplete="false"
                />
                <textarea
                  name="text-contact"
                  id="outlined-multiline-flexible"
                  placeholder="Mensaje"
                  required
                  autoComplete="false"
                  className="bg-[#18191E] border border-[#33353F]
                  placeholder-[#9CA2A9] text-gray-100 text-sm rounded-lg block w-3/4 p-2.5 mb-4"
                     
                ></textarea>
                <button className="btn btn-primary cursor-pointer w-3/4" type="submit">
                  Enviar
                </button>
              </form>
        </div>
      </div>
    </div>

  );
};

export default Mailer;

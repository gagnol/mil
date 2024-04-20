"use client";
import { FormEvent, useState } from "react";
import axios, { AxiosError } from "axios";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

function Signup() {
  const [error, setError] = useState();
  const router = useRouter();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const formData = new FormData(event.currentTarget);
      const signupResponse = await axios.post("/api/auth/signup", {
        email: formData.get("email"),
        password: formData.get("password"),
        name: formData.get("name"),
      });
      console.log(signupResponse);
      const res = await signIn("credentials", {
        email: signupResponse.data.email,
        password: formData.get("password"),
        redirect: false,
      });

      if (res?.ok) return router.push("/");
    } catch (error) {
      console.log(error);
      if (error instanceof AxiosError) {
        const errorMessage = error.response?.data.message;
        setError(errorMessage);
      }
    }
  };

  return (
    <div className='a_page'>

      <div className='a_container'>
        <h1 className='text-[21px] font-bold pb-5 text-white'>Create una cuenta</h1>
        <form onSubmit={handleSubmit}>
          {error && <div className="bg-red-500 text-white p-2 mb-2">{error}</div>}
          <label className="text-white">Tu nombre completo:</label>
          <input
            type="text"
            placeholder="Fullname"
            className="a_input"
            name="name"
          />

          <label className="text-slate-300">Correo Electrónico:</label>
          <input
            type="email"
            placeholder="Email"
            className="a_input"
            name="email"
          />

          <label className="text-slate-300">Contraseña:</label>
          <input
            type="password"
            placeholder="Password"
            className="a_input"
            name="password"
          />

          <button className="btn btn-primary btn-outline w-full mt-5">
            Regsitrate
          </button>
        </form>
        <br />
        <div className='a_label'>Si Ud continua, acepta lo siguiente de Milproveedores&apos;s
                    <Link href="/terminos" className='text-[#0066c0]'>
                        Términos y condiciones </Link>
                    y <Link href="/aviso" className='text-[#0066c0]'> Privacidad</Link>
                </div> <br />
       
        <div className='a_label'>
          ¿Ya tiene una cuenta?&nbsp;
          <Link href="/signin" >
            <span className='text-primary font-semibol cursor-pointer'> Identificate</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Signup;

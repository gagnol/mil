"use client";
import { FormEvent, useContext, useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

function Validate() {
  const [error, setError] = useState();
  const router = useRouter();
  const { userInfo } = useSelector((state: any) => state.next);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const formData = new FormData(event.currentTarget);
      const tokenResponse = await axios.post("/api/auth/validate", {
        token: formData.get("token"),

      });
      console.log(tokenResponse);


      return router.push("/reset");
    } catch (error) {
      console.log(error);
      if (error instanceof AxiosError) {
        const errorMessage = error.response?.data.message;
        setError(errorMessage);
      }
    }
  };


  const [counter, setCounter] = useState(120);

  useEffect(() => {
    let timer: NodeJS.Timeout | undefined;

    if (counter > 0) {
      timer = setInterval(() => setCounter(prevCounter => prevCounter - 1), 1000);
    }

    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
  }, [counter]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
  };


  return (
    <div className='a_page'>
      <div className='a_container'>
        <form onSubmit={handleSubmit} >
          {error && <div className="bg-red-500 text-white p-2 mb-2">{error}</div>}

          <h1 className="text-[21px] font-bold pb-5">Verificación requerida</h1>
          <div className='a_label mb-2'>
            Para continuar, complete este paso de verificación.
            Nosotros le enviámos un One Time Password (OTP) al email
               <a className='text-primary px-1 font-semibold'>{userInfo.email} </a>
            <p>por favor ingréselo .</p>
          </div>
          <label className="">Ingresar OTP</label>
          <input
            type="text"
            placeholder="OTP"
            className="a_input"
            name="token"
          />

          <button className="btn btn-primary btn-outline w-full mt-5">
            Continue
          </button>
        </form>
        <div className='a_label'>
          {counter === 0 ? (<><p className='text-[16px] text-red-600'>Su OTP expiró</p></>) :
            (<a className='text-[16px]'> Su OTP expirará en {formatTime(counter)}</a>)}
        </div>
        <br />
        <div className='a_flabel'>
          Necesito más ayuda
        </div>
      </div>
    </div>
  );
}

export default Validate;

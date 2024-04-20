"use client";
import { FormEvent, useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

function Reset() {
  const [error, setError] = useState();
  const router = useRouter();
  const { userInfo } = useSelector((state: any) => state.next);

  /* 
    useEffect(() => {
      // Define a function to fetch OTP status
      const fetchOTPStatus = async () => {
        try {
          // Make a GET request to the /api/auth/otp endpoint
          const response = await axios.get("/api/auth/validate");
          // Check the status code
          if (response.status === 200) {
            // OTP validation successful, allow the user to reset the password
          } else {
            // OTP validation failed, redirect to a different page
            router.push("/");
          }
        } catch (error) {
          console.error("Error fetching OTP status:", error);
          
          router.push("/");
        }
      };
  
  
      fetchOTPStatus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);  */

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const formData = new FormData(event.currentTarget);
      const signupResponse = await axios.post("/api/auth/reset", {
        email: userInfo.email,
        password: formData.get("password"),
        cpassword: formData.get("cpassword"),
      });

      return router.push("/signin");
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
        <form onSubmit={handleSubmit}>
          {error && <div className="bg-red-500 text-white p-2 mb-2">{error}</div>}
          <h1 className='text-[21px] font-bold pb-5' >Creá tu nueva clave </h1>
          <div className='a_label'>
            Esta contraseña recordala la próxima vés que ingreses.
          </div>
          <label className="text-white">Contraseña</label>
          <input
            type="password"
            placeholder="Password"
            className="a_input"
            name="password"
          />
          <label className="text-white">Reingresar contraseña</label>
          <input
            type="password"
            placeholder="Password"
            className="a_input"
            name="cpassword"
          />
          <button className="btn btn-primary btn-outline w-full mt-5">
            Cambiar contraseña
          </button>
        </form>
        <br />
        <h4>Consejos para contraseñas seguras:</h4>
        <div className='a_label'>
          <ul>
            <li>Usa al menos 8 caracteres, lo mejor es una combinación de números y letras.</li>
            <li>No uses la misma contraseña que has usado previamente con nosotros.</li>
            <li>No uses palabras del diccionario, tu nombre, dirección de correo electrónico, número de teléfono móvil u otra información personal que pueda obtenerse fácilmente.</li>
            <li>No uses la misma contraseña para varias cuentas en línea.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Reset;

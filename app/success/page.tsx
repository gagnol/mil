
import Clearcart from "../components/Cart/ClearCartPaid";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";

const SuccessPage = async () => {
  const session = await getServerSession();

  if( !session)    
    {
      redirect("/")
    }
  
  
  return (
    <>
      <div className='a_page'>
        <Clearcart/>
        <ul className="steps pb-10 sm:mx-5">
          <li data-content="✓" className="step step-primary text-white">Compra realizada con éxito!!!</li>
          <li className="step step-primary flex text-white">Preparando <span className="animate-ping">...</span></li>
          <li className="step step-primary flex text-white">Enviando <span className="animate-ping">...</span></li>
          <li className="step step-primary flex text-white">Producto recibido <span className="animate-ping">...</span></li>
        </ul>
        <div className=' w-[400px] xl:w-[800px] h-[800px] justify-center items-center text-center'>
          <h1 className="pb-10 text-2xl text-center font-bold text-white">Gracias por su compra, su pedido se está preparando</h1>
          <div className=" xl:flex justify-between w-full ">
            <Link href="/" >
            <button className="btn btn-primary m-5">Continuar comprando</button>
            </Link>
            <Link href="/profile" >
            <button className="btn btn-primary m-5">Ver detalles de la compra</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
export default SuccessPage
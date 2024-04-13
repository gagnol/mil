"use client"
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import CartProduct from "@/app/components/Cart/CartProduct";
import ResetCart from "@/app/components/Cart/ResetCart";
import Link from "next/link";
import CartPayment from "@/app/components/Cart/CartPayment";
import { useRouter } from "next/navigation";

const CartPage = () => {
  const { productData,userInfo} = useSelector((state: any) => state.next);
  const router = useRouter();

  useEffect(() => {
        if (!userInfo || userInfo === null || userInfo === undefined || userInfo.length === 0) {
          router.push('/signin'); 
    }
  }, [userInfo, router]); 

  return (
    <div className="max-w-screen-2xl mx-auto px-6 grid md:grid-cols-2 xl:grid-cols-5 gap-2 py-4">
      {productData.length > 0 ? (
        <>
          <div className="bg-neutral col-span-4 p-4 rounded-lg">
            <div className="flex items-center justify-between border-b-[1px] border-b-white pb-1">
              <p className="text-2xl text-white font-semibold text-amazon_blue">
                Carrito de compras
              </p>
            </div>
            <div className="p-2 flex flex-col gap-2  bg-neutral">
              {productData.map((item: any) => (
                <div key={item._id}>
                  <CartProduct item={item} />
                </div>
              ))}
              <ResetCart />
            </div>
          </div>
          <div className="bg-neutral h-65 col-span-1 p-4 rounded-lg flex items-center justify-center">
            <CartPayment />

          </div>
          <div className="xl:w-[1000px] md:w-[300px] md:m-1 border-[1px] p-4 m-10 bg-neutral">
            <p>
            El precio y la disponibilidad de los artículos en están sujetos a cambios. 
            El Carrito es un lugar temporal para almacenar una lista de tus artículos 
            y refleja el precio más reciente de cada artículo
            </p>
          </div>
        </>
      ) : (
        <div className=" h-64 col-span-5 flex flex-col items-center 
        justify-center py-5 rounded-lg shadow-lg bg-neutral">
          <h1 className="text-lg font-medium">Tu carrito está vacío!</h1>
          <Link href={"/"}>
            <button className="w-52 h-10 bg-amazon_blue text-white rounded-lg text-sm 
            font-semibold hover:bg-amazon_yellow hover:text-black">
              Ir a comprar ahora
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default CartPage;

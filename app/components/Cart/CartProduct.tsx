"use client"
import Image from "next/image";
import React from "react";
import { LuMinus, LuPlus } from "react-icons/lu";
import { IoMdClose } from "react-icons/io";
import { useDispatch } from "react-redux";
import {
  decreaseQuantity,
  deleteProduct,
  increaseQuantity,
} from "@/store/nextSlice";
import Link from "next/link";

const CartProduct = ({ item }:any) => {
  const dispatch = useDispatch();
  return (
    <div className=" bg-neutral rounded-lg flex text-white ">
      <Link href={`/product/${item.slug}`}>
        <Image
          width={150}
          height={150}
          src={item.image[0]}
          alt="productImage"
          className="min-h-[150px] max-h-[150px] min-w-[150px]"
        />
      </Link>
      <div className="flex items-center px-2 gap-4">
        <div className="flex flex-col gap-1">
          <p className="text-lg font-semibold ">
            {item.name}
          </p>
          <p className=" text-base">
            Precio de Lista{" "}
            <span className="font-semibold text-white line-through">
             € {item.price.toFixed(2)}
            </span>
          </p>
          
          <div className="flex items-center gap-6 justify-center">
            <div className="flex items-center mt-1 justify-between border
             border-gray-300 px-4 py-1 rounded-full w-28 shadow-lg shadow-gray-300">
              <span
                onClick={() =>
                  dispatch(
                    increaseQuantity({
                      ...item,
                      quantity: 1,
                      discountPrice:item.discountPrice
                    })
                  )
                }
                className="w-6 h-6 flex items-center justify-center 
                rounded-full text-base bg-transparent hover:bg-base-100 cursor-pointer
                decoration-purple-300"
              >
                <LuPlus />
              </span>
              <span>{item.quantity}</span>
              <span
                onClick={() =>
                  dispatch(
                    decreaseQuantity({
                      ...item,
                      quantity: 1,
                      discountPrice:item.discountPrice
                    })
                  )
                }
                className="w-6 h-6 flex items-center justify-center rounded-full
                text-base bg-transparent hover:bg-base-200 cursor-pointer decoration-purple-300"
              >
                <LuMinus />
              </span>
            </div>
            <div
              onClick={() => dispatch(deleteProduct(item._id))}
              className="flex items-center text-sm font-medium text-white
               hover:text-red-600 cursor-pointer duration-300"
            >
              <IoMdClose className="mt-[2px]" /> <p>Eliminar</p>
            </div>
          </div>
        </div>
        <div className=" justify-center min-w-[180px] text-lg font-semibold text-white">
          € {(item.discountPrice * item.quantity).toFixed(2)}
        </div>
      </div>
    </div>
  );
};

export default CartProduct;

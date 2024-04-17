"use client"
import React from "react";
import Image from "next/image";
import { FaHeart } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { addFavorite } from "@/store/nextSlice";
import toast from "react-hot-toast";
import Link from "next/link";
import { MdOutlineShoppingCartCheckout } from "react-icons/md";

const Products = ({ product }:any) => {
  const dispatch = useDispatch();
  return (
    <div
      key={product._id}
      className="w-full text-black p-4 rounded-lg gap-2 group overflow-hidden">
      <div className="w-full xl:w-full h-[160px] xl:h-[260px] relative">
              <Link href={`/products/${product.slug}`}  >
          <Image
            className="w-full h-full scale-90 hover:scale-100 
            transition-transform duration-300 rounded-lg"
            width={200}
            height={200}
            src={product.image[0]}
            alt="productImage"
            priority
          /> 
        </Link>
        <div className="w-12 h-24 absolute bottom-10 right-0 
              border-[1px] border-gray-400 bg-white rounded-md 
              flex flex-col translate-x-20 group-hover:translate-x-0 
              transition-transform duration-300">
          <span className="w-full h-full border-b-[1px] 
                  border-b-gray-400 flex items-center justify-center
                   text-xl bg-transparent hover:bg-warning cursor-pointer
                   duration-300">
            <Link href={`/products/${product.slug}`}  >
              <MdOutlineShoppingCartCheckout className="text-[#5e514b]" />
            </Link>
          </span>
          <span
            onClick={() =>
              dispatch(
                addFavorite({
                  ...product,
                  quantity: 1
                }),
                toast.success('Product add to favorite',
                 { duration: 4000, position: "top-center", })
              )
            }
            className="w-full h-full border-b-[1px]
                   border-[#5c514e] flex items-center justify-center
                    text-xl bg-transparent hover:bg-warning cursor-pointer 
                    duration-300"
          >
            <FaHeart className="text-[#5e514b]" />
          </span>
        </div>
      </div>
      <hr/>
      <div className="px-4 py-3 flex flex-col gap-1">
        <p className="text-lg text-black tracking-wide font-semibold text-center">€{product.price}</p>
        <p className="flex items-center text-center gap-2">
        </p>
      </div>
    </div>
  );
};

export default Products;

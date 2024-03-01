"use client"
import Image from "next/image";
import React from "react";
import { useDispatch } from "react-redux";
import { addCart, resetFavorite } from "@/store/nextSlice";
import Link from "next/link";

const FavoriteProduct = ({ item }: any) => {
  const dispatch = useDispatch();
  return (
    <div className="bg-base-300 rounded-lg flex flex-col md:flex-row p-2 items-center gap-4 mb-2">
      <Link  href={`/products/${item.slug}`} >
        <div className="block min-w-[150px] text-center text-primary cursor-pointer">
          <Image src={item.image} alt="Product image" width={150} height={150}
            className="max-h-[150px] min-h-[150px]	" />
          <p>View product</p>
        </div>
      </Link>
      <div className="flex items-center px-2 gap-4">
        <div className="flex flex-col gap-1">
          <p className="text-lg font-semibold ">{item.name}</p>
          <p className="text-sm text-gray-500">{item.description}</p>
          <p className="text-sm">
            Unit price:{" "}
            <span className="font-semibold text-amazon_blue">
              ${item.price}
            </span>
          </p>

        </div>
        <div className="text-lg font-semibold text-amazon_blue">
          ${item.price * item.quantity}
        </div>
      </div>
    </div>
  );
};

export default FavoriteProduct;
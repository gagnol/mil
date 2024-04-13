
"use client"
import React from 'react'
import { useDispatch } from 'react-redux';
import { addFavorite } from '@/store/nextSlice';
import toast from "react-hot-toast";

interface AddToFavoriteProps {
    product:any;
  }
  
const AddToFavorite: React.FC<AddToFavoriteProps> = ({product}) => {
    const dispatch = useDispatch();
  return (
    <>
        <button className="btn btn-outline btn-primary w-full my-4 p-1 cursor-pointer rounded-sm
                hover:bg-[#666]"
                  onClick={() =>
                    dispatch(
                      addFavorite({
                        ...product
                      }),
                      toast.success('Producto a tu lista de favoritos', { duration: 4000, position: "top-center", })
                    )
                    
                    } >
                  Agregar a mis Favoritos
                </button>
    </>
  )
}
 
export default AddToFavorite
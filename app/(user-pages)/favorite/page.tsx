"use client"
import React from "react";
import { useSelector } from "react-redux";
import FavoriteProduct from "@/app/components/User-navigation/FavoriteProduct";
import ResetFavoriteItems from "@/app/components/User-navigation/ResetFavoriteItems";
import Link from "next/link";



const FavoritePage: React.FC = () => {
  const { favoriteData } = useSelector((state: any) => state.next);

  return (
    <div className="max-w-screen-xl mx-auto px-6 gap-10 py-4">
      {favoriteData.length > 0 ? (
        <div className="bg-base p-4 rounded-lg">
          <div className="flex items-center justify-between border-b-[1px] pb-1">
            <p className="text-2xl font-semibold text-neutral-300">
              Whishlist 
            </p>
            
          </div>
          <div>
            {favoriteData.map((item: any) => (
              <div key={item._id} className="mt-2">
                <FavoriteProduct item={item} />
                
              </div>
            ))}
            
            <ResetFavoriteItems />
         
          </div>
        </div>
      ) : (
        <div className="bg-base h-96 flex flex-col items-center  border-b-gray-400
        justify-center py-5 rounded-lg shadow-lg">
          <h1>Nothing is available in the Whishlist</h1>
          <Link href="/">
            <button className="btn btn-primary btn-outline my-1">
              go to shopping
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default FavoritePage;
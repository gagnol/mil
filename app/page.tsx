import Banner from "@/app/components/Banner";
import ProductModel from '@/lib/product-model'
import Imagecard from "@/app/components/Cards/Imagecard";
import Dealcard from "@/app/components/Cards/Dealcard";
import Image from "next/image";
import Link from "next/link";
import {
  singleImage0,
  singleImage1,
  singleImage2,
  singleImage3,
  singleImage4,
  singleImage5,
  singleImage6,
  singleImage7,
  singleImage8,
  singleImage9,
  singleImage10,
  singleImage11,
  singleImage12,
  singleImage13,
  singleImage14,
  singleImage15,
  singleImage16,
  singleImage17,
  singleImage18,
} from "@/constant";
import Cuadcard from "@/app/components/Cards/quadrantcard";
import Slider from '@/app/components/Sections-Home/Slider'
import dbConnect from "@/lib/db-connect";
import Products from "./components/Sections-Home/Products";
import CookiesAdvise from "./components/Sections-Home/CookiesAdvise"

export default async function Home() {
  await dbConnect();
  const singleDealDoc = (await ProductModel.find({ slug: 1 }, "-reviews").lean());
  const singleDealDoc2 = (await ProductModel.find({ slug: 2 }, "-reviews").lean());
  const singleDealDoc3 = (await ProductModel.find({ slug: 8 }, "-reviews").lean());
  const bestSellerDoc = (await ProductModel.find().lean());

  const singleDeal = await JSON.parse(JSON.stringify(singleDealDoc));
  const singleDeal2 = await JSON.parse(JSON.stringify(singleDealDoc2));
  const singleDeal3 = await JSON.parse(JSON.stringify(singleDealDoc3));
  const bestSeller = await JSON.parse(JSON.stringify(bestSellerDoc));
 
 
  return (
    <main>
      <div className="max-w-screen-2xl mx-auto py-2 ">
      <CookiesAdvise/>
      <Banner/> 
        <div className="relative md:-mt020 lgl:-mt-32 xl:-mt-[350px] z-20 mb-10">
          <div className="w-full px-6 grid sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3">
            <Cuadcard
              headline="Carnes"
              singleImage={[singleImage8, singleImage9, singleImage10, singleImage11]}
              subcategory={["Vacuna", "Pollo", "Cerdo", "Pescados"]} />
             {/* deals */}  
               {singleDeal.map((deals:any) => (
                <Dealcard 
                deals={deals}
                key={deals.slug} />
                ))}
            <Imagecard
              headline="Bebidas"
              singleImage={singleImage2}
              subcategory="Bebidas"
            />
           
              <Imagecard
              headline="Congelados"
              singleImage={singleImage3}
              subcategory="Personal Care"
            />
            
            <Imagecard
              headline="Helados" 
              singleImage={singleImage1}
              subcategory="Pet Supplies" />
            <Imagecard
              headline="Lácteos"
              singleImage={singleImage5}
              subcategory="Dresses" />
            <Imagecard
              headline="Panadería"
              singleImage={singleImage4}
              subcategory="Toys & Games" />
            <Cuadcard
              headline="Accesorios"
              singleImage={[singleImage12, singleImage13, singleImage14, singleImage15]}
              subcategory={["Papelería", "Utensillos", "Take e way", "Vajilla"]} />
          </div>
          <div className="relative bg-[#58aab3] mb-4 pb-2 max-w-screen-2xl mx-6 rounded-xl">
            <h2 className="text-[21px] pl-9 font-semibold pt-1 text-black">
              Productos destacados
            </h2>
            <ul className="flex gap-2 overflow-x-scroll scrollbar-hide">
            <Slider>
              {bestSeller.map((product:any) => (
                <li key={product.slug}>
                  <Products product={product} />
                </li>
              ))}
            </Slider>
          </ul>
           </div>
           <div className="relative bg-[#58aab3] mb-4 pb-2 max-w-screen-2xl mx-6 rounded-xl">
            <h2 className="text-[21px] pl-9 font-semibold pt-1 text-black">
              Ofertas del día
            </h2>
            <ul className="flex gap-2 overflow-x-scroll scrollbar-hide">
            <Slider>
              {bestSeller.map((product:any) => (
                <li key={product.slug}>
                  <Products product={product} />
                </li>
              ))}
            </Slider>
          </ul>
           </div>
          <div className="hidden md:block justify-center items-center px-60 py-1 mb-5">
            <Link href={`/products/557`} >
              <Image src="/slide_14.png" alt="" width={970} height={250} priority />
            </Link>
         
          </div>
          <div className="w-full px-6 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3">
            {singleDeal2.map((deals:any) => (
              <Dealcard
                deals={deals}
                key={deals.slug} />
            ))}
            {/* ********************************************************** */}
            <Imagecard
              headline="Frutas"
              singleImage={singleImage0}
              subcategory="Fitness"
            />
            {/* ********************************************************** */}
            <Imagecard
              headline="Verduras"
              singleImage={singleImage6}
              subcategory="Kindle"
            />
            {/* ********************************************************** */}
            <Imagecard
              headline="Salsas y aceites"
              singleImage={singleImage7}
              subcategory="Strip Lights"
            />
            {/* ********************************************************** */}
          </div>
          <div className="relative bg-[#58aab3] mb-4 pb-2 max-w-screen-2xl mx-6 rounded-xl">
            <h2 className="text-[21px] pl-9 font-semibold pt-1 text-black">
              Los mejores en Ventas
            </h2>
            <ul className="flex gap-2 overflow-x-scroll scrollbar-hide">
            <Slider>
              {bestSeller.map((product:any) => (
                <li key={product.slug}>
                  <Products product={product} />
                </li>
              ))}
            </Slider>
          </ul>
           </div>
           <div className="relative bg-[#58aab3] mb-4 pb-2 max-w-screen-2xl mx-6 rounded-xl">
            <h2 className="text-[21px] pl-9 font-semibold pt-1 text-black">
              Nuevos productos
            </h2>
            <ul className="flex gap-2 overflow-x-scroll scrollbar-hide">
            <Slider>
              {bestSeller.map((product:any) => (
                <li key={product.slug}>
                  <Products product={product} />
                </li>
              ))}
            </Slider>
          </ul>
           </div>
{/*  */}
<div className="w-full px-6 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3">
            
            {/* ********************************************************** */}
            <Imagecard
              headline="Tartas"
              singleImage={singleImage16}
              subcategory="Fitness"
            />
            {/* ********************************************************** */}
            <Imagecard
              headline="Frutos secos"
              singleImage={singleImage17}
              subcategory="Kindle"
            />
            {singleDeal3.map((deals:any) => (
              <Dealcard
                deals={deals}
                key={deals.slug} />
            ))}
            {/* ********************************************************** */}
            <Imagecard
              headline="Limpieza"
              singleImage={singleImage18}
              subcategory="Strip Lights"
            />
          
          </div>
          {/* ********************** */}
          <div className="relative bg-[#58aab3] mb-4 pb-2 max-w-screen-2xl mx-6 rounded-xl">
            <h2 className="text-[21px] pl-9 font-semibold pt-1 text-black">
              Limpieza
            </h2>
            <ul className="flex gap-2 overflow-x-scroll scrollbar-hide">
            <Slider>
              {bestSeller.map((product:any) => (
                <li key={product.slug}>
                  <Products product={product} />
                </li>
              ))}
            </Slider>
          </ul>
           </div>
           <div className="relative bg-[#58aab3] mb-4 pb-2 max-w-screen-2xl mx-6 rounded-xl">
            <h2 className="text-[21px] pl-9 font-semibold pt-1 text-black">
              Accesorios
            </h2>
            <ul className="flex gap-2 overflow-x-scroll scrollbar-hide">
            <Slider>
              {bestSeller.map((product:any) => (
                <li key={product.slug}>
                  <Products product={product} />
                </li>
              ))}
            </Slider>
          </ul>
           </div>
           <div className="relative bg-[#58aab3] mb-4 pb-2 max-w-screen-2xl mx-6 rounded-xl">
            <h2 className="text-[21px] pl-9 font-semibold pt-1 text-black">
              Despensa
            </h2>
            <ul className="flex gap-2 overflow-x-scroll scrollbar-hide">
            <Slider>
              {bestSeller.map((product:any) => (
                <li key={product.slug}>
                  <Products product={product} />
                </li>
              ))}
            </Slider>
          </ul>
           </div>
          {/* ************************************************************* */}
        </div>
      </div>
      
    </main>
  );
}


import Banner from "@/app/components/Banner";
import ProductModel from '@/lib/product-model'
import Imagecard from "@/app/components/Cards/Imagecard";
import Dealcard from "@/app/components/Cards/Dealcard";
import Image from "next/image";
import Link from "next/link";
import {
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
} from "@/constant";
import Cuadcard from "@/app/components/Cards/quadrantcard";
import Slider from '@/app/components/Slider'
import dbConnect from "@/lib/db-connect";

export default async function Home() {
  await dbConnect();
  const singleDealDoc = (await ProductModel.find({ slug: 1 }, "-reviews").lean());
  const singleDealDoc2 = (await ProductModel.find({ slug: 2 }, "-reviews").lean());
  const bestSellerDoc = (await ProductModel.find().lean());

  const singleDeal = await JSON.parse(JSON.stringify(singleDealDoc));
  const singleDeal2 = await JSON.parse(JSON.stringify(singleDealDoc2));
  const bestSeller = await JSON.parse(JSON.stringify(bestSellerDoc));
 
 
  return (
    <main>
      <div className="max-w-screen-2xl mx-auto py-2 ">
         <Banner/> 
        <div className="relative md:-mt020 lgl:-mt-32 xl:-mt-[350px] z-20 mb-10">
          <div className="w-full px-6 grid sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3">
            <Cuadcard
              headline="Carnes"
              singleImage={[singleImage8, singleImage9, singleImage10, singleImage11]}
              subcategory={["Vacuna", "Pollo", "Cerdo", "Pescados"]} />
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
              headline="Mariscos"
              singleImage={singleImage3}
              subcategory="Personal Care"
            />
           
            <Imagecard
              headline="Pescados" 
              singleImage={singleImage1}
              subcategory="Pet Supplies" />
            <Imagecard
              headline="Lacteos"
              singleImage={singleImage5}
              subcategory="Dresses" />
            <Imagecard
              headline="Conservas"
              singleImage={singleImage4}
              subcategory="Toys & Games" />
            <Cuadcard
              headline="Panificados"
              singleImage={[singleImage12, singleImage13, singleImage14, singleImage15]}
              subcategory={["Jamones", "Quesos", "Vinos", "Salsas"]} />
          </div>
          <div className="relative bg-neutral mb-4 pb-2 max-w-screen-2xl mx-6">
            <h2 className="text-[21px] pl-9 font-semibold pt-1 text-white">
              Productos destacados
            </h2>
            <Slider products={bestSeller}/>
          </div>
          <div className="hidden md:block justify-center items-center px-60 py-1 mb-5">
            <Link href={`/products/557`} >
              <Image src="/amazon2.webp" alt="" width={970} height={250} priority />
            </Link>
            <div>
              <span className="text-[11px] text-[#888] float-right pr-[80px]">Sponsored</span>
            </div>
          </div>
          <div className="w-full px-6 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3">
            {singleDeal2.map((deals:any) => (
              <Dealcard
                deals={deals}
                key={deals.slug} />
            ))}
            {/* ********************************************************** */}
            <Imagecard
              headline="Accesorios"
              singleImage={singleImage5}
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
              headline="Productos de Limpieza"
              singleImage={singleImage7}
              subcategory="Strip Lights"
            />
            {/* ********************************************************** */}
          </div>
        </div>
      </div>

      <div className="w-[100%] p-4 h-[150px] " >
        <div className="text-center text-[14px] my-[19px] px-5 mx-auto" >
          <div className=" my-2 block justify-center" >
            <Link href="/signin" >
              <button className="h-[29px] w-[220px] px-5 py-1 font-medium text-black
                 border-[#a88734]  rounded-sm bg-gradient-to-b from-[#f7dfa5] to-[#f0c14b] 
                 hover:cursor-pointer hover:opacity-75" >
               Identificate
              </button>
            </Link>
          </div>
          <h4>Ver recomendaciones personalizadas</h4>
          <div className="text-white">¿Sos un cliente nuevo?&nbsp;
            <Link href="/register" ><span className="text-primary">Empieza aquí.</span></Link>
          </div>

        </div>
      </div>
    </main>
  );
}


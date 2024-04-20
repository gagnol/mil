
import AddToFavorite from "@/app/components/Product-detail/addToFavorite";
import AddToCart from "@/app/components/Product-detail/addToCart";
import ImageGallery from "@/app/components/Product-detail/image-gallery";
import Loading from "@/app/components/Product-detail/loading";
import Progressbar from "@/app/components/Product-detail/progressbar";
import Reviews from "@/app/components/Product-detail/reviews";
import Slider from "@/app/components/Slider";
import Rating from "@/app/components/rating";
import dbConnect from "@/lib/db-connect";
import ProductModel from "@/lib/product-model";
import TaskModel from "@/lib/task-model";
import Image from "next/image";
import { FaLock } from "react-icons/fa";
import CountryTaxes from "@/app/components/Product-detail/countryTaxes";
import ReviewForm from "@/app/components/Product-detail/reviewForm";
import { getServerSession } from "next-auth";
import Link from "next/link";

export default async function ProductDetail({ params }: { params: { slug: string } }) {

  const slug = params.slug;

  await dbConnect();
  const productDocs = (await ProductModel.findOne({ slug }))
  const product = JSON.parse(JSON.stringify(productDocs));


  const similarProductsDocs = (await ProductModel.find({ subcategory: product.subcategory }, "-reviews"))
  const similarProducts = JSON.parse(JSON.stringify(similarProductsDocs));

  const questionProductsDocs = (await TaskModel.find({ product: product._id }, "-reviews"))
  const questionProducts = JSON.parse(JSON.stringify(questionProductsDocs));

  const discountPrice = Math.ceil(product.price - (product.price * (product.discount / 100)))

  const videoCounter = product?.video?.length || 0;
  const imageCounter = product?.image?.length || 0;
  const countAnswer = questionProducts?.length || 0;
  const countReviews = product?.reviews?.length || 0

  const session = await getServerSession();

  //CUSTOMER REVIEWS

  const reviewsMaping = product.reviews.map((item: any) => {
    return item.rating;
  });

  const result: Record<string, number> = {};

  // Initialize quantities for all ratings from 1 to 5
  for (let i = 1; i <= 5; i++) {
    result[i.toString()] = 0;
  }

  reviewsMaping.forEach((x: any) => {
    result[x] = (result[x] || 0) + 1;
  });

  const reviewsPercentage = Object.entries(result).map((entry) => {
    return entry;
  });

  return (
    <Loading >
      <div className="flex flex-wrap sm:justify-center lg:justify-start mt-10 ml-10 text-white">
        <div >
          <ImageGallery product={product} />
          <div className="w-[483px] h-[240px] bg-base-200 mt-5 text-center p-2 " >
            <div className="w-[80%] mx-auto">
              <p><strong>Aviso</strong></p>
            </div>
            <div className="w-[80%] mx-auto">
              <div className="text-[14px]"><p></p>
                <p>To benefit from Wi-Fi 6, you&amp;
                  ll need a Wi-Fi 6-compatible router (like the eero 6),
                  but Fire TV Stick 4K Max is also compatible with earlier wifi routers.
                  For Alexa Home Theater audio, you&amp;ll need to pair the Fire TV Stick
                  4K Max with compatible Echo speakers.
                  <br />
                  <a className="text-yellow-50">Learn more about device compatibility.</a>
                </p>
                <br />
              </div>
            </div>
          </div>
        </div>
        <div className="w-[40%] ml-5">
          <h4 className="text-[24px] text-white">{product.name}</h4>
          <h4>Vendedor: <a className="text-primary">{product.brand}</a></h4>
          <div className="flex flex-wrap items-center space-x-2 mb-2  border-b-2 ">
            <div className="my-2">
              <div className="flex">
              <span className="mx-1">{product?.rating}</span>

                <Rating value={product.rating} />
              </div>
            </div>
            <span className="ml-1">{product.numReviews} ratings |</span>
            <h4>{countAnswer} preguntas de compradores</h4>
          </div>
          <div className='mb-4 '>
            {product.bestSeller === "true" ?
              (
                <div className="flex" >
                  <Image alt='' src='/bestseller.png' width={124} height={38} style={{ width: 123, height: "auto" }} />
                  <p className="p-2">in&nbsp;{product.subcategory} </p>
                </div>)
              :
              (<></>)}
          </div>
          {/* Have Discount */}
          {product.discount > 0 ?
            <>
              <div className="flex items-start ">
                <h5 className="text-[28px] text-[#CC0C39] ">-{product.discount}%</h5>
                &nbsp;
                <h4 className="text-[28px] pl-2">
                  <span className="text-[13px] align-middle">€</span>
                    {Math.ceil(discountPrice)}
                </h4>
              </div>
              <div className="flex">
                <h6>Precio de lista :</h6>
                &nbsp;   &nbsp;<h6 className="line-through"> €{product.price}</h6>
              </div>
            </>
            :
            <div className="flex text-center">
              <h4 className="text-[28px] ">
                <span className=" text-[14px] font-bold mr-5">Precio: </span>
                <span className="text-[13px] align-middle"> €</span>
                {product.price}
              </h4>
            </div>
          }
          <div className="flex text-center">
            <h4 className="text-[14px] font-bold mr-5">Departamento</h4>
            <h5 className="text-[14px] font-normal">{product.category}</h5>
          </div>
          <div className="flex text-center">
            <h4 className="text-[14px] font-bold mr-5" >Categoría</h4>
            <h5 className="text-[14px] font-normal">&nbsp;{product.subcategory}</h5>
          </div>
          {/* COLOR SELECTION */}
          

          <div className="mt-5">
            <h4 className="text-[16px] font-bold mt-2" >Sobre este producto</h4>
            <h5 className="text-[14px] font-normal text-white" >
              {product.description}
            </h5>
          </div>
        </div>
        {/* Rigth */}
        <div className=" w-[50%] md:w-[20%] ml-5 flex-col border-white border-[1px] rounded p-2">
          {product.discount > 0 ?
            <>
              <div className="flex align-middle">
                <h4 className="text-[28px] pl-2">
                  <span className=" text-[18px] align-middle">Precio: </span>
                  <span className="text-[13px] align-middle"> €</span>
                  {Math.ceil(discountPrice)}
                </h4>
              </div>
            </>
            :
            <div className="flex align-middle">
              <h4 className="text-[28px] pl-2">
                <span className=" text-[18px] align-middle">Precio: </span>
                <span className="text-[13px] align-middle">€</span>
                {product.price}
              </h4>
            </div>
          }

          <CountryTaxes discountPrice={discountPrice} product={product}/>

          {product.countInStock > 0 ? <>
            <h4 className="text-[18px] text-[#007600] font-normal my-2">
              Disponible
            </h4><br />
            <AddToCart product={product} discountPrice={discountPrice} />
             </>
            : <h4 className="text-[18px] text-[#B12704] font-normal my-2">
              Temporalmente sin stock.</h4>}
          <h4 className="flex text-[14px] text-primary my-1">
            <FaLock color='#949494' fontSize={16} />
            &nbsp; Transacción segura</h4>
          <div className="flex my-0 ">
            <h4 className="text-white text-[14px] my-2">Enviado por</h4>
            <h5 className="font-normal text-[14px] my-2">&nbsp;{product.brand}</h5>
          </div>
          <div className="flex my-0 ">
            <h4 className="text-white text-[14px] my-2">Vendedor</h4>
            <h5 className="font-normal text-[14px] my-2">&nbsp;{product.brand}</h5>
          </div>
          <div className="flex my-2">
            
          </div>
          <div className="border-[#D5D9D9] border-[1px] rounded-lg
       bg-light-white relative py-[14px] px-[18px]">

            <Image
              src="https://m.media-amazon.com/images/G/01/marketing/prime/new_prime_logo_RGB_blue._CB426090081_.png"
              alt="Amazon prime logo"
              width={50} height={31} />

            
            <br />
            <span >
              <h4 >Try Prime	and start saving today with
                <span className="text-[14px] text-white font-normal mt-2 pl-1">
                  <strong>Fast, FREE Delivery</strong>
                </span>
              </h4>
            </span>
          </div>
          <br />
          <label>
           
          </label>
          <AddToFavorite product={product} />
        </div>
      </div>
      <br />
      <br />
      <div >
        <br />
        <div className="relative max-w-screen-2xl  px-4 py-4 md:py-4">
          <h2 className="text-[21px] font-semibold px-10 pt-1 mb-2 text-white">
            Productos relacionados 
          </h2>
          <Slider products={similarProducts} />
        </div >
        {/****************** QUESTIONS & ANSWERS ****************/}
        
        {/****************** CUSTOMER REVIEWS ****************/}
        <h2 className="text-[21px] pl-4 font-semibold mx-10 pt-2 border-t-2 text-white">
          Calificaciones de este producto
        </h2>
        <div className="grid grid-cols-2 px-10">
          <div className=" grid-cols-1 block mx-5 ">
            <div className="flex">
              <Rating value={product.rating} />
              <h1 className="px-2">{product.rating ? product.rating + ' out of 5' : 'Rating not available'}</h1>
            </div>
            <h2>{product.numReviews} Total de ratings</h2>
            <div className="border-white border-[1px] rounded p-2 my-5">
              {product.reviews && product.reviews.length > 0 ? (
                reviewsPercentage
                  ?.sort((a: any, b: any) => parseInt(b[0]) - parseInt(a[0]))
                  .map((item: any) => (
                    <div key={item}>
                      <Progressbar item={item} value={((item[1] / countReviews) * 100)} />
                    </div>
                  ))
              ) : (
                <p>No hay revisiones sobre este producto.</p>
              )}
            </div>

            {session ? (
              <>
                <ReviewForm session={session} product={product} />
              </>
            ) : (
              <div className='block '>
                <p >Califica este producto</p>
                <p className='text-white text-[14px] my-2'>
                 Compartí tus experiencias con otros usuarios
                </p>
                <Link href={`/signin?redirect=/product/${product.slug}`} >
                  <button className="my-[15px] p-1 w-[50%] btn btn-primary btn-outline" >
                    Tu calificación
                  </button>
                </Link>
              </div>
            )}

          </div>
          <div className="grid grid-cols-1 ">
            {product.reviews
              ?.map((item: any) => (
                <div key={item._id}>
                  <Reviews item={item} key={item} />
                </div>
              ))
              .slice(0, 10)
            }

          </div>
        </div>
      </div>
    </Loading>
  );
}

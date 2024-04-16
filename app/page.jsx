
import dbConnect from "@/lib/db-connect";
import ProductModel from "@/lib/product-model";
import Billboard from '@/app/components/Sections-Home/Billboard';
import Main from "@/app/components/Sections-Home/Main";
import Bottom from "@/app/components/Sections-Home/Bottom";
import Banner from "./components/Banner";
import Image from "next/image";


export default async function Home() {

  await dbConnect();
  const topProductDoc = (await ProductModel.find().lean())
  const topProduct = await JSON.parse(JSON.stringify(topProductDoc))
  
  const randomIndex = Math.floor(Math.random() * topProduct.length);
  const randomProduct = topProduct[randomIndex];


  const productsData = await ProductModel.aggregate([
    {
      $group: {
        _id: '$category',
        products: { $push: '$$ROOT' },
        totalProducts: { $sum: 1 },
      },
    },
    {
      $unwind: '$products',
    },
    {
      $project: {
        category: '$_id',
        _id: '$products._id',
        slug: '$products.slug',
        title: '$products.name',
        image: { $arrayElemAt: ['$products.image', 0] }
      },
    },
    { $sort: { category: 1 } },
  ]);

  const productsByCategory = {};

  productsData.forEach((product) => {
    const { category, name, image, slug } = product;
    if (category !== 'PC gaming' && category !== 'Electronics') { // Exclude categories
      if (!productsByCategory[category]) {
        productsByCategory[category] = {
          category,
          products: [],
        };
      }
      productsByCategory[category].products.push({ name, image, slug });
    }
  });

  const result = Object.entries(productsByCategory).map((entry) => {
    return entry;
  });
  /* Channel */
  const ChannelDoc = (await ProductModel.find({ category: 'Electronics' }))
  const channelProduct = await JSON.parse(JSON.stringify(ChannelDoc))
  /* Podcast */
  const podcastDoc = (await ProductModel.find({ category: 'PC gaming' }))
  const podcastProduct = await JSON.parse(JSON.stringify(podcastDoc))

  return (
    <main className="max-w-screen-2xl xl:mx-auto mx-10">
      <Bottom />
      <Banner/>
      <Billboard product={randomProduct}/>
      <div className="hidden md:block justify-center items-center px-60 py-1 mb-5">
      <Image src="/slide_14.png" alt="" width={970} height={250} priority />
      </div>
      <Main result={result} />
      
    </main>
  );
}

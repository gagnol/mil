"use client"
import React from 'react';
import Slider from './Slider';
import Products from './Products';
import { InView } from 'react-intersection-observer';

interface Product {
  name: string;
  image: string;
  slug: string;
}

interface ProductsByCategory {
  [category: string]: {
    map(arg0: (product: any, productIndex: React.Key | null | undefined) => React.JSX.Element): unknown;
    category: string;
    products: Product[];
  };
}

interface MainProps {
  result: [string, ProductsByCategory][];
}

const Main: React.FC<MainProps> = ({ result }) => {
  return (
    <InView as="div" onChange={(inView, entry) => console.log('Inview1:', inView)}>
      <div className="container py-6">
        <h2 className="text-2xl xl:text-2xl font-bold mx-2 pb-10 text-white">
         Productos destacados
        </h2>
        {result.map(([category, data], index) => (
          <div key={index} className="pb-5">
            <h1 className="flex text-[14px] xl:text-[24px] font-bold text-white pl-20">{category}</h1>
            <ul className="flex gap-2 overflow-x-scroll scrollbar-hide">
              <Slider>
                {data.products.map((product: any, productIndex: React.Key | null | undefined) => (
                  <li key={productIndex}>
                    <Products product={product} />
                  </li>
                ))}
              </Slider>
            </ul>
          </div>
        ))}
      </div>
    </InView>
  );
};

export default Main;

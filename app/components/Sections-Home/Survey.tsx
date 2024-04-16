"use client"
import React from "react";
import { InView } from "react-intersection-observer";
import Slider from "../Slider";


const Survey = () => {
  
  
  return (
    <InView as="div" onChange={(inView, entry) => console.log('Inview3:', inView)}>
    <div className="container pt-10 pb-5">
      <div className="grid lg:grid-cols-[50%,1fr] gap-10">
        <div>
        
        </div>
        <div className="self-center mx-5 xl:mx-0">
          <h2 className="text-2xl xl:text-4xl font-bold mx-2 text-white">Discover Now</h2>
          <div className="min-h-[400px] mt-5">
           <Slider>
            
           </Slider>
          </div>
        </div>
      </div>
    </div>
    </InView>
  );
};

export default Survey;

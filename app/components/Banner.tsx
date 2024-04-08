"use client"
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Image from "next/image";


const Banner = () => {
  return (
    <div className="relative ">
      <Carousel
        autoPlay
        infiniteLoop
        showStatus={false}
        showIndicators={false}
        showThumbs={false}
        interval={4000}
      >
        <div>
          <Image priority src="/slide_15.jpg" alt="sliderImg" width={1500} height={600} />
        </div>
        <div>
       
          <Image  priority src="/slide_11.jpg" alt="sliderImg" width={1500} height={600} 
            className="hover:cursor-pointer"/>
   
        </div>
        <div>
        <Image  priority src="/slide_14.png" alt="sliderImg" width={1500} height={600} />
        </div>
        <div>
        <Image  priority src="/slide_13.jpg" alt="sliderImg" width={1500} height={600} />
        </div>
        <div>
        <Image  priority src="/slide_14.png" alt="sliderImg" width={1500} height={600} />
        </div>
      </Carousel>
      
    </div>
  );
};

export default Banner;

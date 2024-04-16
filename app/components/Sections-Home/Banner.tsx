"use client"
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Image from "next/image";


const Banner = () => {
  return (
    <div className=" relative xl:absolute h-full xl:w-[70%] w-full 
    overflow-hidden bottom-0 right-0 z-10 xl:z-[-2] ">
      <Carousel
        autoPlay
        infiniteLoop
        showStatus={false}
        showIndicators={false}
        showThumbs={false}
        interval={5000}
        showArrows={false}
      >
        <div>
          <Image priority src="/fashion3.jpg" alt="sliderImg" width={972} height={475}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <div>
          <Image src="/fashion1.jpg" alt="sliderImg" width={972} height={475} 
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          loading="lazy"
          />
        </div>
        <div>
          <Image src="/fashion2.avif" alt="sliderImg" width={972} height={475}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          loading="lazy"
          />
        </div>
         
      </Carousel>
      
    </div>
  );
};

export default Banner;

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
        <Image priority src="/3.jpg" alt="slider1" width={1500} height={250} className="rounded-xl" />
        </div>
        <div>
        <Image  priority src="/4.jpg" alt="slider2" width={1500} height={250} className="rounded-xl" />
        </div>
        <div>
        <Image  priority src="/slide_14.png" alt="slider3" width={1500} height={250} className="rounded-xl" />
        </div>
        <div>
        <Image  priority src="/3.jpg" alt="slider4" width={1500} height={250} className="rounded-xl" />
        </div>
        <div>
        <Image  priority src="/4.jpg" alt="slider5" width={1500} height={400} />
        </div>
      </Carousel>
      
    </div>
  );
};

export default Banner;

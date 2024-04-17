"use client"
import Slick from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


function Slider({ children }:any) {

    const settings = {
        centerMode: false,
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 5,
        initialSlide: 0,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
              infinite: false,
              dots: false,

            }
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
              initialSlide: 2,
              infinite: false,
              dots: false,
            }
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1
            }
          }
        ]
      };

    return (
        <>
          <Slick {...settings} className=" w-[70%] xl:w-[90%] h-full mx-auto
           items-center justify-center ">
            {children}
          </Slick>
        </>
    );
}

export default Slider;
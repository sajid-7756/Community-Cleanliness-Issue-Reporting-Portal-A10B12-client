import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const PrevArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-base-100/90 hover:bg-base-100 p-3 rounded-full shadow-lg transition-all"
  >
    <FaChevronLeft className="text-primary" size={20} />
  </button>
);

const NextArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-base-100/90 hover:bg-base-100 p-3 rounded-full shadow-lg transition-all"
  >
    <FaChevronRight className="text-primary" size={20} />
  </button>
);

const handleScrollDown = () => {
  window.scrollTo({
    top: 700,
    behavior: "smooth",
  });
};

const BannerSlider = () => {
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    appendDots: (dots) => (
      <div className="bottom-6">
        <ul className="flex gap-2 justify-center">{dots}</ul>
      </div>
    ),
    customPaging: () => (
      <div className="w-3 h-3 bg-base-200 hover:bg-base-300 rounded-full transition-all" />
    ),
  };

  const slides = [
    {
      image:
        "https://images.unsplash.com/photo-1749805339958-4b1d0f16423d?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Z2FyYmFnZSUyMGlzc3VlfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=500",
      title: "Report Community Issues",
      subtitle:
        "Help keep our community clean by reporting garbage and waste management issues",
    },
    {
      image:
        "https://plus.unsplash.com/premium_photo-1663090523245-0482efad87af?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Y29tbXVuaXR5JTIwY2xlYW5pbmclMkN8ZW58MHwwfDB8fHww&auto=format&fit=crop&q=60&w=500",
      title: "Join Our Clean Drive",
      subtitle:
        "Be a part of community-driven cleanliness initiatives and make a difference",
    },
    {
      image:
        "https://images.unsplash.com/photo-1605050714296-ef81755470ca?q=80&w=1080",
      title: "Sustainable Community",
      subtitle:
        "Together we can build a cleaner, greener, and more sustainable community",
    },
  ];

  return (
    <div className="banner-slider relative">
      <Slider {...settings}>
        {slides.map((slide, index) => (
          <div key={index} className="relative">
            <div className="relative h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden">
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/30 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 lg:p-16 text-white">
                <div className="container mx-auto">
                  <h2 className="text-white mb-3 max-w-2xl text-5xl font-bold">
                    {slide.title}
                  </h2>
                  <p className="text-lg md:text-xl text-white/90 max-w-xl mb-6">
                    {slide.subtitle}
                  </p>
                  <button
                    onClick={handleScrollDown}
                    className="btn btn-primary px-8"
                  >
                    Get Started
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default BannerSlider;

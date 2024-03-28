import { Link } from "react-router-dom";

import "swiper/swiper-bundle.css";
import "swiper/swiper-bundle.min.css";
import "../craousel.css";
import { Swiper, SwiperSlide } from "swiper/react";
import swiperCore, {
  Pagination,
  EffectCoverflow,
  Autoplay,
  Navigation,
} from "swiper";

const Slideshow = () => {
  swiperCore.use([Autoplay]);
  const slides = [
    {
      src: "https://tailwindui.com/img/ecommerce-images/home-page-03-hero-image-tile-01.jpg",
      alt: "img1",
    },
    {
      src: "https://tailwindui.com/img/ecommerce-images/home-page-03-hero-image-tile-02.jpg",
      alt: "img2",
    },
    {
      src: "https://tailwindui.com/img/ecommerce-images/home-page-03-hero-image-tile-05.jpg",
      alt: "img3",
    },
    {
      src: "https://tailwindui.com/img/ecommerce-images/home-page-03-hero-image-tile-04.jpg",
      alt: "img3",
    },
    {
      src: "https://tailwindui.com/img/ecommerce-images/home-page-03-hero-image-tile-06.jpg",
      alt: "img3",
    },
  ];
  return (
    <div className="carousel ">
      <div>
        <div className="carousel-content">
          <span>discover</span>
          <h1>Summer styles are finally here</h1>
          <hr />
          <p>
            This year, our new summer collection will shelter you from the harsh
            elements of a world that doesn't care if you live or die.
          </p>
          <Link href="#" className="slider-btn">
            Shop Collection
          </Link>
        </div>
      </div>
      <Swiper
        className="myswiper"
        modules={[Pagination, EffectCoverflow, Autoplay, Navigation]}
        direction="horizontal"
        slidesPerView={3}
        effect="coverflow"
        grabCursor={true}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        loop={true}
        pagination={{ clickable: true }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        breakpoints={{
          640: {
            slidesPerView: 2,
          },
          768: {
            slidesPerView: 1,
          },
          1024: {
            slidesPerView: 2,
          },
          1560: {
            slidesPerView: 3,
          },
        }}
      >
        {slides.map((data, index) => (
          <SwiperSlide
            key={index}
            className="myswiper-slider"
            style={{ backgroundImage: `url(${data.src})` }}
          />
        ))}
      </Swiper>
    </div>
  );
};

export default Slideshow;

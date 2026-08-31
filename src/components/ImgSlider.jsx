import { useEffect, useState } from "react";
import { getTrendingAll } from "../service/api";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import Loader from "./Loader";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";

function ImgSlider() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchSliderData = async () => {
      try {
        const data = await getTrendingAll();
        setMovies((data || []).slice(0, 5));
      } catch (err) {
        console.error("Failed to fetch slider data:", err);
      }
    };
    fetchSliderData();
  }, []);

  if (movies.length === 0) {
    return <Loader label="Loading slider..." />;
  }

  return (
    <div className="pt-20 overflow-hidden">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        speed={1000}
        navigation={{
          nextEl: ".custom-next",
          prevEl: ".custom-prev",
        }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        loop={true}
        className="img-slider relative h-[55vh] sm:h-[60vh] lg:h-[62vh] w-full rounded-3xl overflow-hidden bg-black"
      >
        {movies.map((movie) => (
          <SwiperSlide key={movie.id} className="relative w-full h-full">
            <img
              src={
                movie.backdrop_path
                  ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
                  : "/placeholder.jpg"
              }
              alt={movie.title || movie.name}
              className="absolute inset-0 w-full h-full object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/40 to-transparent"></div>

            <div className="absolute top-20 sm:top-32 lg:top-40 left-5 lg:left-12 z-10 w-[85%] sm:w-100 md:w-120 lg:w-160 text-white">
              <h1 className="font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-3">
                {movie.title || movie.name}
              </h1>
              <p className="text-xs sm:text-sm md:text-base h-20 sm:h-28 lg:h-35 text-gray-300 line-clamp-3 mb-4 sm:mb-6">
                {movie.overview}
              </p>

              <div className="flex flex-wrap gap-3 sm:gap-4">
                   <a href={`/watch/${movie.id}`}>
                <button
                  className="primary-color hover:-translate-y-2 duration-500 primary-hover text-white h-[36px] w-fit center-row px-5 sm:px-8 py-2.5 sm:py-3 rounded-xl transition-all cursor-pointer text-sm sm:text-base"
                  style={{ backgroundColor: "var(--primary-color)" }}
                  >
                  Play Now
                </button>
                  </a>
                <a href={`/watch/${movie.id}`}>

                <button className="bg-zinc-800/80 hover:-translate-y-2 duration-500 cursor-pointer h-[36px] w-fit center-row hover:bg-zinc-700 text-white font-medium px-4 sm:px-6 py-2 sm:py-2.5 rounded-xl transition-all backdrop-blur-sm text-sm sm:text-base">
                  More Info
                </button>
                </a>
              </div>
            </div>
          </SwiperSlide>
        ))}

        <div className="arrows hidden lg:flex absolute bottom-6 right-12 z-20 gap-3 text-white/70 cursor-pointer">
          <div className="custom-prev l">
            <ArrowLeft />
          </div>
          <div className="custom-next r">
            <ArrowRight />
          </div>
        </div>
      </Swiper>
    </div>
  );
}

export default ImgSlider;
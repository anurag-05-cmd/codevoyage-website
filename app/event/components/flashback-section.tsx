"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCoverflow, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";

const topImages = [
  "/160.JPG",
  "/191.JPG",
  "/193.JPG",
  "/318.JPG",
  "/326.JPG",
  "/347.JPG",
  "/366.JPG",
  "/494.JPG",
  "/558.JPG",
];

const PictureGallery: React.FC = () => {
  const [cardWidth, setCardWidth] = useState(260);
  const [cardHeight, setCardHeight] = useState(165);

  useEffect(() => {
    const updateCardSize = () => {
      const w = window.innerWidth;
      if (w < 400) {
        // very small phones
        setCardWidth(220);
        setCardHeight(140);
      } else if (w < 640) {
        // phones
        setCardWidth(260);
        setCardHeight(160);
      } else if (w < 1024) {
        // tablets
        setCardWidth(300);
        setCardHeight(180);
      } else {
        // laptops / desktops
        setCardWidth(320);
        setCardHeight(200);
      }
    };
    updateCardSize();
    window.addEventListener("resize", updateCardSize);
    return () => window.removeEventListener("resize", updateCardSize);
  }, []);

  // Fullscreen preview (no sound)
  const handleImageClick = (src: string, alt: string) => {
    const modal = document.createElement("div");
    modal.style.cssText =
      "position:fixed;inset:0;display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,.9);z-index:9999;cursor:zoom-out;animation:fadeIn .18s ease-out both";
    const img = document.createElement("img");
    img.src = src;
    img.alt = alt;
    img.style.cssText =
      "max-width:90%;max-height:90%;border:4px solid #fff;border-radius:12px;box-shadow:0 24px 64px rgba(0,0,0,.6)";
    modal.appendChild(img);

    const close = () => {
      document.body.style.overflow = "";
      modal.remove();
      window.removeEventListener("keydown", onKey);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();

    modal.onclick = close;
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    document.body.appendChild(modal);
  };

  return (
    <section className={`mt-32 sm:mt-16 lg:mt-24 mb-0 w-full pt-6 sm:pt-8 lg:pt-12 pb-0`}>
      <div className="px-2 sm:px-6 max-w-full" style={{ maxWidth: "100vw" }}>
        <h2 className="text-center text-3xl sm:text-4xl lg:text-5xl font-bold mb-8 sm:mb-10">
          Glimpses from Previous Editions
        </h2>

        <Swiper
          modules={[EffectCoverflow, Autoplay, Navigation]}
          effect="coverflow"
          grabCursor
          centeredSlides
          slidesPerView="auto"
          initialSlide={0}
          coverflowEffect={{
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true,
          }}
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
            pauseOnMouseEnter: false,
          }}
          loop
          navigation
          className="mySwiper w-full !mb-0 !pb-0"
          style={{ width: "100%", maxWidth: "100vw" }}
          key={`swiper-${cardWidth}-${cardHeight}`}
        >
          {topImages.map((src, index) => (
            <SwiperSlide
              key={index}
              style={{
                width: `${cardWidth}px`,
                height: `${cardHeight}px`,
                maxWidth: "90vw",
                maxHeight: "60vw",
              }}
              className="gallery-card cursor-pointer"
              onClick={() => handleImageClick(src, `Gallery image ${index + 1}`)}
            >
              <Image
                src={src}
                alt={`Gallery image ${index + 1}`}
                width={cardWidth}
                height={cardHeight}
                className="img object-cover w-full h-full rounded-xl"
                style={{ maxWidth: "100%", maxHeight: "100%", objectPosition: "center 20%" }}
                priority={index === 0}
                sizes="(min-width:1024px) 320px, (min-width:640px) 300px, 90vw"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Hover/Glow + arrows + motion prefs */}
      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0 }
          to   { opacity: 1 }
        }

        .gallery-card {
          position: relative;
          overflow: hidden;
          border-radius: 0.75rem;
          background: rgba(0,0,0,.6);
          border: 1px solid rgba(255,255,255,.12);
          box-shadow: 0 10px 30px -12px rgba(0,0,0,.6);
          transition: transform .35s ease, box-shadow .35s ease, border-color .35s ease, filter .35s ease;
          will-change: transform;
        }
        .gallery-card::before {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: 0.75rem;
          background: radial-gradient(65% 85% at 50% 40%,
            rgba(220, 38, 38,.22) 0%,
            rgba(253, 224, 71,.18) 40%,
            rgba(253, 224, 71,0) 70%);
          opacity: 0;
          transition: opacity .35s ease;
          pointer-events: none;
        }
        .gallery-card::after {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: 0.75rem;
          background:
            linear-gradient(180deg, rgba(255,255,255,.08), rgba(255,255,255,0)),
            linear-gradient(90deg, rgba(220, 38, 38,.0), rgba(220, 38, 38,.12), rgba(220, 38, 38,0));
          opacity: 0;
          transition: opacity .35s ease;
          pointer-events: none;
        }
        .gallery-card .img {
          transition: transform .45s ease, filter .45s ease;
        }
        .gallery-card:hover {
          transform: translateY(-4px) scale(1.02);
          border-color: rgba(220, 38, 38,.6);
          box-shadow:
            0 24px 60px -20px rgba(220, 38, 38,.45),
            0 0 0 1px rgba(253, 224, 71,.35) inset;
        }
        .gallery-card:hover::before,
        .gallery-card:hover::after { opacity: 1; }
        .gallery-card:hover .img { transform: scale(1.06); filter: saturate(1.12) contrast(1.02); }

        .swiper-button-next,
        .swiper-button-prev {
          color: white !important;
          background: rgba(0, 0, 0, 0.55);
          border-radius: 50%;
          width: 32px;  /* slightly smaller to match card scale */
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid rgba(255,255,255,.12);
          transition: background .25s ease, box-shadow .25s ease, transform .25s ease, border-color .25s ease;
        }
        .swiper-button-next:hover,
        .swiper-button-prev:hover {
          background: linear-gradient(90deg, #dc2626, #b91c1c);
          border-color: rgba(220, 38, 38,.6);
          box-shadow: 0 12px 28px -12px rgba(220, 38, 38,.6);
          transform: translateY(-2px);
        }
        .swiper-button-next:after,
        .swiper-button-prev:after {
          font-size: 18px !important;
        }
        .swiper-button-next { right: 8px !important; }
        .swiper-button-prev { left: 8px !important; }
        @media (max-width: 640px) {
          .swiper-button-next,
          .swiper-button-prev { width: 26px; height: 26px; }
          .swiper-button-next:after,
          .swiper-button-prev:after { font-size: 14px !important; }
        }

        @media (prefers-reduced-motion: reduce) {
          .gallery-card, .gallery-card .img { transition: none !important; }
          .swiper { scroll-behavior: auto !important; }
        }
      `}</style>
    </section>
  );
};

export default PictureGallery;

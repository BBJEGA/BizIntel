import { useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

import slide1 from "@assets/image_1761686193103.png";
import slide2 from "@assets/image_1761686197897.png";
import slide3 from "@assets/image_1761686202339.png";

const slides = [
  { src: slide1, alt: "Transform feedback into intelligent action" },
  { src: slide2, alt: "Turn every voice into strategic advantage" },
  { src: slide3, alt: "Collective intelligence. Smarter decisions." }
];

export function HeroCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { 
      loop: true,
      duration: 30
    },
    [
      Autoplay({ 
        delay: 4000,
        stopOnInteraction: false,
        stopOnMouseEnter: false
      })
    ]
  );

  useEffect(() => {
    if (emblaApi) {
      emblaApi.reInit();
    }
  }, [emblaApi]);

  return (
    <div className="relative overflow-hidden rounded-2xl shadow-2xl border" ref={emblaRef}>
      <div className="flex">
        {slides.map((slide, index) => (
          <div
            key={index}
            className="flex-[0_0_100%] min-w-0"
            data-testid={`carousel-slide-${index}`}
          >
            <img
              src={slide.src}
              alt={slide.alt}
              className="w-full h-auto object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

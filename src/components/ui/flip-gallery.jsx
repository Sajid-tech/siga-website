import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const images = [
  { type: "single", url: "https://southindiagarmentsassociation.com/assets/images/gallery/2024/large/DSC_2426.JPG" },
  {
    type: "double",
    urls: [
      "https://southindiagarmentsassociation.com/assets/images/gallery/2024/large/DSC_2365.JPG",
      "https://southindiagarmentsassociation.com/assets/images/gallery/2024/large/DSC_2375.JPG"
    ]
  },
  { type: "single", url: "https://southindiagarmentsassociation.com/assets/images/gallery/2024/large/DSC_3842.JPG" },
  
];

const FLIP_SPEED = 750;
const flipTiming = { duration: FLIP_SPEED, iterations: 1 };

// flip down
const flipAnimationTop = [
  { transform: "rotateX(0)" },
  { transform: "rotateX(-90deg)" },
  { transform: "rotateX(-90deg)" }
];
const flipAnimationBottom = [
  { transform: "rotateX(90deg)" },
  { transform: "rotateX(90deg)" },
  { transform: "rotateX(0)" }
];

// flip up
const flipAnimationTopReverse = [
  { transform: "rotateX(-90deg)" },
  { transform: "rotateX(-90deg)" },
  { transform: "rotateX(0)" }
];
const flipAnimationBottomReverse = [
  { transform: "rotateX(0)" },
  { transform: "rotateX(90deg)" },
  { transform: "rotateX(90deg)" }
];

export default function FlipGallery() {
  const containerRef = useRef(null);
  const uniteRef = useRef([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!containerRef.current) return;
    uniteRef.current = containerRef.current.querySelectorAll(".unite");
    defineFirstImg();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      updateIndex(1);
    }, 5000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  const defineFirstImg = () => {
    uniteRef.current.forEach((el) => setActiveImage(el, images[currentIndex]));
  };

  const setActiveImage = (el, imgData) => {
    if (imgData.type === "single") {
      el.style.backgroundImage = `url('${imgData.url}')`;
      el.style.backgroundSize = "cover";
      el.style.backgroundRepeat = "no-repeat";

      if (el.classList.contains("top") || el.classList.contains("overlay-top")) {
        el.style.backgroundPosition = "center top";
        el.style.backgroundSize = "100% 200%";
      }
      if (el.classList.contains("bottom") || el.classList.contains("overlay-bottom")) {
        el.style.backgroundPosition = "center bottom";
        el.style.backgroundSize = "100% 200%";
      }
    } else if (imgData.type === "double") {
      if (el.classList.contains("top") || el.classList.contains("overlay-top")) {
        el.style.backgroundImage = `url('${imgData.urls[0]}')`;
        el.style.backgroundSize = "cover";
        el.style.backgroundPosition = "center";
      }
      if (el.classList.contains("bottom") || el.classList.contains("overlay-bottom")) {
        el.style.backgroundImage = `url('${imgData.urls[1]}')`;
        el.style.backgroundSize = "cover";
        el.style.backgroundPosition = "center";
      }
    }
  };

  const updateGallery = (nextIndex, isReverse = false) => {
    const gallery = containerRef.current;
    if (!gallery) return;

    const imgData = images[nextIndex];
    const topAnim = isReverse ? flipAnimationTopReverse : flipAnimationTop;
    const bottomAnim = isReverse ? flipAnimationBottomReverse : flipAnimationBottom;

    gallery.querySelector(".overlay-top").animate(topAnim, flipTiming);
    gallery.querySelector(".overlay-bottom").animate(bottomAnim, flipTiming);

    uniteRef.current.forEach((el, idx) => {
      const delay =
        (isReverse && (idx !== 1 && idx !== 2)) ||
        (!isReverse && (idx === 1 || idx === 2))
          ? FLIP_SPEED - 200
          : 0;

      setTimeout(() => setActiveImage(el, imgData), delay);
    });
  };

  const updateIndex = (increment) => {
    const inc = Number(increment);
    const newIndex = (currentIndex + inc + images.length) % images.length;
    const isReverse = inc < 0;
    setCurrentIndex(newIndex);
    updateGallery(newIndex, isReverse);
  };

  return (
    <div className="flex items-center justify-center font-sans">
      <div
        className="relative bg-black/10 border border-white/25 p-2"
        style={{ "--gallery-bg-color": "rgba(255 255 255 / 0.075)" }}
      >
        {/* flip gallery */}
        <div
          id="flip-gallery"
          ref={containerRef}
          className="relative w-[240px] h-[400px] md:w-[300px] md:h-[500px] text-center"
          style={{ perspective: "700px" }}
        >
          <div className="top unite bg-cover bg-no-repeat"></div>
          <div className="bottom unite bg-cover bg-no-repeat"></div>
          <div className="overlay-top unite bg-cover bg-no-repeat"></div>
          <div className="overlay-bottom unite bg-cover bg-no-repeat"></div>
        </div>

        {/* navigation */}
        <div className="absolute top-full right-0 -mt-5 flex gap-2">
          <button
            type="button"
            onClick={() => updateIndex(-1)}
            title="Previous"
            className="text-black opacity-75 hover:opacity-100 hover:scale-125 transition"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            type="button"
            onClick={() => updateIndex(1)}
            title="Next"
            className="text-black opacity-75 hover:opacity-100 hover:scale-125 transition"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      <style>{`
        #flip-gallery > * {
          position: absolute;
          width: 100%;
          height: 50%;
          overflow: hidden;
          background-size: cover;
        }

        .top,
        .overlay-top {
          top: 0;
          transform-origin: bottom;
        }

        .bottom,
        .overlay-bottom {
          bottom: 0;
          transform-origin: top;
        }
      `}</style>
    </div>
  );
}

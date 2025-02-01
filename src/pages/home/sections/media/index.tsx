import PrimaryBtn from "@components/button";
import useContentDetails from "@hooks/useContentDetails";
import { ExtractedContent } from "../../../../types/ExtractedContent";
import { Spin } from "antd";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const images = [
  { src: "/pic1.jpg", alt: "Awareness Image 1" },
  { src: "/pic2.jpg", alt: "Awareness Image 2" },
  { src: "/pic3.jpg", alt: "Awareness Image 3" },
  { src: "/pic4.jpg", alt: "Awareness Image 4" },
  { src: "/pic5.jpg", alt: "Awareness Image 5" },
  { src: "/pic6.jpg", alt: "Awareness Image 6" },
];

const MediaAwareness = () => {
  const { contentDetails, loading } = useContentDetails();

  // Filter content based on title and <h3> text within the content
  // const targetH3Text = "Media Awareness and Justice Initiative (MAJI)";
  const specificContent = contentDetails.find(
    (item) => item.title === "Media Awareness"
    // &&
    //   item.content.includes(`<h2><strong>${targetH3Text}</strong></h2>`)
  );

  const extractContent = (content: string): ExtractedContent => {
    // Match <h2> tag content
    const h2Match = content?.match(/<h2[^>]*>(.*?)<\/h2>/);
    const h2Text = h2Match
      ? h2Match[1].replace(/<[^>]+>/g, "")
      : "Default Title";

    // Match all <p> tags and extract text within
    const pMatches = content?.match(/<p>(.*?)<\/p>/g);
    const pTexts = pMatches
      ? pMatches?.map((p) => p.replace(/<p>|<\/p>/g, ""))
      : [];

    return { h2Text, pTexts };
  };

  const content = specificContent && specificContent?.content;
  const extracted = extractContent(content || "");

  const [currentIndex, setCurrentIndex] = useState<number>(0);

  // Automatically move to the next slide every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);

    // Cleanup the interval on component unmount
    return () => clearInterval(interval);
  }, []);

  const handlePrev = (): void => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleNext = (): void => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="pt-[0px] pb-[40px] lg:pt-[40px] lg:pb-[80px]">
      <div className="flex flex-col-reverse lg:flex-row justify-between items-center gap-[40px] lg:gap-[80px]">
        <div className="w-full lg:w-[50%] flex flex-col gap-[8px]">
          {loading ? (
            <div className="flex justify-center items-center">
              <Spin size="large" />
            </div>
          ) : specificContent ? (
            <div className="w-full  flex flex-col gap-[8px]">
              <h2
                style={{ 
                  // fontFamily: "Merriweather",
                  fontWeight: 700 }}
                className="text-[20px] lg:text-[32px] lg:leading-[38px] uppercase font-arialBlack"
              >
                {extracted.h2Text}
              </h2>

              <div className="text-[16px] lg:text-[18px] font-[500] lg:leading-[28px] flex flex-col gap-[8px]">
                {extracted.pTexts.map((text, index) => (
                  <p key={index}>{text}</p> // Render extracted p texts
                ))}
              </div>
            </div>
          ) : (
            <p>Content not available for the specified heading</p>
          )}

          {!loading && (
            <div className="flex items-center gap-[10px] lg:gap-[24px] mt-[12px]">
              <Link to="https://www.majinigeria.org/" target="_blank">
                <PrimaryBtn className="bg-primaryColor  h-[38px] lg:h-[48px] flex justify-center items-center text-brandWhite">
                  Visit Site
                </PrimaryBtn>
              </Link>
            </div>
          )}
        </div>
        <div className="relative w-full lg:w-[50%] hidden lg:flex justify-center items-center">
          <div className="relative w-full lg:w-[418px]   shadow-[4px_8px_20px_5px_rgba(65,101,235,0.2)] rounded-xl overflow-hidden">
            {/* Carousel Images */}
            <div
              className="flex transition-transform duration-700 ease-in-out"
              style={{
                transform: `translateX(-${currentIndex * 100}%)`,
              }}
            >
              {images.map((image, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 flex justify-center items-center w-full lg:w-[418px]  relative"
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="lg:h-[454px] lg:w-auto object-cover rounded-lg shadow-lg"
                  />
                  {/* Overlay Effect */}
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/40 to-black/70 opacity-0  transition-opacity duration-500 rounded-lg flex justify-center items-end">
                    <span className="text-white text-lg font-semibold mb-4">
                      {image.alt}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/*Navigation Buttons */}
            <button
              onClick={handlePrev}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white text-primaryColor p-3 rounded-full shadow-md hover:bg-primaryColor hover:text-white transition-all duration-300"
            >
              &#10094;
            </button>
            <button
              onClick={handleNext}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white text-primaryColor p-3 rounded-full shadow-md hover:bg-primaryColor hover:text-white transition-all duration-300"
            >
              &#10095;
            </button>

            {/* Pagination Dots */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-3">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? "bg-white scale-125"
                      : "bg-gray-400 hover:bg-gray-300"
                  }`}
                ></button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MediaAwareness;

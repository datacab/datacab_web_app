import useContentDetails from "@hooks/useContentDetails";
import { Spin } from "antd";
import {
  FaChartBar,
  FaTemperatureHigh,
  FaGlobe,
  FaChartPie,
  FaMapMarkedAlt,
} from "react-icons/fa";
import { ExtractedContent } from "../../../../types/ExtractedContent";

const services = [
  {
    icon: <FaChartBar size={24} />,
    text: "Real time Air Quality Reporting",
  },
  {
    icon: <FaTemperatureHigh size={24} />,
    text: "Presentation of P.M 1.0, 2.5, 10 levels, humidity and temperature data.",
  },
  {
    icon: <FaGlobe size={24} />,
    text: "Analysis and Infographic presentation of collected environmental data.",
  },
  {
    icon: <FaChartPie size={24} />,
    text: "Collected Data Analysis",
  },
  {
    icon: <FaMapMarkedAlt size={24} />,
    text: "Air Quality Index (AQI) MAP.",
  },
];

const WhatWeDo = () => {
  const { contentDetails, loading } = useContentDetails();

  // Filter content based on title and <h3> text within the content
  const targetH3Text = "What We Do";
  const specificContent = contentDetails.find(
    (item) =>
      item.title === "About Us" &&
      item.content.includes(`<h2><strong>${targetH3Text}</strong></h2>`)
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
  return (
    <div className="pt-[20px] pb-[40px] lg:py-[40px]">
      <div className="flex flex-col lg:flex-row justify-between items-center gap-[40px] lg:gap-[80px]">
        <div className="w-full lg:w-[50%] flex flex-col gap-[8px]">
          {loading ? (
            <div className="flex justify-center items-center">
              <Spin size="large" />
            </div>
          ) : specificContent ? (
            <div className="w-full  flex flex-col gap-[8px]">
              <h2
                style={{ fontFamily: "Merriweather", fontWeight: 700 }}
                className="text-[20px] lg:text-[32px] lg:w-[400px] lg:leading-[38px]"
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
        </div>

        <div className="w-full lg:w-[50%]">
          <div className="flex flex-col gap-[15px]">
            {services.map((service, index) => (
              <div key={index} className="flex gap-[24px] items-center">
                <div className="w-[44px] h-[44px] bg-primaryColor rounded-full flex justify-center items-center text-white shrink-0">
                  {service.icon}
                </div>
                <h3 className="text-[16px] lg:text-[18px] font-[500] lg:leading-[28px]">
                  {service.text}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhatWeDo;

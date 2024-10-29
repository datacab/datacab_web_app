import PrimaryBtn from "@components/button";
import useContentDetails from "@hooks/useContentDetails";
import { ExtractedContent } from "../../../../types/ExtractedContent";
import { Spin } from "antd";
import { Link } from "react-router-dom";


const MediaAwareness = () => {
  const { contentDetails, loading } = useContentDetails();

  // Filter content based on title and <h3> text within the content
  const targetH3Text = "Media Awareness and Justice Initiative (MAJI)";
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

          {!loading && (
            <div className="flex items-center gap-[10px] lg:gap-[24px] mt-[12px]">
              <Link to="#">
                <PrimaryBtn className="bg-primaryColor  h-[38px] lg:h-[48px] flex justify-center items-center text-brandWhite">
                  Visit Site
                </PrimaryBtn>
              </Link>
              <Link to="#">
                <PrimaryBtn className="text-brandWhite bg-brandDark  h-[38px] lg:h-[48px] flex justify-center items-center">
                  See MAJI Campaigns
                </PrimaryBtn>
              </Link>
            </div>
          )}
        </div>

        <div className="w-full lg:w-[50%] hidden lg:flex">
          <div className="flex relative justify-center  items-center w-full lg:w-[418px] lg:h-[563px]  bg-primaryColor shadow-[4px_8px_20px_5px_rgba(65,101,235,0.5)] rounded-xl">
            <img
              src="/awareimg.png"
              alt="awareness image"
              className="lg:h-[454px] lg:w-[600px] lg:absolute lg:left-24 lg:max-w-[500px] pt-[14px]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MediaAwareness;

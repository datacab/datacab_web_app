import PrimaryBtn from "@components/button";
import Container from "@components/container";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div
      className="relative h-[500px]"
      style={{ backgroundImage: "url(datacabherobg.png)" }}
    >
      {/* Overlay for the background color */}
      <div className="absolute inset-0 bg-brandLightBlue bg-opacity-90"></div>

      <Container>
        <div className="relative flex flex-col gap-[16px] lg:gap-[24px] justify-center items-center h-full">
          <h1
            style={{
              fontFamily: "Merriweather",
              fontWeight: 700,
            }}
            className="text-[24px] md:text-[32px] lg:text-[48px] text-center font-[700] lg:leading-[57px] lg:w-[997px]"
          >
            Empowering Environmental Advocacy Through Data Simplification for
            Sustainable Action
          </h1>
          <h3 className="text-[16px] lg:text-[18px] font-[500]   lg:w-[936px] lg:leading-[28px]  text-center">
            We simplify environmental incident data into clear infographics,
            fostering grassroots participation in environmental protection. Our
            tools support data analysis and geospatial mapping, driving informed
            advocacy and targeted interventions across Nigeria, backed by
            reliable sources and real-time air quality monitoring.
          </h3>

          <div className="flex ">
            <Link to="/air-reading">
              <PrimaryBtn className="bg-primaryColor  h-[38px] lg:h-[48px] flex justify-center items-center text-brandWhite">
                Check Air Quality
              </PrimaryBtn>
            </Link>
            {/* <Link to="#">
              <PrimaryBtn className="text-brandWhite bg-brandDark  h-[38px] lg:h-[48px] flex justify-center items-center">
                Check Air Spillage
              </PrimaryBtn>
            </Link> */}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Hero;

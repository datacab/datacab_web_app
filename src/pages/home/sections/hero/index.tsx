import PrimaryBtn from "@components/button";
import Container from "@components/container";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div
      className="relative xl:h-[86vh] mt-[14vh] py-[20px] lg:py-0"
      style={{ backgroundImage: "url(datacabherobg.png)" }}
    >
      {/* Overlay for the background color */}
      <div className="absolute inset-0 bg-brandLightBlue bg-opacity-90"></div>

      <Container>
        <div className="relative flex flex-col gap-[16px] lg:gap-[24px] justify-center items-center h-full">
          <h1
            style={{
              // fontFamily: "Merriweather",
              fontWeight: 700,
            }}
            className="text-[24px] md:text-[32px] lg:text-[48px] text-center font-[700] lg:leading-[57px] lg:w-[997px] font-arialBlack"
          >
            STRENGTHENING ENVIRONMENTAL ADVOCACY THROUGH DATA SIMPLIFICATION FOR
            EVIDENCE BASED ACTION
          </h1>
          <h3 className="text-[16px] lg:text-[18px] font-[500]   lg:w-[936px] lg:leading-[28px]  text-center">
            The Media Awareness and Justice Initiative through the{" "}
            <b className="font-arialBlack">DATACAB</b> portal collects, analyzes
            and simplifies real time environmental data, presenting them in
            clear infographic forms and formats. Our overall aim is to foster
            citizen and stakeholder participation in environmental monitoring,
            reporting and engagements using evidence-based data to drive
            informed advocacy, help key stakeholders identify targeted
            interventions and informative policy development across Nigeria
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

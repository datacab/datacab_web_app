import PrimaryBtn from "@components/button";
import { Link } from "react-router-dom";

const MediaAwareness = () => {
  return (
    <div className="pt-[0px] pb-[40px] lg:pt-[40px] lg:pb-[80px]">
      <div className="flex flex-col-reverse lg:flex-row justify-between items-center gap-[40px] lg:gap-[80px]">
        <div className="w-full lg:w-[50%] flex flex-col gap-[8px]">
          <h2
            style={{
              fontFamily: "Merriweather",
              fontWeight: 700,
            }}
            className="text-[20px] lg:text-[32px] lg:w-[400px] lg:leading-[38px]"
          >
            Media Awareness and Justice Initiative (MAJI)
          </h2>
          <h3 className="text-[16px] lg:text-[18px] font-[500] lg:leading-[28px]">
            The Media Awareness and Justice Initiative (MAJI) is an innovative,
            youth led non-governmental organization that builds the capacity of
            young people and women from marginalised communities to use
            innovative ICT tools, alternative media platforms and collaborative
            strategies to protect their environment, support gender equality,
            while promoting human rights.
            <br />
            <br />
            Our mission is to work with groups and social movements working
            together for social, economic, cultural and environmental justice by
            helping them use media and communication technologies to inform,
            organise, mobilise and further their struggles to create a better
            world.
            <br />
            <br />
            We use participatory strategies to create awareness, sensitise
            people and increase community voice. In collaboration with our
            target groups, we create platforms for sustained participatory
            interaction among relevant stakeholders.
          </h3>

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

import PrimaryBtn from "@components/button";
import { AiOutlineApple } from "react-icons/ai";
import { IoLogoGooglePlaystore } from "react-icons/io5";
import { Link } from "react-router-dom";

const MobileAppExperience = () => {
  return (
    <div className="pt-[0px] pb-[0px] lg:pb-0 lg:pt-[34px] bg-primaryColor rounded-[10px] ">
      <div className="lg:w-[85%] mx-auto flex flex-col lg:flex-row items-center gap-20  ">
        <div className="lg:w-[60%] mx-auto flex flex-col gap-[10px] py-[20px] lg:py-0">
          <h2
            style={{
              // fontFamily: "Merriweather",
              fontWeight: 700,
            }}
            className="text-[20px] lg:text-[32px]  lg:leading-[38px] w-[90%]  lg:mx-0 mx-auto lg:w-[613px] text-brandWhite font-arialBlack"
          >
            Experience seamless access to reliable data solutions at your
            fingertips.
          </h2>
          <h3 className="text-[16px] lg:text-[18px] w-[90%] lg:w-auto mx-auto font-[500] lg:leading-[28px] text-brandWhite">
            Don’t miss out on real-time updates and streamlined communication –
            download the app today and stay ahead in the digital world!
          </h3>
          <div className="flex flex-col lg:flex-row items-start w-[90%] lg:w-full mx-auto lg:mx-0 gap-[10px] lg:gap-[24px] ">
            <Link to="#">
              <PrimaryBtn
                rightIcon={<AiOutlineApple size={24} />}
                className="bg-brandDark  h-[38px] lg:h-[48px] flex justify-center items-center text-brandWhite"
              >
                Get It on AppStore
              </PrimaryBtn>
            </Link>
            <Link to="#">
              <PrimaryBtn
                rightIcon={<IoLogoGooglePlaystore size={24} />}
                className="text-brandWhite bg-brandDark  h-[38px] lg:h-[48px] flex justify-center items-center"
              >
                Download On Playstore
              </PrimaryBtn>
            </Link>
          </div>
        </div>
        <div className="lg:w-[40%] hidden lg:flex">
          <img src="/dataApp.png" alt="" />
        </div>
      </div>
    </div>
  );
};

export default MobileAppExperience;

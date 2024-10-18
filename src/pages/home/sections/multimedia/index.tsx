import { IoIosArrowRoundForward } from "react-icons/io";

const Multimedia = () => {
  return (
    <div className="pt-[0px] pb-[40px] lg:pb-[80px]">
      <div className="flex items-center justify-between">
        <h2
          style={{
            fontFamily: "Merriweather",
            fontWeight: 700,
          }}
          className="text-[20px] lg:text-[32px]  lg:leading-[38px] "
        >
          Multimedia
        </h2>
        <p className="flex items-center gap-2 text-[12px] lg:text-[16px] font-[600] cursor-pointer">
          See all
          <IoIosArrowRoundForward />
        </p>
      </div>
      <div>
        <div className="flex gap-[10px] lg:gap-[20px]">
          <div className="mt-[15px] lg:mt-[30px] lg:w-[50%]">
            <img src="/datamultimg.png" alt="" />
          </div>
          <div className="flex lg:w-[50%] gap-[10px] lg:gap-[20px]">
            <div className="mt-[15px] lg:mt-[30px]">
              <img src="/img2.png" alt="" />
            </div>
            <div className="mt-[15px] lg:mt-[30px]">
              <img src="/img2.png" alt="" />
            </div>
          </div>
        </div>
        <div className="flex gap-[10px] lg:gap-[20px]">
          <div className="flex lg:w-[50%] gap-[10px] lg:gap-[20px]">
            <div className="mt-[15px] lg:mt-[30px]">
              <img src="/img2.png" alt="" />
            </div>
            <div className="mt-[15px] lg:mt-[30px]">
              <img src="/img2.png" alt="" />
            </div>
          </div>
          <div className="mt-[15px] lg:mt-[30px] lg:w-[50%]">
            <img src="/datamultimg.png" alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Multimedia;

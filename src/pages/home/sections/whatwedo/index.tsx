import {
  FaChartBar,
  FaTemperatureHigh,
  FaGlobe,
  FaChartPie,
  FaMapMarkedAlt,
} from "react-icons/fa";

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
  return (
    <div className="pt-[20px] pb-[40px] lg:py-[40px]">
      <div className="flex flex-col lg:flex-row justify-between items-center gap-[40px] lg:gap-[80px]">
        <div className="w-full lg:w-[50%] flex flex-col gap-[8px]">
          <h2
            style={{
              fontFamily: "Merriweather",
              fontWeight: 700,
            }}
            className="text-[20px] lg:text-[32px] lg:w-[379px] lg:leading-[38px]"
          >
            What We Do
          </h2>
          <h3 className="text-[16px] lg:text-[18px] font-[500] lg:leading-[28px]">
            We transform complex environmental data into actionable insights,
            providing tools for analysis, visualisation, and geospatial mapping.
            Our goal is to empower communities with the information they need to
            advocate for sustainable environmental solutions and climate change
            adaptation.
          </h3>
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

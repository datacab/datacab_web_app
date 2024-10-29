import Container from "@components/container";
import MainLayout from "@layouts/MainLayout";
import { useLocation } from "react-router-dom";
import MapHighlights from "./map";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { Divider } from "antd";
import { useState } from "react";

const AirReadingDetails = () => {
  const location = useLocation();
  const { item } = location.state || {};

  const colorRange = [
    {
      color: "/lemon.svg",
      text: "Good",
    },
    {
      color: "/yello.svg",
      text: "Moderate",
    },
    {
      color: "/brown.svg",
      text: "Unhealthy for sensitive groups",
    },
    {
      color: "/red.svg",
      text: "Unhealthy",
    },
    {
      color: "/purple.svg",
      text: "Very unhealthy",
    },
    {
      color: "/blood.svg",
      text: "Harzadous",
    },
  ];

  const pm = [
    {
      text: "PM 1",
      value: "11",
      info: "",
    },
    {
      text: "PM 2.5",
      value: "18",
      info: "",
    },
    {
      text: "PM 10",
      value: "18",
      info: "",
    },
  ];
  const atmos = [
    {
      text: "Humidity",
      value: "83",
      info: "",
    },
    {
      text: "Heat Index",
      value: "28",
      info: "",
    },
    {
      text: "Voltage",
      value: "3.7",
      info: "",
    },
  ];

  const tab_text = [
    { text: <div>Air&nbsp;Quality&nbsp;Reading</div>, text2: "aq" },
    { text: <div>PM&nbsp;1</div>, text2: "pm1" },
    { text: <div>PM&nbsp;2.5</div>, text2: "pm2.5" },
    { text: <div>PM&nbsp;10</div>, text2: "pm10" },
  ];

  const aqr_days = [
    {
      value: "63",
      day: "Tuesday",
      date: "1",
      month: "November",
    },
    {
      value: "-",
      day: "Tuesday",
      date: "2",
      month: "November",
    },
    {
      value: "78",
      day: "Tuesday",
      date: "3",
      month: "November",
    },
    {
      value: "79",
      day: "Tuesday",
      date: "4",
      month: "November",
    },
    {
      value: "94",
      day: "Tuesday",
      date: "5",
      month: "November",
    },
    {
      value: "88",
      day: "Tuesday",
      date: "6",
      month: "November",
    },
    {
      value: "61",
      day: "Tuesday",
      date: "7",
      month: "November",
    },
  ];

  const pm1 = [
    {
      value: "11",
    },
    {
      value: "18",
    },
    {
      value: "12",
    },
    {
      value: "14",
    },
    {
      value: "18",
    },
    {
      value: "18",
    },
  ];
  const pm25 = [
    {
      value: "11",
    },
    {
      value: "18",
    },
    {
      value: "18",
    },
    {
      value: "9",
    },
    {
      value: "18",
    },
    {
      value: "18",
    },
  ];
  const pm10 = [
    {
      value: "10",
    },
    {
      value: "18",
    },
    {
      value: "16",
    },
    {
      value: "18",
    },
    {
      value: "18",
    },
    {
      value: "19",
    },
  ];

  const getAQRGrade = (aqrValue: string) => {
    let text = "";

    switch (true) {
      case Number(aqrValue) <= 50:
        text = "Good";
        break;
      case Number(aqrValue) > 50 && Number(aqrValue) <= 100:
        text = "Moderate";
        break;
      case Number(aqrValue) > 100 && Number(aqrValue) <= 150:
        text = "Unhealthy for sensitive groups";
        break;
      case Number(aqrValue) > 150 && Number(aqrValue) <= 200:
        text = "Unhealthy";
        break;
      case Number(aqrValue) > 200 && Number(aqrValue) <= 300:
        text = "Very unhealthy";
        break;
      case Number(aqrValue) > 300:
        text = "Harzadous";
        break;
      default:
        text = "No data";
    }

    return text;
  };

  const [tab_value, set_tab_value] = useState<string>("aq");

  return (
    <MainLayout>
      <Container>
        <div className="text-[24px] md:text-[32px] font-[700] text-[#2C2C2C] mt-[60px]">
          Air Quality in {item.community}
        </div>
        <div className="text-[24px] md:text-[32px] font-[700] text-[#2C2C2C]">
          {item.lga}&nbsp;LGA,&nbsp; {item.state}
        </div>

        <div className="rounded-[20px] shadow-md w-full p-[20px] lg:p-[40px] mt-[50px]">
          <div className="text-[16px] font-[700] text-[#2C2C2C]">
            Current reading
          </div>
          <div className="text-[18px] font-[500] text-[#757575]">
            Last Updated:{item.date}
          </div>

          <div className="w-full xl:flex mt-[17px] gap-x-[20px]">
            <div className="mb-[20px] xl:mb-[unset] md:flex w-full xl:w-[50%] bg-[#FDFDFD] border-[0.5px] border-[#E6E6E6] rounded-[10px] px-[24px] py-[28px] text-[14px] ">
              <div className="w-full md:w-[70%] h-[150px]"></div>
              <div className="grid grid-cols-2 gap-[10px] w-full md:w-[30%] md:block">
                {colorRange.map((item, index) => (
                  <div
                    key={index.toString()}
                    className="md:flex gap-x-[16px] items-center mb-[12.5px] "
                  >
                    <div className="w-[20%]">
                      <img
                        src={item.color}
                        alt="lemon color"
                        width={20}
                        height={20}
                      />
                    </div>
                    <div className="w-full  lg:w-[80%] font-[400] lg:text-[18px] text-[#2C2C2C]">
                      {item.text}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="xl:w-[50%]">
              <div className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-[20px]">
                {pm.map((item, index) => (
                  <div
                    key={index.toString()}
                    className=" bg-[#FDFDFD] border-[0.5px] border-[#E6E6E6] rounded-[10px] text-[14px] flex items-center justify-center h-[147.5px]"
                  >
                    <div>
                      <div className="text-center text-[24px] md:text-[32px] font-[700] text-[#2C2C2C]">
                        {item.value}
                      </div>
                      <div className="flex justify-center items-center gap-x-[5px] text-[16px] font-[600] text-[#757575]">
                        {item.text}
                        <div className="cursor-pointer">
                          <AiOutlineInfoCircle color="#1D48E7" />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="w-full rid-cols-1 grid md:grid-cols-4 mt-[20px] gap-[20px]">
                <div className=" bg-[#FDFDFD] border-[0.5px] border-[#E6E6E6] rounded-[10px] text-[14px] flex items-center justify-center h-[147.5px]">
                  <div>
                    <div className="text-center text-[24px] md:text-[32px] font-[700] text-[#2C2C2C]">
                      26&deg;C
                    </div>
                    <div className="flex justify-center items-center gap-x-[5px] text-[16px] font-[600] text-[#757575]">
                      Temperature
                      <div className="cursor-pointer">
                        <AiOutlineInfoCircle color="#1D48E7" />
                      </div>
                    </div>
                  </div>
                </div>
                {atmos.map((item, index) => (
                  <div
                    key={index.toString()}
                    className=" bg-[#FDFDFD] border-[0.5px] border-[#E6E6E6] rounded-[10px] text-[14px] flex items-center justify-center h-[147.5px]"
                  >
                    <div>
                      <div className="text-center text-[24px] md:text-[32px] font-[700] text-[#2C2C2C]">
                        {item.value}
                      </div>
                      <div className="flex justify-center items-center gap-x-[5px] text-[16px] font-[600] text-[#757575]">
                        {item.text}
                        <div className="cursor-pointer">
                          <AiOutlineInfoCircle color="#1D48E7" />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="my-[40px]">
            <div className="font-[700] text-[24px] mb-[-20px]">Map</div>
            <MapHighlights />
          </div>
        </div>

        <div className="rounded-[20px] shadow-md w-full p-[20px] lg:p-[40px] mt-[50px]">
          <div className="xl:flex justify-between items-center gap-x-[20px]">
            <div className="text-[18px] text-[700] md:text-[24px] font-[700] mb-[20px] xl:mb-[unset]">
              Air Quality Index Average (Last 7 Days)
            </div>
            <div className="w-full flex gap-[16px] items-center overflow-x-auto">
              {tab_text.map((item, index) => (
                <div
                  onClick={() => set_tab_value(item.text2)}
                  key={index.toString()}
                  className={`cursor-pointer text-[16px] p-[10px] border-[1px] border-[#9B9B9B] rounded-[4px] md:p-[15px] xl:p-[20px] font-[500] md:text-[20px] ${
                    tab_value === item.text2
                      ? "bg-[#1D48E7] text-white border-[unset]"
                      : ""
                  }`}
                >
                  {item.text}
                </div>
              ))}
            </div>
          </div>
          {tab_value === "aq" && (
            <div className="grid md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 mt-[20px] gap-[20px]">
              {aqr_days.map((item, index) => (
                <div className="flex flex-col items-center">
                  <div
                    key={index.toString()}
                    className={`w-full bg-[#FDFDFD] border-[0.5px] border-[#E6E6E6] rounded-[10px] text-[14px] flex items-center justify-center h-[147.5px] ${
                      getAQRGrade(item.value) !== "No data"
                        ? "bg-[#62F42E]"
                        : "bg-[#C2C2C2]"
                    }`}
                  >
                    <div>
                      <div className="text-center text-[24px] md:text-[32px] font-[700] text-[#2C2C2C]">
                        {item.value}
                      </div>
                      <div className="my-[-20px]">
                        <Divider />
                      </div>
                      <div className="flex justify-center items-center gap-x-[5px] text-[16px] font-[600] text-[#2C2C2C]">
                        {getAQRGrade(item.value)}
                      </div>
                    </div>
                  </div>

                  <div className="w-full text-center mb-[10px] mt-[16px] text-[16px] md:text-[18px] text-[#757575]">{item.day}</div>
                  <div className="w-full text-center text-[16px] md:text-[18px] text-[#757575]">{item.date}&nbsp;{item.month}</div>
                </div>
              ))}
            </div>
          )}
          {tab_value === "pm1" && (
            <div className="grid md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 mt-[20px] gap-[20px]">
              {pm1.map((item, index) => (
                <div
                  key={index.toString()}
                  className={` bg-[#FDFDFD] border-[0.5px] border-[#E6E6E6] rounded-[10px] text-[14px] flex items-center justify-center h-[147.5px] ${
                    getAQRGrade(item.value) !== "No data"
                      ? "bg-[#62F42E]"
                      : "bg-[#C2C2C2]"
                  }`}
                >
                  <div>
                    <div className="text-center text-[24px] md:text-[32px] font-[700] text-[#2C2C2C]">
                      {item.value}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          {tab_value === "pm2.5" && (
            <div className="grid md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 mt-[20px] gap-[20px]">
              {pm25.map((item, index) => (
                <div
                  key={index.toString()}
                  className={` bg-[#FDFDFD] border-[0.5px] border-[#E6E6E6] rounded-[10px] text-[14px] flex items-center justify-center h-[147.5px] ${
                    getAQRGrade(item.value) !== "No data"
                      ? "bg-[#62F42E]"
                      : "bg-[#C2C2C2]"
                  }`}
                >
                  <div>
                    <div className="text-center text-[24px] md:text-[32px] font-[700] text-[#2C2C2C]">
                      {item.value}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          {tab_value === "pm10" && (
            <div className="grid md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 mt-[20px] gap-[20px]">
              {pm10.map((item, index) => (
                <div
                  key={index.toString()}
                  className={` bg-[#FDFDFD] border-[0.5px] border-[#E6E6E6] rounded-[10px] text-[14px] flex items-center justify-center h-[147.5px] ${
                    getAQRGrade(item.value) !== "No data"
                      ? "bg-[#62F42E]"
                      : "bg-[#C2C2C2]"
                  }`}
                >
                  <div>
                    <div className="text-center text-[24px] md:text-[32px] font-[700] text-[#2C2C2C]">
                      {item.value}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </Container>
    </MainLayout>
  );
};

export default AirReadingDetails;

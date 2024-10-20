import Container from "@components/container";
import MainLayout from "@layouts/MainLayout";
import { useLocation } from "react-router-dom";
import MapHighlights from "./map";
import { AiOutlineInfoCircle } from "react-icons/ai";

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


const pm=[
  {
    text:"PM 1",
    value:"11",
    info:""
  },
  {
    text:"PM 2.5",
    value:"18",
    info:""
  },
  {
    text:"PM 10",
    value:"18",
    info:""
  },
]
const atmos=[

  {
    text:"Humidity",
    value:"83",
    info:""
  },
  {
    text:"Heat Index",
    value:"28",
    info:""
  },
  {
    text:"Voltage",
    value:"3.7",
    info:""
  },
]



  return (
    <MainLayout>
      <Container>
        <div className="text-[32px] font-[700] text-[#2C2C2C] mt-[60px]">
          Air Quality in {item.community}
        </div>
        <div className="text-[32px] font-[700] text-[#2C2C2C]">
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
            {
              pm.map((item,index)=>(
                <div 
                key={index.toString()}
                className=" bg-[#FDFDFD] border-[0.5px] border-[#E6E6E6] rounded-[10px] text-[14px] flex items-center justify-center h-[147.5px]">
                <div>
                  <div className="text-center text-[32px] font-[700] text-[#2C2C2C]">
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
              ))
            }
         
              </div>
              <div className="w-full rid-cols-1 grid md:grid-cols-4 mt-[20px] gap-[20px]">
                <div className=" bg-[#FDFDFD] border-[0.5px] border-[#E6E6E6] rounded-[10px] text-[14px] flex items-center justify-center h-[147.5px]">
                  <div>
                    <div className="text-center text-[32px] font-[700] text-[#2C2C2C]">
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
  {
    atmos.map((item,index)=>(
      <div 
      key={index.toString()}
      className=" bg-[#FDFDFD] border-[0.5px] border-[#E6E6E6] rounded-[10px] text-[14px] flex items-center justify-center h-[147.5px]">
      <div>
        <div className="text-center text-[32px] font-[700] text-[#2C2C2C]">
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
    ))
  }
          
              </div>
            </div> 
          </div>

          <div className="my-[40px]">
            <div className="font-[700] text-[24px] mb-[-20px]">Map</div>
            <MapHighlights />
          </div>
        </div>
      </Container>
    </MainLayout>
  );
};

export default AirReadingDetails;

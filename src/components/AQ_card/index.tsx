import { AMD_type_v2 } from "../../types/airMonitoring";
import { Typography } from "antd";

// interface AQIData {
//     id: string;
//     country: string;
//     state: string;
//     lga: string;
//     city: string;
//     AQI:string;
//     pm_1:string;
//     pm_2:string;
//     pm10:string;
//     temp:string;
//     humidity:string;
//     heat:string;
//     voltage:string;
//     date:string;

//   }

interface props {
  item: AMD_type_v2;
  clickFN: (item: AMD_type_v2) => void;
}
const AQ_Card = ({ item, clickFN }: props) => {
  const { Title, Paragraph } = Typography;
  return (
    <div
      key={item.id}
      className="w-full   flex items-center gap-x-[16px] cursor-pointer shadow-md rounded-[20px] px-[10px] py-[13px] lg:px-[24px] lg:py-[48px]"
      onClick={() => clickFN(item)}
    >
   
  <div className="w-[20%]">
  <img
          src="/pin_location.svg"
          alt="uploaded image"
          className="w-[70px] h-[70px] rounded-[14px] object-cover"
        />
  </div>
    
<div className="w-[80%]">
<Paragraph
        style={{
          color: "#757575",
         
        }}
        ellipsis={{ rows: 1, expandable: false }}
      >
        {item.serial_number}
      </Paragraph>
      <Title
        style={{
          color: "#2C2C2C",
          marginTop:-10,
      
        }}
        ellipsis={{ rows: 1, expandable: false }}
        level={4}
      >
        {item.location}
      </Title>
   
</div>

  
    </div>
  );
};

export default AQ_Card;

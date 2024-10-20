import { Typography } from "antd";

interface AQIData {
    id: string;
    country: string;
    state: string;
    lga: string;
    community: string;
    AQI:string;
    pm_1:string;
    pm_2:string;
    pm10:string;
    temp:string;
    humidity:string;
    heat:string;
    voltage:string;
    date:string;

  }

interface props {
  item: AQIData;
  clickFN: (item: AQIData) => void;
}
const AQ_Card = ({ item, clickFN }: props) => {
  const { Title, Paragraph } = Typography;
  return (
    <div
      key={item.id}
      className="w-full   flex items-center gap-x-[16px] cursor-pointer shadow-md rounded-[20px] px-[10px] py-[13px] lg:px-[24px] lg:py-[48px]"
      onClick={() => clickFN(item)}
    >
   
  <div className="w-[30%]">
  <img
          src="/pin_location.svg"
          alt="uploaded image"
          className="w-[80px] h-[80px] rounded-[14px] object-cover"
        />
  </div>
    
<div className="w-[70%]">
<Paragraph
        style={{
          color: "#757575",
         
        }}
        ellipsis={{ rows: 1, expandable: false }}
      >
        {item.state}&nbsp;State,&nbsp;{item.country}
      </Paragraph>
      <Title
        style={{
          color: "#2C2C2C",
          marginTop:-10,
      
        }}
        ellipsis={{ rows: 1, expandable: false }}
        level={4}
      >
        {item.community}&nbsp;Community
      </Title>
      <Title
        style={{
          color: "#2C2C2C",
          marginTop:-14,
      
        }}
        ellipsis={{ rows: 1, expandable: false }}
        level={4}
      >
        {item.lga}
      </Title>
</div>

  
    </div>
  );
};

export default AQ_Card;

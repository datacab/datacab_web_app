import Container from "@components/container";
import MainLayout from "@layouts/MainLayout";
import { useLocation } from "react-router-dom";
import MapHighlights from "./map";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { Divider } from "antd";
import { useState } from "react";
import { GaugeComponent } from "react-gauge-component";
import Select from "@components/select/Select";
import { MdClose } from "react-icons/md";
import {
  ComposedChart,
  Bar,
  Line,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Rectangle,
} from "recharts";

const CustomBar = (props: any) => {
  const { x, y, width, height, fill } = props;
  return <Rectangle x={x} y={y} width={width} height={height} fill={fill} />;
};

const AirReadingDetails = () => {
  // Sample data with 42 data points for the line graph
  const data = [
    { name: "Point 1", lineValue: 50, barValue: 100, barWidth: 20 },
    { name: "Point 2", lineValue: 80 },
    { name: "Point 3", lineValue: 60, barValue: 100, barWidth: 60 },
    { name: "Point 4", lineValue: 90 },
    { name: "Point 5", lineValue: 70, barValue: 100, barWidth: 25 },
    { name: "Point 6", lineValue: 100 },
    { name: "Point 7", lineValue: 85 },
    { name: "Point 8", lineValue: 60, barValue: 100, barWidth: 35 },
    { name: "Point 9", lineValue: 40 },
    { name: "Point 10", lineValue: 70, barValue: 100, barWidth: 100 },
    { name: "Point 11", lineValue: 55 },
    { name: "Point 12", lineValue: 95 },
  ];



  const data2 = [
    { name: 'Point 1', lineValue1: 10, lineValue2: 30, lineValue3: 50 },
    { name: 'Point 2', lineValue1: 20, lineValue2: 20, lineValue3: 40 },
    { name: 'Point 3', lineValue1: 10, lineValue2: 25, lineValue3: 30 },
    { name: 'Point 4', lineValue1: 30, lineValue2: 15, lineValue3: 50 },
    { name: 'Point 5', lineValue1: 15, lineValue2: 35, lineValue3: 20 },
    { name: 'Point 6', lineValue1: 25, lineValue2: 10, lineValue3: 40 },
    { name: 'Point 7', lineValue1: 10, lineValue2: 20, lineValue3: 30 },
    { name: 'Point 8', lineValue1: 35, lineValue2: 5, lineValue3: 55 },
    { name: 'Point 9', lineValue1: 20, lineValue2: 30, lineValue3: 10 },
    { name: 'Point 10', lineValue1: 5, lineValue2: 25, lineValue3: 35 },
    { name: 'Point 11', lineValue1: 30, lineValue2: 15, lineValue3: 45 },
    { name: 'Point 12', lineValue1: 15, lineValue2: 40, lineValue3: 20 },
  ];



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
      day: "Monday",
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
      day: "Wednesday",
      date: "3",
      month: "November",
    },
    {
      value: "79",
      day: "Thursday",
      date: "4",
      month: "November",
    },
    {
      value: "94",
      day: "Friday",
      date: "5",
      month: "November",
    },
    {
      value: "88",
      day: "Saturday",
      date: "6",
      month: "November",
    },
    {
      value: "61",
      day: "Sunday",
      date: "7",
      month: "November",
    },
  ];

  const pm1 = [
    {
      value: "11",
      day: "Monday",
      date: "1",
      month: "November",
    },
    {
      value: "18",
      day: "Tuesday",
      date: "2",
      month: "November",
    },
    {
      value: "12",
      day: "Wednesday",
      date: "3",
      month: "November",
    },
    {
      value: "14",
      day: "Thursday",
      date: "4",
      month: "November",
    },
    {
      value: "18",
      day: "Friday",
      date: "5",
      month: "November",
    },
    {
      value: "18",
      day: "Saturday",
      date: "6",
      month: "November",
    },
    {
      value: "9",
      day: "Sunday",
      date: "7",
      month: "November",
    },
  ];
  const pm25 = [
    {
      value: "11",
      day: "Monday",
      date: "1",
      month: "November",
    },
    {
      value: "18",
      day: "Tuesday",
      date: "2",
      month: "November",
    },
    {
      value: "18",
      day: "Wednesday",
      date: "3",
      month: "November",
    },
    {
      value: "9",
      day: "Thursday",
      date: "4",
      month: "November",
    },
    {
      value: "18",
      day: "Friday",
      date: "5",
      month: "November",
    },
    {
      value: "18",
      day: "Saturday",
      date: "6",
      month: "November",
    },
    {
      value: "9",
      day: "Sunday",
      date: "7",
      month: "November",
    },
  ];
  const pm10 = [
    {
      value: "10",
      day: "Monday",
      date: "1",
      month: "November",
    },
    {
      value: "18",
      day: "Tuesday",
      date: "2",
      month: "November",
    },
    {
      value: "16",
      day: "Wednesday",
      date: "3",
      month: "November",
    },
    {
      value: "18",
      day: "Thursday",
      date: "4",
      month: "November",
    },
    {
      value: "18",
      day: "Friday",
      date: "5",
      month: "November",
    },
    {
      value: "19",
      day: "Saturday",
      date: "6",
      month: "November",
    },
    {
      value: "29",
      day: "Sunday",
      date: "7",
      month: "November",
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

  const time_line = [
    {
      value: "Last 7 days",
      label: "Last 7 days",
    },
    {
      value: "Last 14 days",
      label: "Last 14 days",
    },
    {
      value: "Last 1 month",
      label: "Last 1 month",
    },
    {
      value: "2 months ago",
      label: "2 months ago",
    },
  ];

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
              <div className="w-full md:w-[70%] h-fit">
                <div className="text-[24px] font-[700] text-[#2C2C2C] ">
                  Air Quality Index
                </div>
                <GaugeComponent
                  style={{
                    width: "100%",
                    height: "auto",
                  }}
                  value={12.6}
                  type="semicircle"
                  labels={{
                    tickLabels: {
                      type: "outer", // Try "inner" or "outer" based on your preference
                      ticks: [
                        { value: 10 },
                        { value: 20 },
                        { value: 30 },
                        { value: 40 },
                        { value: 50 },
                        { value: 60 },
                        { value: 70 },
                        { value: 80 },
                        { value: 90 },
                        { value: 100 },
                      ],
                      defaultTickValueConfig: {
                        formatTextValue: (value: string) => {
                          const string_value = Number(value);
                          const num = string_value * 5;

                          return String(num);
                        },
                      },
                    },

                    valueLabel: {
                      formatTextValue: (value: string) => {
                        const string_value = Number(value);
                        const num = string_value * 5;
                        const text = "Good";
                        return String(`${num} - ${text}`);
                      },
                      // matchColorWithArc: true,
                      style: {
                        fontSize: "35px",
                        fill: "#000",
                        textShadow: "unset",
                        fontWeight: "bolder",
                      },
                    },
                  }}
                  arc={{
                    colorArray: [
                      "#62f42a",
                      "#e5f434",
                      "#f49c4b",
                      "#df352a",
                      "#b430e3",
                      "#8b2121",
                    ],
                    // colorArray: ["#5BE12C", "#EA4228"],
                    subArcs: [
                      { limit: 10 },
                      { limit: 20 },
                      { limit: 30 },
                      { limit: 40 },
                      { limit: 60 },
                      { limit: 100 },
                    ],
                    padding: 0.02,
                    width: 0.3,
                  }}
                  pointer={{
                    elastic: true,
                    animationDelay: 0,
                  }}
                />
              </div>
              <div className="grid grid-cols-2 gap-[10px] w-full md:w-[30%] md:flex md:flex-col md:justify-between">
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
          <div className="font-[700] text-[24px]">Map</div>
          <p className="text-[14px] text-[#757575] mb-[20px]">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborumLorem ipsum
            dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim
            veniam, quis nostrud exercitation.
          </p>
          <div className="text-[#1D48E7] text-[14px]">Learn More</div>
        </div>
        <div className="rounded-[20px] shadow-md w-full p-[20px] lg:p-[40px] mt-[50px]">
          <div className="font-[700] text-[24px]">Historical Reading</div>
          <div className="w-[50%]">
            <Select
              name="timeline"
              label=""
              placeholder="Select the country"
              required={false}
              requiredMessage="Please select the country!"
              options={time_line} // Ensure countries is an array of { value, label }
              showSearch={true}
              defaultValue="Last 7 days"
              // styleClass="bg-[#E6E6E6]"
            />
          </div>

          <div className="xl:grid xl:grid-cols-2 xl:gap-[20px]">
            <div className="mb-[20px] xl:mb-[unset] md:flex w-full  bg-[#FDFDFD] border-[0.5px] border-[#E6E6E6] rounded-[10px] px-[24px] py-[28px] text-[14px] h-[400px]">
            <ResponsiveContainer width="100%" height={350}>
                <ComposedChart
                  data={data}
                  margin={{  left: -30, }}
                >
                  <CartesianGrid stroke="#f5f5f5" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />

                  {/* Render bars with a custom shape for variable widths */}
                  <Bar
                    dataKey="barValue"
                    fill="#fce9b2"
                    shape={(props: any) => {
                      const { index } = props; // Access the current index
                      const barWidth = data[index]?.barWidth || 20; // Get the custom width or use a default value
                      return <CustomBar {...props} width={barWidth} />;
                    }}
                    opacity={0.6}
                  />

                  {/* Transparent Net Effect under the Line */}
                  <Area
                    type="linear"
                    dataKey="lineValue"
                    stroke="none"
                    fill="#dfebd6" // Transparent orange net-like effect
                  />

                  {/* Line Graph: In Front of Bars */}
                  <Line
                    type="linear"
                    dataKey="lineValue"
                    stroke="#b1cd99"
                    strokeWidth={2}
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
            <div className="mb-[20px] xl:mb-[unset] md:flex w-full  bg-[#FDFDFD] border-[0.5px] border-[#E6E6E6] rounded-[10px] px-[24px] py-[28px] text-[14px] h-[400px]">
            <ResponsiveContainer width="100%" height={350}>
                <ComposedChart
                  data={data}
                  margin={{  left: -30, }}
                >
                  <CartesianGrid stroke="#f5f5f5" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />

                  {/* Render bars with a custom shape for variable widths */}
                  {/* <Bar
                    dataKey="barValue"
                    fill="#fce9b2"
                    shape={(props: any) => {
                      const { index } = props; // Access the current index
                      const barWidth = data[index]?.barWidth || 20; // Get the custom width or use a default value
                      return <CustomBar {...props} width={barWidth} />;
                    }}
                    opacity={0.6}
                  /> */}

                  {/* Transparent Net Effect under the Line */}
                  <Area
                    type="linear"
                    dataKey="lineValue"
                    stroke="none"
                    fill="#dfebd6" // Transparent orange net-like effect
                  />

                  {/* Line Graph: In Front of Bars */}
                  <Line
                    type="linear"
                    dataKey="lineValue"
                    stroke="#b1cd99"
                    strokeWidth={2}
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
            <div className="mb-[20px] xl:mb-[unset] md:flex w-full  bg-[#FDFDFD] border-[0.5px] border-[#E6E6E6] rounded-[10px] px-[24px] py-[28px] text-[14px] h-[400px]">

            <ResponsiveContainer width="100%" height={350}>
                <ComposedChart
                  data={data}
                  margin={{  left: -30, }}
                >
                  <CartesianGrid stroke="#f5f5f5" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />

                  {/* Render bars with a custom shape for variable widths */}
                  {/* <Bar
                    dataKey="barValue"
                    fill="#fce9b2"
                    shape={(props: any) => {
                      const { index } = props; // Access the current index
                      const barWidth = data[index]?.barWidth || 20; // Get the custom width or use a default value
                      return <CustomBar {...props} width={barWidth} />;
                    }}
                    opacity={0.6}
                  /> */}

                  {/* Transparent Net Effect under the Line */}
                  <Area
                    type="linear"
                    dataKey="lineValue"
                    stroke="none"
                    fill="#dfebd6" // Transparent orange net-like effect
                  />

                  {/* Line Graph: In Front of Bars */}
                  <Line
                    type="linear"
                    dataKey="lineValue"
                    stroke="#b1cd99"
                    strokeWidth={2}
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
            <div className="mb-[20px] xl:mb-[unset] md:flex w-full  bg-[#FDFDFD] border-[0.5px] border-[#E6E6E6] rounded-[10px] px-[24px] py-[28px] text-[14px] h-[400px]">
            <ResponsiveContainer width="100%" height={350}>
                <ComposedChart
                  data={data}
                  margin={{  left: -30, }}
                >
                  <CartesianGrid stroke="#f5f5f5" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />

                  {/* Render bars with a custom shape for variable widths */}
                  {/* <Bar
                    dataKey="barValue"
                    fill="#fce9b2"
                    shape={(props: any) => {
                      const { index } = props; // Access the current index
                      const barWidth = data[index]?.barWidth || 20; // Get the custom width or use a default value
                      return <CustomBar {...props} width={barWidth} />;
                    }}
                    opacity={0.6}
                  /> */}

                  {/* Transparent Net Effect under the Line */}
                  <Area
                    type="linear"
                    dataKey="lineValue"
                    stroke="none"
                    fill="#dfebd6" // Transparent orange net-like effect
                  />

                  {/* Line Graph: In Front of Bars */}
                  <Line
                    type="linear"
                    dataKey="lineValue"
                    stroke="#b1cd99"
                    strokeWidth={2}
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="mt-[20px]">
            <div className="mb-[20px] xl:mb-[unset] md:flex w-full  bg-[#FDFDFD] border-[0.5px] border-[#E6E6E6] rounded-[10px] px-[24px] py-[28px] text-[14px] h-[400px]">
            <ResponsiveContainer width="100%" height={350} >
  <ComposedChart
    data={data2}
    margin={{ left: -30,  }}
  >
    <CartesianGrid stroke="#f5f5f5" />
    <XAxis dataKey="name" />
    <YAxis />
    <Tooltip />
    <Legend />

    {/* First Line */}
    <Line
      type="linear"
      dataKey="lineValue1"
      stroke="#b1cd99"
      strokeWidth={2}
    />

    {/* Second Line */}
    <Line
      type="linear"
      dataKey="lineValue2"
      stroke="#83a1c4"
      strokeWidth={2}
    />

    {/* Third Line */}
    <Line
      type="linear"
      dataKey="lineValue3"
      stroke="#ff8563"
      strokeWidth={2}
    />
  </ComposedChart>
</ResponsiveContainer>

 

            </div>
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

                  <div className="w-full text-center mb-[10px] mt-[16px] text-[16px] md:text-[18px] text-[#757575]">
                    {item.day}
                  </div>
                  <div className="w-full text-center text-[16px] md:text-[18px] text-[#757575]">
                    {item.date}&nbsp;{item.month}
                  </div>
                </div>
              ))}
            </div>
          )}
          {tab_value === "pm1" && (
            <div className="grid md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 mt-[20px] gap-[20px]">
              {pm1.map((item, index) => (
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
                    </div>
                  </div>

                  <div className="w-full text-center mb-[10px] mt-[16px] text-[16px] md:text-[18px] text-[#757575]">
                    {item.day}
                  </div>
                  <div className="w-full text-center text-[16px] md:text-[18px] text-[#757575]">
                    {item.date}&nbsp;{item.month}
                  </div>
                </div>
              ))}
            </div>
          )}
          {tab_value === "pm2.5" && (
            <div className="grid md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 mt-[20px] gap-[20px]">
              {pm25.map((item, index) => (
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
                    </div>
                  </div>

                  <div className="w-full text-center mb-[10px] mt-[16px] text-[16px] md:text-[18px] text-[#757575]">
                    {item.day}
                  </div>
                  <div className="w-full text-center text-[16px] md:text-[18px] text-[#757575]">
                    {item.date}&nbsp;{item.month}
                  </div>
                </div>
              ))}
            </div>
          )}
          {tab_value === "pm10" && (
            <div className="grid md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 mt-[20px] gap-[20px]">
              {pm10.map((item, index) => (
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
                    </div>
                  </div>

                  <div className="w-full text-center mb-[10px] mt-[16px] text-[16px] md:text-[18px] text-[#757575]">
                    {item.day}
                  </div>
                  <div className="w-full text-center text-[16px] md:text-[18px] text-[#757575]">
                    {item.date}&nbsp;{item.month}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="mb-[100px]">
          <div className="bg-[#ECF0FD] rounded-[20px] p-[10px] md:p-[35px] my-[40px]">
            <div className="flex justify-end p-[10px] md:p-[16px]">
              <MdClose size={24} />{" "}
            </div>
            <p className="w-full text-[18px] md:w-[80%]">
              The Airnote is made in patnership with{" "}
              <span className="text-[#1D48E7]">Safecast</span>, a
              volunteer-centered organization devoted to open citizen science
              for environmental monitoring.{" "}
              <span className="text-[#1D48E7]">Donate here</span>.
            </p>
          </div>
          <div className="flex flex-col gap-y-[20px] md:flex-row justify-between text-[18px] md:text-[28px] font-[500]">
            <div>
              <div className="text-center">Connected By</div>
              <div className="text-[#1D48E7] text-center">Notecard</div>
            </div>
            <div>
              <div className="text-center">Developed By</div>
              <div className="text-[#1D48E7] text-center">Blues Inc.</div>
            </div>
            <div>
              <div className="text-center">In Patnership with</div>
              <div className="text-[#1D48E7] text-center">Safecast</div>
            </div>
          </div>
        </div>
      </Container>
    </MainLayout>
  );
};

export default AirReadingDetails;

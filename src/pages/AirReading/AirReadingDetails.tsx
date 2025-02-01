import Container from "@components/container";
import MainLayout from "@layouts/MainLayout";
import { Link, useLocation } from "react-router-dom";

import { AiOutlineInfoCircle } from "react-icons/ai";
import { Button, DatePicker, Divider, Space } from "antd";
import { useEffect, useState } from "react";
import { GaugeComponent } from "react-gauge-component";
import Select from "@components/select/Select";
import { MdClose } from "react-icons/md";
import {
  ComposedChart,
  Line,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import moment from "moment";
import GraphIndicator from "@components/GraphIndicator";
import MapHighlights from "./map";
import { CSVLink } from "react-csv";
import { IoArrowBackOutline } from "react-icons/io5";
import { FlattenedDataType } from "../../types/airMonitoring";
import dayjs, { Dayjs } from "dayjs";
// import { FlattenedDataType } from "../../types/airMonitoring";

const { RangePicker } = DatePicker;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
// const CustomBar = (props: any) => {
//   const { x, y, width, height, fill } = props;
//   return <Rectangle x={x} y={y} width={width} height={height} fill={fill} />;
// };

interface FilterValues {
  dateRange: [Dayjs | null, Dayjs | null];
  date: Dayjs | null;
}

const AirReadingDetails = () => {
  const location = useLocation();
  const { item } = location.state || {};
  // console.log(item, " Calling you Ole");

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
      text: "Unhealthy for sensitive groups(USG)",
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
      value: item.airReading.length > 0 ? item.airReading[(item.airReading.length)- 1].pm01_0 : "No data",
      info: "",
    },
    {
      text: "PM 2.5",
      value: item.airReading.length > 0 ? item.airReading[(item.airReading.length)- 1].pm02_5 : "No data",
      info: "",
    },
    {
      text: "PM 10",
      value: item.airReading.length > 0 ? item.airReading[(item.airReading.length)- 1].pm10_0 : "No data",
      info: "",
    },
  ];

  const atmos = [
    {
      text: "Humidity",
      value:
        item.airReading.length > 0 ? item.airReading[(item.airReading.length)- 1].humidity : "No data",
      info: "",
    },
    {
      text: "Pressure",
      value:
        item.airReading.length > 0 ? item.airReading[(item.airReading.length)- 1].pressure : "No data",
      info: "",
    },
    {
      text: "Voltage",
      value:
        item.airReading.length > 0 ? item.airReading[(item.airReading.length)- 1].voltage : "No data",
      info: "",
    },
  ];

  const tab_text = [
    { text: <div>Air&nbsp;Quality&nbsp;Reading</div>, text2: "aq" },
    { text: <div>PM&nbsp;1</div>, text2: "pm1" },
    { text: <div>PM&nbsp;2.5</div>, text2: "pm2.5" },
    { text: <div>PM&nbsp;10</div>, text2: "pm10" },
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
        text = "USG";
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

  const [csvItems, setCsvItems] = useState<FlattenedDataType[]>([]);

  const [dateRange, setDaysRange] = useState<string | number>("Last 7 days");
  const [showFilter, setShowFilter] = useState<boolean>(false);

  const handleFilterChange = (
    date: Dayjs | [Dayjs | null, Dayjs | null] | null,
    field: keyof FilterValues
  ) => {
    setFilterValues((prev) => ({
      ...prev,
      [field]: date,
    }));
  };

  const [filterValues, setFilterValues] = useState<FilterValues>({
    dateRange: [null, null],
    date: null,
  });

  const clearFilter = () => {
    setFilterValues({
      dateRange: [null, null],
      date: null,
    });

    setShowFilter(false);
  };

  // useEffect(() => {
  //   const flattenedData = [item].flatMap((item:any) => {
  //     // Flatten airReading
  //     const airReadingsFlattened = item.airReading?.map((air:any) => ({
  //       deviceId: item.id,
  //       deviceUid: item.device_uid,
  //       serialNumber: item.serial_number,
  //       location: item.location,
  //       latitude: item.lat,
  //       longitude: item.lon,
  //       createdAt: moment(item.createdAt).format("YYYY-MM-DD"),
  //       updatedAt: moment(item.updatedAt).format("YYYY-MM-DD"),
  //       readingType: "Air Reading",
  //       readingId: air.id,
  //       aqi: Number(air.aqi), // Ensure number type
  //       humidity: Number(air.humidity), // Ensure number type
  //       pm01_0: Number(air.pm01_0), // Ensure number type
  //       pm02_5: Number(air.pm02_5), // Ensure number type
  //       pm10_0: Number(air.pm10_0), // Ensure number type
  //       pressure: Number(air.pressure), // Ensure number type
  //       temperature: Number(air.temperature), // Ensure number type
  //       voltage: Number(air.voltage), // Ensure number type
  //       captured: Number(air.captured), // Ensure number type
  //       readingCreatedAt: moment(air.createdAt).format("YYYY-MM-DD"),
  //     }));

  //     // Flatten histories
  //     const historiesFlattened = item.histories?.map((history:any) => ({
  //       deviceId: item.id,
  //       deviceUid: item.device_uid,
  //       serialNumber: item.serial_number,
  //       location: item.location,
  //       latitude: item.lat,
  //       longitude: item.lon,
  //       createdAt: moment(item.createdAt).format("YYYY-MM-DD"),
  //       updatedAt: moment(item.updatedAt).format("YYYY-MM-DD"),
  //       readingType: "History",
  //       readingId: history.id,
  //       aqi: Number(history.aqi), // Ensure number type
  //       humidity: null, // Histories don't have humidity
  //       pm01_0: Number(history.pm1_0), // Ensure number type
  //       pm02_5: Number(history.pm2_5), // Ensure number type
  //       pm10_0: Number(history.pm10_0), // Ensure number type
  //       pressure: null, // Histories don't have pressure
  //       temperature: null, // Histories don't have temperature
  //       voltage: null, // Histories don't have voltage
  //       captured: null, // Histories don't have captured
  //       readingCreatedAt: moment(history.date).format("YYYY-MM-DD"),
  //     }));

  //     // Combine airReadings and histories
  //     return [...airReadingsFlattened, ...historiesFlattened];
  //   });
  //   setCsvItems(flattenedData);
  // }, [item]);

  // Define headers for CSV

  const [startDate, endDate] = filterValues.dateRange;
  const singleDate = filterValues.date;

  useEffect(() => {
    const filterData = (
      data: any[],
      startDate?: Dayjs | null,
      endDate?: Dayjs | null,
      singleDate?: Dayjs | null
    ) => {
      // If no filters are specified, return all data
      if (!startDate && !endDate && !singleDate) return data;

      return data.filter((item) => {
        const itemDate = dayjs(item.readingCreatedAt);

        // Single date filter (exact match)
        if (singleDate) {
          return itemDate.isSame(singleDate, "day");
        }

        // Date range filter
        const filterStartDate = startDate || dayjs("-Infinity");
        const filterEndDate = endDate || dayjs("Infinity");

        // Check if the item's date is within the specified range (inclusive)
        return (
          itemDate.isAfter(filterStartDate.subtract(1, "day")) &&
          itemDate.isBefore(filterEndDate.add(1, "day"))
        );
      });
    };

    const flattenedData = [item].flatMap((item: any) => {
      // Flatten airReading (previous implementation remains the same)
      const airReadingsFlattened = item.airReading?.map((air: any) => ({
        deviceId: item.id,
        deviceUid: item.device_uid,
        serialNumber: item.serial_number,
        location: item.location,
        latitude: item.lat,
        longitude: item.lon,
        createdAt: moment(item.createdAt).format("YYYY-MM-DD"),
        updatedAt: moment(item.updatedAt).format("YYYY-MM-DD"),
        readingType: "Air Reading",
        readingId: air.id,
        aqi: Number(air.aqi),
        humidity: Number(air.humidity),
        pm01_0: Number(air.pm01_0),
        pm02_5: Number(air.pm02_5),
        pm10_0: Number(air.pm10_0),
        pressure: Number(air.pressure),
        temperature: Number(air.temperature),
        voltage: Number(air.voltage),
        captured: Number(air.captured),
        readingCreatedAt: moment(air.createdAt).format("YYYY-MM-DD"),
      }));

      // Flatten histories (previous implementation remains the same)
      const historiesFlattened = item.histories?.map((history: any) => ({
        deviceId: item.id,
        deviceUid: item.device_uid,
        serialNumber: item.serial_number,
        location: item.location,
        latitude: item.lat,
        longitude: item.lon,
        createdAt: moment(item.createdAt).format("YYYY-MM-DD"),
        updatedAt: moment(item.updatedAt).format("YYYY-MM-DD"),
        readingType: "History",
        readingId: history.id,
        aqi: Number(history.aqi),
        humidity: null,
        pm01_0: Number(history.pm1_0),
        pm02_5: Number(history.pm2_5),
        pm10_0: Number(history.pm10_0),
        pressure: null,
        temperature: null,
        voltage: null,
        captured: null,
        readingCreatedAt: moment(history.date).format("YYYY-MM-DD"),
      }));

      // Combine airReadings and histories
      return [...airReadingsFlattened, ...historiesFlattened];
    });

    // Filter the flattened data
    const filteredData = filterData(
      flattenedData,
      startDate, // Optional start date for range
      endDate, // Optional end date for range
      singleDate // Optional single date
    );

    setCsvItems(filteredData);
  }, [item, startDate, endDate, singleDate]); // Add singleDate to dependency array

  const headers = [
    { label: "Device ID", key: "deviceId" },
    { label: "Device UID", key: "deviceUid" },
    { label: "Serial Number", key: "serialNumber" },
    { label: "Location", key: "location" },
    { label: "Latitude", key: "latitude" },
    { label: "Longitude", key: "longitude" },
    { label: "Device Created At", key: "createdAt" },
    { label: "Device Updated At", key: "updatedAt" },
    { label: "Reading Type", key: "readingType" },
    { label: "Reading ID", key: "readingId" },
    { label: "AQI", key: "aqi" },
    { label: "Humidity", key: "humidity" },
    { label: "PM01.0", key: "pm01_0" },
    { label: "PM02.5", key: "pm02_5" },
    { label: "PM10.0", key: "pm10_0" },
    { label: "Pressure", key: "pressure" },
    { label: "Temperature", key: "temperature" },
    { label: "Voltage", key: "voltage" },
    { label: "Captured", key: "captured" },
    { label: "Reading Created At", key: "readingCreatedAt" },
  ];

  return (
    <MainLayout>
      <Container>
        <div className="relative flex flex-col lg:flex-row justify-between lg:items-end mt-[20vh] lg:mt-[25vh]">
          <div className="flex flex-col gap-2 text-[24px] md:text-[32px] font-[700] text-[#2C2C2C] font-arialBlack">
            <Link to="/air-reading" className="w-[50px]   ">
              <IoArrowBackOutline size={20} />
            </Link>
            Air Quality in {item.serial_number}
          </div>

          <Button
            className="h-[46px] w-[30%] lg:w-auto bg-transparent mt-5 lg:mt-0"
            onClick={() => setShowFilter((value) => !value)}
            icon={
              <img
                src="/download.svg"
                alt="image"
                className="w-[17.5px] h-[17.5px] "
              />
            }
          >
            <div className="text-[16px] font-[400]">Download</div>
          </Button>

          <div
            className={`absolute top-[180px] w-full h-fit z-[999] px-[25px] bg-white md:top-[150px] ${
              showFilter === true ? "block" : "hidden"
            }`}
          >
            <div className="flex gap-x-[20px]  mt-[20px]">
              <div className="lg:w-[20%] ">
                <Space direction="vertical" className=" w-full">
                  <label
                    htmlFor="date-picker"
                    className="text-[16px] font-[400] text-BrandBlack1 "
                  >
                    Date
                  </label>
                  <DatePicker
                    className="h-[48px] w-full"
                    placeholder="Select date"
                    onChange={(date) => handleFilterChange(date, "date")}
                    value={filterValues.date}
                  />
                </Space>
              </div>
            </div>
            <div className="lg:w-[40%]">
              <Space direction="vertical" className="w-full">
                <label
                  htmlFor="date-range-picker"
                  className="text-[16px] font-[400] text-BrandBlack1"
                >
                  Date Range
                </label>
                <RangePicker
                  className="h-[48px] w-full"
                  onChange={(dates) => handleFilterChange(dates, "dateRange")}
                  value={filterValues.dateRange}
                />
              </Space>
            </div>
            <Divider className="mt-[15px] mb-[10px]" />
            <div className="flex justify-end gap-x-[16px] mb-[20px]">
              <Button
                className="w-[234px] h-[48px] text-[16px] font-[400] bg-transparent text-[#9B9B9B]"
                onClick={clearFilter}
              >
                Cancel
              </Button>

              <Button
                onClick={() => {
                  setShowFilter(false);
                  setFilterValues({
                    dateRange: [null, null],
                    date: null,
                  });
                }}
                type="primary"
                className="w-[234px] h-[48px] text-[16px] font-[400]  bg-BrandPrimary"
              >
                <div className="text-[16px] font-[400]">
                  <CSVLink
                    filename={"Air_monitoring_data.csv"}
                    data={csvItems}
                    headers={headers}
                    className="btn btn-primary"
                  >
                    <div className="text-[16px] font-[400]">Apply Filter</div>
                  </CSVLink>
                </div>
              </Button>
            </div>
          </div>
        </div>

        <div className="rounded-[20px] shadow-md w-full p-[20px] lg:p-[40px] mt-[50px]">
          <div className="text-[16px] font-[700] text-[#2C2C2C]">
            Current reading
          </div>
          <div className="text-[18px] font-[500] text-[#757575]">
            Last Updated:{moment(item.airReading[(item.airReading.length)- 1].createdAt).format("YYYY-MM-DD")}
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
                  value={
                    item.airReading.length > 0 ? item.airReading[(item.airReading.length)- 1].aqi / 5 : 0
                  }
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
                        const text = getAQRGrade(
                          String(
                            item.airReading.length > 0
                              ? item.airReading[(item.airReading.length)- 1].aqi
                              : ""
                          )
                        );
                        return String(`${num} - ${text}`);
                        // return String(`${num} - ${text}`);
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
                {colorRange?.map((item, index) => (
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
                {pm?.map((item, index) => (
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
              <div className="w-full rid-cols-1 grid md:grid-cols-2 mt-[20px] gap-[20px]">
                <div className=" bg-[#FDFDFD] border-[0.5px] border-[#E6E6E6] rounded-[10px] text-[14px] flex items-center justify-center h-[147.5px]">
                  <div>
                    <div className="text-center text-[24px] md:text-[32px] font-[700] text-[#2C2C2C]">
                      {item.airReading.length > 0
                        ? item.airReading[(item.airReading.length)- 1].temperature
                        : "No data"}
                      &deg;C
                    </div>
                    <div className="flex justify-center items-center gap-x-[5px] text-[16px] font-[600] text-[#757575]">
                      Temperature
                      <div className="cursor-pointer">
                        <AiOutlineInfoCircle color="#1D48E7" />
                      </div>
                    </div>
                  </div>
                </div>
                {atmos?.map((item, index) => (
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
            <MapHighlights
              id={item.id}
              lat={item.lat}
              lon={item.lon}
              location={item.location}
              airReading={item.airReading}
            />
          </div>
        </div>

        <div className="rounded-[20px] shadow-md w-full p-[20px] lg:p-[40px] mt-[50px]">
          <div className="font-[700] text-[24px]">Historical Reading</div>
          <div className="w-[50%]">
            <Select
              name="timeline"
              label=""
              required={false}
              options={time_line} // Ensure countries is an array of { value, label }
              defaultValue="Last 7 days"
              onChange={(e) => {
                setDaysRange(e);
              }}
              // styleClass="bg-[#E6E6E6]"
            />
          </div>

          <div className="xl:grid xl:grid-cols-2 xl:gap-[20px]">
            <div className="mb-[20px] xl:mb-[unset] w-full  bg-[#FDFDFD] border-[0.5px] border-[#E6E6E6] rounded-[10px] px-[24px] py-[28px] text-[14px] h-[500px]">
              <div className="text-[14px] mb-[20px]">Air Quality Index</div>
              <div className="mb-[20px] flex items-center justify-center gap-x-[10px]">
                <GraphIndicator color="#DC82E899" text="AQI" />
              </div>
              <ResponsiveContainer width="100%" height={350}>
                <ComposedChart
                  // data={filteredHistories?.map(h => ({
                  data={item.histories
                    .slice(
                      0,
                      dateRange === "Last 7 days"
                        ? 7
                        : dateRange === "Last 14 days"
                        ? 14
                        : dateRange === "Last 1 month"
                        ? 30
                        : dateRange === "2 months ago"
                        ? 60
                        : 0
                    )
                    ?.map((h: any) => ({
                      name: moment(h.date).format("DD MMM"),
                      lineValue: h.aqi,
                      barValue: h.aqi,
                    }))}
                  margin={{ left: -30 }}
                >
                  <CartesianGrid stroke="#f5f5f5" />
                  <XAxis dataKey="name" />
                  <YAxis
                    domain={[0, 500]}
                    label={{ value: "AQI", angle: -90, position: "insideLeft" }}
                  />
                  <Tooltip />
                  <Legend />

                  <Area
                    type="linear"
                    name="AQI"
                    dataKey="lineValue"
                    stroke="none"
                    fill="#DC82E899"
                  />

                  <Line
                    type="linear"
                    name="AQI"
                    dataKey="lineValue"
                    stroke="#DC82E899"
                    strokeWidth={2}
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
            <div className="mb-[20px] xl:mb-[unset] w-full  bg-[#FDFDFD] border-[0.5px] border-[#E6E6E6] rounded-[10px] px-[24px] py-[28px] text-[14px] h-[500px]">
              <div className="text-[14px] mb-[20px]">PM 1</div>
              <div className="mb-[20px] flex items-center justify-center gap-x-[10px]">
                <GraphIndicator color="#B3CF9B" text="PM1" />
                {/* <GraphIndicator
              color="#FFECB4"
              text="Charging"
              /> */}
              </div>
              <ResponsiveContainer width="100%" height={350}>
                <ComposedChart
                  // data={filteredHistories?.map(h => ({
                  data={item.histories
                    .slice(
                      0,
                      dateRange === "Last 7 days"
                        ? 7
                        : dateRange === "Last 14 days"
                        ? 14
                        : dateRange === "Last 1 month"
                        ? 30
                        : dateRange === "2 months ago"
                        ? 60
                        : 0
                    )
                    ?.map((h: any) => ({
                      name: moment(h.date).format("DD MMM"),
                      lineValue: h.pm1_0,
                      barValue: h.pm1_0,
                    }))}
                  margin={{ left: -30 }}
                >
                  <CartesianGrid stroke="#f5f5f5" />
                  <XAxis dataKey="name" />
                  <YAxis
                    domain={[0, 500]}
                    label={{ value: "PM1", angle: -90, position: "insideLeft" }}
                  />
                  <Tooltip />
                  <Legend />

                  <Area
                    type="linear"
                    name="PM 1"
                    dataKey="lineValue"
                    stroke="none"
                    fill="#B3CF9B"
                  />

                  <Line
                    type="linear"
                    name="PM 1"
                    dataKey="lineValue"
                    stroke="#b1cd99"
                    strokeWidth={2}
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
            <div className="mb-[20px] xl:mb-[unset] w-full  bg-[#FDFDFD] border-[0.5px] border-[#E6E6E6] rounded-[10px] px-[24px] py-[28px] text-[14px] h-[500px]">
              <div className="text-[14px] mb-[20px]">PM 2.5</div>
              <div className="mb-[20px] flex items-center justify-center gap-x-[10px]">
                <GraphIndicator color="#73ACC1" text="PM2.5" />
                {/* <GraphIndicator
              color="#FFECB4"
              text="Charging"
              /> */}
              </div>
              <ResponsiveContainer width="100%" height={350}>
                <ComposedChart
                  // data={filteredHistories?.map(h => ({
                  data={item.histories
                    .slice(
                      0,
                      dateRange === "Last 7 days"
                        ? 7
                        : dateRange === "Last 14 days"
                        ? 14
                        : dateRange === "Last 1 month"
                        ? 30
                        : dateRange === "2 months ago"
                        ? 60
                        : 0
                    )
                    ?.map((h: any) => ({
                      name: moment(h.date).format("DD MMM"),
                      lineValue: h.pm2_5,
                      barValue: h.pm2_5,
                    }))}
                  margin={{ left: -30 }}
                >
                  <CartesianGrid stroke="#f5f5f5" />
                  <XAxis dataKey="name" />
                  <YAxis
                    domain={[0, 500]}
                    label={{ value: "PM1", angle: -90, position: "insideLeft" }}
                  />
                  <Tooltip />
                  <Legend />

                  <Area
                    type="linear"
                    name="PM 2.5"
                    dataKey="lineValue"
                    stroke="none"
                    fill="#73ACC1"
                  />

                  <Line
                    type="linear"
                    name="PM 2.5"
                    dataKey="lineValue"
                    stroke="#73ACC1"
                    strokeWidth={2}
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
            <div className="mb-[20px] xl:mb-[unset] w-full  bg-[#FDFDFD] border-[0.5px] border-[#E6E6E6] rounded-[10px] px-[24px] py-[28px] text-[14px] h-[500px]">
              <div className="text-[14px] mb-[20px]">PM 10</div>
              <div className="mb-[20px] flex items-center justify-center gap-x-[10px]">
                <GraphIndicator color="#F9B8B0" text="PM10" />
                {/* <GraphIndicator
              color="#FFECB4"
              text="Charging"
              /> */}
              </div>
              <ResponsiveContainer width="100%" height={350}>
                <ComposedChart
                  // data={filteredHistories?.map(h => ({
                  data={item.histories
                    .slice(
                      0,
                      dateRange === "Last 7 days"
                        ? 7
                        : dateRange === "Last 14 days"
                        ? 14
                        : dateRange === "Last 1 month"
                        ? 30
                        : dateRange === "2 months ago"
                        ? 60
                        : 0
                    )
                    ?.map((h: any) => ({
                      name: moment(h.date).format("DD MMM"),
                      lineValue: h.pm10_0,
                      barValue: h.pm10_0,
                    }))}
                  margin={{ left: -30 }}
                >
                  <CartesianGrid stroke="#f5f5f5" />
                  <XAxis dataKey="name" />
                  <YAxis
                    domain={[0, 500]}
                    label={{ value: "PM1", angle: -90, position: "insideLeft" }}
                  />
                  <Tooltip />
                  <Legend />

                  <Area
                    type="linear"
                    name="PM 10"
                    dataKey="lineValue"
                    stroke="none"
                    fill="#F9B8B0"
                  />

                  <Line
                    type="linear"
                    name="PM 10"
                    dataKey="lineValue"
                    stroke="#F9B8B0"
                    strokeWidth={2}
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="mt-[20px]">
            <div className="mb-[20px] xl:mb-[unset] w-full  bg-[#FDFDFD] border-[0.5px] border-[#E6E6E6] rounded-[10px] px-[24px] py-[28px] text-[14px] h-[500px]">
              <div className="text-[14px] mb-[20px]">
                Air Quality PM (ug/m2)
              </div>
              <div className="mb-[20px] flex items-center justify-center gap-x-[10px]">
                <GraphIndicator color="#B3CF9B" text="PM1 (ug/m2)" />
                <GraphIndicator color="#73ACC1" text="PM2.5 (ug/m2)" />
                <GraphIndicator color="#F9B8B0" text="PM10 (ug/m2)" />
              </div>
              <ResponsiveContainer width="100%" height={350}>
                <ComposedChart
                  data={item.histories
                    .slice(
                      0,
                      dateRange === "Last 7 days"
                        ? 7
                        : dateRange === "Last 14 days"
                        ? 14
                        : dateRange === "Last 1 month"
                        ? 30
                        : dateRange === "2 months ago"
                        ? 60
                        : 0
                    )
                    ?.map((h: any) => ({
                      name: moment(h.date).format("DD MMM"),
                      pm10: h.pm10_0,
                      pm1: h.pm1_0,
                      pm25: h.pm2_5,
                    }))}
                  margin={{ left: -30 }}
                >
                  <CartesianGrid stroke="#f5f5f5" />
                  <XAxis dataKey="name" />
                  <YAxis
                    domain={[0, 500]}
                    label={{
                      value: "Particulate Matter (μg/m³)",
                      angle: -90,
                      position: "insideLeft",
                    }}
                  />
                  <Tooltip />
                  <Legend />

                  <Line
                    type="linear"
                    dataKey="pm10"
                    stroke="#F9B8B0"
                    name="PM10"
                    strokeWidth={2}
                  />
                  <Line
                    type="linear"
                    dataKey="pm1"
                    stroke="#82CA9D"
                    name="PM1"
                    strokeWidth={2}
                  />
                  <Line
                    type="linear"
                    dataKey="pm25"
                    stroke="#8884D8"
                    name="PM2.5"
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
              Air Quality Index Average ({dateRange})
            </div>
            <div className="w-full flex gap-[16px] items-center overflow-x-auto">
              {tab_text?.map((item, index) => (
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
              {item.histories &&
                item.histories
                  .slice(
                    0,
                    dateRange === "Last 7 days"
                      ? 7
                      : dateRange === "Last 14 days"
                      ? 14
                      : dateRange === "Last 1 month"
                      ? 30
                      : dateRange === "2 months ago"
                      ? 60
                      : 0
                  )
                  ?.map((item: any, index: number) => (
                    <div className="flex flex-col items-center">
                      <div
                        key={index.toString()}
                        className={`w-full  border-[0.5px] border-[#E6E6E6] rounded-[10px] text-[14px] flex items-center justify-center h-[147.5px] ${
                          getAQRGrade(item.aqi ? item.aqi : "No data") ===
                          "Good"
                            ? "bg-[#62F42E]"
                            : getAQRGrade(item.aqi ? item.aqi : "No data") ===
                              "Moderate"
                            ? "bg-[#E5F434]"
                            : getAQRGrade(item.aqi ? item.aqi : "No data") ===
                              "USG"
                            ? "bg-[#F49C4B]"
                            : getAQRGrade(item.aqi ? item.aqi : "No data") ===
                              "Unhealthy"
                            ? "bg-[#F43A2E]"
                            : getAQRGrade(item.aqi ? item.aqi : "No data") ===
                              "Very unhealthy"
                            ? "bg-[#B430E3]"
                            : getAQRGrade(item.aqi ? item.aqi : "No data") ===
                              "Harzadous"
                            ? "bg-[#8B2121]"
                            : "bg-[#C2C2C2]"
                        }`}
                      >
                        <div>
                          <div className="text-center text-[24px] md:text-[32px] font-[700] text-[#2C2C2C]">
                            {item.aqi ? item.aqi : "No data"}
                          </div>
                          <div className="my-[-20px]">
                            <Divider />
                          </div>
                          <div className="flex justify-center items-center gap-x-[5px] text-[16px] font-[600] text-[#2C2C2C]">
                            {getAQRGrade(item.aqi ? item.aqi : "No data")}
                          </div>
                        </div>
                      </div>

                      <div className="w-full text-center mb-[10px] mt-[16px] text-[16px] md:text-[18px] text-[#757575]">
                        {item.date ? moment(item.date).format("dddd") : ""}
                      </div>
                      <div className="w-full text-center text-[16px] md:text-[18px] text-[#757575]">
                        {item.date ? moment(item.date).format("DD") : ""}&nbsp;
                        {item.date ? moment(item.date).format("MMMM") : ""}
                      </div>
                    </div>
                  ))}
            </div>
          )}
          {tab_value === "pm1" && (
            <div className="grid md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 mt-[20px] gap-[20px]">
              {item.histories &&
                item.histories
                  .slice(
                    0,
                    dateRange === "Last 7 days"
                      ? 7
                      : dateRange === "Last 14 days"
                      ? 14
                      : dateRange === "Last 1 month"
                      ? 30
                      : dateRange === "2 months ago"
                      ? 60
                      : 0
                  )
                  ?.map((item: any, index: number) => (
                    <div className="flex flex-col items-center">
                      <div
                        key={index.toString()}
                        className={`w-full bg-[#FDFDFD] border-[0.5px] border-[#E6E6E6] rounded-[10px] text-[14px] flex items-center justify-center h-[147.5px]`}
                      >
                        <div>
                          <div className="text-center text-[24px] md:text-[32px] font-[700] text-[#2C2C2C]">
                            {item.pm1_0 ? item.pm1_0 : "No data"}
                          </div>
                        </div>
                      </div>

                      <div className="w-full text-center mb-[10px] mt-[16px] text-[16px] md:text-[18px] text-[#757575]">
                        {item.date ? moment(item.date).format("dddd") : ""}
                      </div>
                      <div className="w-full text-center text-[16px] md:text-[18px] text-[#757575]">
                        {item.date ? moment(item.date).format("DD") : ""}&nbsp;
                        {item.date ? moment(item.date).format("MMMM") : ""}
                      </div>
                    </div>
                  ))}
            </div>
          )}
          {tab_value === "pm2.5" && (
            <div className="grid md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 mt-[20px] gap-[20px]">
              {item.histories &&
                item.histories
                  .slice(
                    0,
                    dateRange === "Last 7 days"
                      ? 7
                      : dateRange === "Last 14 days"
                      ? 14
                      : dateRange === "Last 1 month"
                      ? 30
                      : dateRange === "2 months ago"
                      ? 60
                      : 0
                  )
                  ?.map((item: any, index: number) => (
                    <div className="flex flex-col items-center">
                      <div
                        key={index.toString()}
                        className={`w-full bg-[#FDFDFD] border-[0.5px] border-[#E6E6E6] rounded-[10px] text-[14px] flex items-center justify-center h-[147.5px]`}
                      >
                        <div>
                          <div className="text-center text-[24px] md:text-[32px] font-[700] text-[#2C2C2C]">
                            {item.pm2_5 ? item.pm2_5 : "No data"}
                          </div>
                        </div>
                      </div>

                      <div className="w-full text-center mb-[10px] mt-[16px] text-[16px] md:text-[18px] text-[#757575]">
                        {item.date ? moment(item.date).format("dddd") : ""}
                      </div>
                      <div className="w-full text-center text-[16px] md:text-[18px] text-[#757575]">
                        {item.date ? moment(item.date).format("DD") : ""}&nbsp;
                        {item.date ? moment(item.date).format("MMMM") : ""}
                      </div>
                    </div>
                  ))}
            </div>
          )}
          {tab_value === "pm10" && (
            <div className="grid md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 mt-[20px] gap-[20px]">
              {item.histories &&
                item.histories
                  .slice(
                    0,
                    dateRange === "Last 7 days"
                      ? 7
                      : dateRange === "Last 14 days"
                      ? 14
                      : dateRange === "Last 1 month"
                      ? 30
                      : dateRange === "2 months ago"
                      ? 60
                      : 0
                  )
                  ?.map((item: any, index: number) => (
                    <div className="flex flex-col items-center">
                      <div
                        key={index.toString()}
                        className={`w-full bg-[#FDFDFD] border-[0.5px] border-[#E6E6E6] rounded-[10px] text-[14px] flex items-center justify-center h-[147.5px]`}
                      >
                        <div>
                          <div className="text-center text-[24px] md:text-[32px] font-[700] text-[#2C2C2C]">
                            {item.pm10_0 ? item.pm10_0 : "No data"}
                          </div>
                        </div>
                      </div>

                      <div className="w-full text-center mb-[10px] mt-[16px] text-[16px] md:text-[18px] text-[#757575]">
                        {item.date ? moment(item.date).format("dddd") : ""}
                      </div>
                      <div className="w-full text-center text-[16px] md:text-[18px] text-[#757575]">
                        {item.date ? moment(item.date).format("DD") : ""}&nbsp;
                        {item.date ? moment(item.date).format("MMMM") : ""}
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

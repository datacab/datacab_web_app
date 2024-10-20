import MainLayout from "@layouts/MainLayout";
import { Button, Input, Pagination } from "antd";
import { IoSearch } from "react-icons/io5";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AQ_Card from "@components/AQ_card";
import MapHighlights from "./map";
import Container from "@components/container";
import Donors from "@pages/home/sections/donors";

interface AQIData {
  id: string;
  country: string;
  state: string;
  lga: string;
  community: string;
  AQI: string;
  pm_1: string;
  pm_2: string;
  pm10: string;
  temp: string;
  humidity: string;
  heat: string;
  voltage: string;
  date:string;
}

const AQI_datas: AQIData[] = [
  {
    id: `0`,
    country: `Botzwana`,
    state: `West Central Botzwana`,
    lga: `Ghanzi`,
    community: `Ghanzi`,
    AQI: `65`,
    pm_1: `11`,
    pm_2: `18`,
    pm10: `18`,
    temp: `26`,
    humidity: `83`,
    heat: `26`,
    voltage: `3.9`,
    date:"October 08 2024 at 12:50 pm"
  },
];

for (let i = 1; i < 30; i++) {
  AQI_datas.push({
    id: `${i}`,
    country: `Botzwana ${i}`,
    state: `West Central Botzwana ${i}`,
    lga: `Ghanzi ${i}`,
    community: `Ghanzi ${i}`,
    AQI: `65${+i}`,
    pm_1: `11${+i}`,
    pm_2: `18${+i}`,
    pm10: `18${+i}`,
    temp: `26${+i}`,
    humidity: `83${+i}`,
    heat: `26${+i}`,
    voltage: `3.9${+i}`,
    date:`October 08 2024 at 12:${i} pm`
  });
}

const AirReading = () => {
  const navigate = useNavigate();
  const [loadinglgas, setLoadinglgas] = useState<boolean>(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoadinglgas(false), 2000);

    // Cleanup the timer when the component unmounts
    return () => clearTimeout(timer);
  }, []);

  const onPageChange = (page: number) => {
    setCurrentPage(page);
  };

  const [currentPage, setCurrentPage] = useState(1);
  // const [isModalVisible, setIsModalVisible] = useState(false);
  // const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  // const [selectedBlog, setSelectedBlog] = useState<BlogData | null>(null);

  const [searchQuery, setSearchQuery] = useState<string>("");
  const filteredBlogs = AQI_datas.filter((AQI_data) =>
    AQI_data.country.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const lgasPerPage = 9;

  const currentBlogs = filteredBlogs.slice(
    (currentPage - 1) * lgasPerPage,
    currentPage * lgasPerPage
  );

  const handleNavigate = (item: AQIData) => {
    navigate(`/air-reading-details/${item.id}`, { state: { item } });
  };

  // const { country,Paragraph  } = Typography;

  // const donors = [
  //   {
  //     logo: "/pro_co.svg",
  //     text1: "Association For Progressive",
  //     text2: "Communications",
  //   },
  //   {
  //     logo: "/fren_nig.svg",
  //     text1: "Association For Progressive",
  //     text2: "Communications",
  //   },
  //   {
  //     logo: "/united_con.svg",
  //     text1: "Association For Progressive",
  //     text2: "Communications",
  //   },
  //   {
  //     logo: "/green_grant.svg",
  //     text1: "Association For Progressive",
  //     text2: "Communications",
  //   },
  //   {
  //     logo: "/ocf.svg",
  //     text1: "Association For Progressive",
  //     text2: "Communications",
  //   },
  //   {
  //     logo: "/ndi.svg",
  //     text1: "Association For Progressive",
  //     text2: "Communications",
  //   },
  // ];

  return (
    <MainLayout>
      <Container>
        <div className="flex justify-center mt-[60px]">
          <div className="w-[100%] ">
            <h1 className="font-[700] text-[32px] text-[#2C2C2C]">
              Air Reading
            </h1>
            <p className="my-[16px] text-[#757575] text-[18px] font-[500] md:w-[50%] ">
              We simplify environmental incident data into clear infographics,
              fostering grassroots participation in environmental protection.
            </p>

            <div className="flex gap-x-[16px] items-center">
              <Input
                placeholder="Search for data... "
                prefix={<IoSearch size={17.5} />}
                className="h-[46px] w-[323px] bg-transparent"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />

              <Button
                type="primary"
                // onClick={handleUploadClick}
                className="w-[200px] h-[48px] text-[16px] font-[400] bg-BrandPrimary"
              >
                <div className="text-[16px] font-[400]">Search</div>
              </Button>
            </div>

            {/* BLOGS POSTS>>>>>>>>>>>>>>>>>>>>>> */}

            {loadinglgas === true ? (
              <div className="my-[40px] grid grid-cols-3 gap-[19px]">
                {Array.from({ length: lgasPerPage }).map((_, index) => (
                  <div
                    key={index}
                    className="relative w-full h-[180px] flex flex-col gap-2"
                  >
                    {/* Delete icon skeleton */}
                    <div className="absolute top-4 right-4 bg-gray-200 animate-pulse w-[26px] h-[26px] rounded-full"></div>

                    {/* lga skeleton */}
                    <div className="w-full h-[180px] bg-gray-200 animate-pulse rounded-[14px]"></div>
                  </div>
                ))}
              </div>
            ) : currentBlogs.length > 0 ? (
              <div className="my-[40px] grid grid-cols-1 gap-y-[30px] md:gap-[19px] md:grid-cols-2 xl:grid-cols-3">
                {currentBlogs.map((item) => (
                  <AQ_Card item={item} clickFN={() => handleNavigate(item)} />
                ))}
              </div>
            ) : (
              <p> NOTHING HERE FOR NOW</p>
            )}

            <Pagination
              className="my-6 flex justify-end"
              current={currentPage}
              pageSize={lgasPerPage}
              total={AQI_datas.length}
              onChange={onPageChange}
            />
          </div>
        </div>
      </Container>

      <div className="my-[40px]">
        <MapHighlights />
      </div>

      <Container>
        {/* <div className="text-center font-[700] text-[24px] text-[#2C2C2C]">
          Our Donors
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-[40px] mt-[20px] mb-[73px]">

          {
            donors.map((item,index)=>(
              <div
              key={index.toString()}>
              <div className="flex justify-center">
                <img src={item.logo} alt="logo" />
              </div>
              <div className="font-[600] text-[14px] text-center">
              {item.text1}
              </div>
              <div className="font-[600] text-[14px] text-center">
             {item.text2}
              </div>
            </div>
            ))
          }
 
        </div> */}
         <Donors />
      </Container>
    </MainLayout>
  );
};
export default AirReading;

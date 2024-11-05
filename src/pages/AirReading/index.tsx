import MainLayout from "@layouts/MainLayout";
import { Button, Divider, Input, Pagination, Tooltip } from "antd";
import { IoSearch } from "react-icons/io5";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AQ_Card from "@components/AQ_card";
import MapHighlights from "./map";
import Container from "@components/container";
import Donors from "@pages/home/sections/donors";
import Select_v2 from "@components/select/Select_v2";
import { AQIData } from "../../types/airMonitoring";
import useAqtStore from "@store/airReading";

interface SelectOption {
  value: string;
  label: string;
  key: string;
}

const AQI_datas: AQIData[] = [
  {
    id: `0`,
    country: `Botzwana`,
    state: `West Central Botzwana`,
    lga: `Ghanzi`,
    city: `Ghanzi`,
    AQI: `65`,
    pm_1: `11`,
    pm_2: `18`,
    pm10: `18`,
    temp: `26`,
    humidity: `83`,
    heat: `26`,
    voltage: `3.9`,
    date: "October 08 2024 at 12:50 pm",
  },
];

for (let i = 1; i < 30; i++) {
  AQI_datas.push({
    id: `${i}`,
    country: `Botzwana ${i}`,
    state: `West Central Botzwana ${i}`,
    lga: `Ghanzi ${i}`,
    city: `Ghanzi ${i}`,
    AQI: `65${+i}`,
    pm_1: `11${+i}`,
    pm_2: `18${+i}`,
    pm10: `18${+i}`,
    temp: `26${+i}`,
    humidity: `83${+i}`,
    heat: `26${+i}`,
    voltage: `3.9${+i}`,
    date: `October 08 2024 at 12:${i} pm`,
  });
}

interface FilterValues {
  country: string | null;
  state: string | null;
  lga: string | null;
  city: string | null;
}

const AirReading = () => {
  //
  const aqt_data = useAqtStore((state) => state.AQI_datas);
  const set_aqt_data = useAqtStore((state) => state.set_AQI_datas);




  const [filteredItems, setFilteredItems] = useState<AQIData[]>([]);
  const [loadinglgas, setLoadinglgas] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState<string>("");
  
  // Initial data setup
  useEffect(() => {
    set_aqt_data(AQI_datas);
    setFilteredItems(AQI_datas);
  }, []);



  const [countryOptions, setCountryOptions] = useState<SelectOption[]>([]);
  const [stateOptions, setStateOptions] = useState<SelectOption[]>([]);
  const [lgaOptions, setLgaOptions] = useState<SelectOption[]>([]);
  const [cityOptions, setCityOptions] = useState<SelectOption[]>([]);

  const [isFilterActive, setIsFilterActive] = useState<boolean>(false);
  const [filter_input_values, set_filter_input_values] =
    useState<boolean>(false);
  const [showFilter, setShowFilter] = useState<boolean>(false);
  const [showFilter_v2, setShowFilter_v2] = useState<boolean>(true);
  const [filterValues, setFilterValues] = useState<FilterValues>({
    country: null,
    state: null,
    lga: null,
    city: null,
  });

  const generateFilterOptions = () => {
    const uniqueOptions = (field: keyof (typeof aqt_data)[0]) => {
      return Array.from(new Set(aqt_data.map((item) => item[field]))).map(
        (value, key) => ({
          value: value,
          label: value,
          key: key.toString(),
        })
      );
    };

    setCountryOptions(uniqueOptions("country"));
    setStateOptions(uniqueOptions("state"));
    setLgaOptions(uniqueOptions("lga"));
    setCityOptions(uniqueOptions("city"));
  };

  useEffect(() => {
    if (showFilter) {
      generateFilterOptions();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showFilter, aqt_data]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleFilterChange = (value: any, field: keyof FilterValues) => {
    set_filter_input_values(true);
    setFilterValues((prev) => ({
      ...prev,
      [field]: value,
    }));
  };
 
  const applyFilter = () => {
    const filtered = aqt_data.filter((item) => {
      const countryMatch =
        !filterValues.country || item.country === filterValues.country;
      const stateMatch =
        !filterValues.state || item.state === filterValues.state;
      const lgaMatch = !filterValues.lga || item.lga === filterValues.lga;
      const cityMatch = !filterValues.city || item.city === filterValues.city;

      
      return countryMatch && stateMatch && lgaMatch && cityMatch;
    });

    setFilteredItems(filtered);
    setCurrentPage(1); // Reset to first page after filtering
    setShowFilter(false);
    setIsFilterActive(true);

  }





  const clearFilter = () => {
    setFilterValues({
      country: null,
      state: null,
      lga: null,
      city: null,
    });
    setFilteredItems(aqt_data);
    setShowFilter_v2(false);
    setShowFilter(false);
    set_filter_input_values(false);
    setIsFilterActive(false);
    setCurrentPage(1);
  };

  useEffect(() => {
    clearFilter();
  }, []);


  // useEffect(() => {
  //   const timer = setTimeout(() => setLoadinglgas(false), 2000);
  //   return () => clearTimeout(timer);
  // }, []);

  const navigate = useNavigate();


  useEffect(() => {
    const timer = setTimeout(() => setLoadinglgas(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const onPageChange = (page: number) => {
    setCurrentPage(page);
  };


  useEffect(() => {
    let result = aqt_data;

    // Apply search query
    if (searchQuery) {
      result = result.filter((AQI_data) => {
        const searchLower = searchQuery.toLowerCase();
        return (
          AQI_data.country.toLowerCase().includes(searchLower) ||
          AQI_data.state.toLowerCase().includes(searchLower) ||
          AQI_data.city.toLowerCase().includes(searchLower) ||
          AQI_data.lga.toLowerCase().includes(searchLower)
        );
      });
    }

    setFilteredItems(result);
    setCurrentPage(1);
  }, [searchQuery, aqt_data]);





  const lgasPerPage = 9;

  const currentItems= filteredItems.slice(
      (currentPage - 1) * lgasPerPage,
      currentPage * lgasPerPage
  )

  // const currentItems = the_FilteredData.length >0 ? the_FilteredData.slice(
  //   (currentPage - 1) * lgasPerPage,
  //   currentPage * lgasPerPage)
  //   :
  //   filteredItems.slice(
  //     (currentPage - 1) * lgasPerPage,
  //     currentPage * lgasPerPage
  // )



 

  const handleNavigate = (item: AQIData) => {
    navigate(`/air-reading-details/${item.id}`, { state: { item } });
  };

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

            {/* <div className="flex justify-between items-center"> */}
            <div className="flex gap-x-[16px] items-center">
              <Input
                placeholder="Search for data... "
                prefix={<IoSearch size={17.5} />}
                className="h-[46px] w-[323px] bg-transparent"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />

              {/* <Button
                type="primary"
                onClick={handleUploadClick}
                className="w-[200px] h-[48px] text-[16px] font-[400] bg-BrandPrimary"
              >
                <div className="text-[16px] font-[400]">Search</div>
              </Button> */}

              <Button
                className={`h-[46px] w-[18%  ${
                  showFilter === true || isFilterActive === true
                    ? "bg-[white] border-w-[05px] border-blue-500"
                    : "bg-transparent"
                }`}
                onClick={() => {
                  setShowFilter(!showFilter);
                  setShowFilter_v2(true);
                }}
                icon={
                  <img
                    src="/funel.svg"
                    alt="image"
                    className="w-[17.5px] h-[17.5px]"
                  />
                }
              >
                Filter
              </Button>
            </div>

            <div className="mt-[16px] relative">
              {showFilter_v2 && (
                <div
                  className={`absolute  w-full h-fit z-[999] px-[25px] bg-white ${
                    showFilter === true ? "block" : "hidden"
                  }`}
                >
                  <div className="flex gap-x-[20px]  mt-[20px]">
                    <div className="lg:w-[20%] ">
                      <Select_v2
                        name="country"
                        label="Country"
                        placeholder="Select country"
                        required={false}
                        options={countryOptions}
                        value={filterValues.country || undefined}
                        onChange={(value) =>
                          handleFilterChange(value, "country")
                        }
                      />
                    </div>
                    <div className="lg:w-[20%] ">
                      <Select_v2
                        name="state"
                        label="State"
                        placeholder="Select state"
                        required={false}
                        options={stateOptions}
                        value={filterValues.state || undefined}
                        onChange={(value) => handleFilterChange(value, "state")}
                      />
                    </div>
                    <div className="lg:w-[20%] ">
                      <Select_v2
                        name="lga"
                        label="L.G.A"
                        placeholder="Select L.G.A"
                        required={false}
                        options={lgaOptions}
                        value={filterValues.lga || undefined}
                        onChange={(value) => handleFilterChange(value, "lga")}
                      />
                    </div>
                    <div className="lg:w-[20%] ">
                      <Select_v2
                        name="city"
                        label="Community"
                        required={false}
                        placeholder="Select city"
                        options={cityOptions}
                        value={filterValues.city || undefined}
                        onChange={(value) => handleFilterChange(value, "city")}
                      />
                    </div>
                  </div>

                  <Divider className="mt-[15px] mb-[10px]" />
                  <div className="flex justify-end gap-x-[16px] mb-[20px]">
                    <Button
                      className="w-[234px] h-[48px] text-[16px] font-[400] bg-transparent text-[#9B9B9B]"
                      onClick={clearFilter}
                    >
                      Cancel
                    </Button>
                    <Tooltip
                      title={isFilterActive ? "Cancel existing filter" : ""}
                    >
                      <Button
                        disabled={filter_input_values ? false : true}
                        // disabled={
                        //   isFilterActive ? true : filter_input_values ? false : true
                        // }
                        type="primary"
                        onClick={applyFilter}
                        className="w-[234px] h-[48px] text-[16px] font-[400]  bg-BrandPrimary"
                      >
                        <div className="text-[16px] font-[400]">
                          Apply Filter
                        </div>
                      </Button>
                    </Tooltip>
                  </div>
                </div>
              )}
            </div>

            {/* AIR READING POSTS>>>>>>>>>>>>>>>>>>>>>> */}

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
            ) : currentItems.length > 0 ? (
              <div className="my-[40px] grid grid-cols-1 gap-y-[30px] md:gap-[19px] md:grid-cols-2 xl:grid-cols-3">
                {currentItems.map((item) => (
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

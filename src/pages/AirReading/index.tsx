import MainLayout from "@layouts/MainLayout";
import { Button, Divider, Input, Pagination } from "antd";
import { IoSearch } from "react-icons/io5";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AQ_Card from "@components/AQ_card";
// import MapHighlights from "./map";
import Container from "@components/container";
import Donors from "@pages/home/sections/donors";
import Select_v2 from "@components/select/Select_v2";
import { AMD_type, AMD_type_v2 } from "../../types/airMonitoring";
import useAqtStore from "@store/airReading";
import { MdClear } from "react-icons/md";
import { BASE_URL } from "@api/index";
import { useQuery } from "@tanstack/react-query";
import MapHighlights from "@pages/home/sections/map";

interface SelectOption {
  value: string;
  label: string;
  key: string;
}

interface FilterValues {
  community: string | null;
  location: string | null;
}

const AirReading = () => {
  const fetch_air_reading_data = async () => {
    const response = await fetch(`${BASE_URL}/air-monitoring`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Network response was not ok");
    }

    return response.json();
  };

  const { isLoading, data } = useQuery<AMD_type>({
    queryKey: ["get_all_air_reading_data"],
    queryFn: fetch_air_reading_data,
  });

  const aqt_data = useAqtStore((state) => state.AQI_datas);
  const set_aqt_data = useAqtStore((state) => state.set_AQI_datas);

  const [filteredItems, setFilteredItems] = useState<AMD_type_v2[] | undefined>(
    []
  );
  // const [loadinglgas, setLoadinglgas] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Initial data setup
  useEffect(() => {
    set_aqt_data(data?.data);
    setFilteredItems(data?.data);
  }, []);

  // const [countryOptions, setCountryOptions] = useState<SelectOption[]>([]);
  const [communityOption, setCommunityOption] = useState<SelectOption[]>([]);
  const [locationOption, setLocationOption] = useState<SelectOption[]>([]);
  // const [cityOptions, setCityOptions] = useState<SelectOption[]>([]);

  const [isFilterActive, setIsFilterActive] = useState<boolean>(false);
  const [filter_input_values, set_filter_input_values] =
    useState<boolean>(false);
  const [showFilter, setShowFilter] = useState<boolean>(false);
  const [showFilter_v2, setShowFilter_v2] = useState<boolean>(true);
  const [filterValues, setFilterValues] = useState<FilterValues>({
    community: null,
    location: null,
  });
  const generateFilterOptions = () => {
    // First, ensure aqt_data is not undefined
    if (!aqt_data) return;

    // Process the data with a proper type
    const processedData = aqt_data.map((data) => ({
      ...data,
      community: data.serial_number,
      location: data.location,
    }));

    // Create a type-safe unique options generator
    const uniqueOptions = <K extends keyof (typeof processedData)[number]>(
      field: K
    ) => {
      return Array.from(new Set(processedData.map((item) => item[field]))).map(
        (value, index) => ({
          value: value as string,
          label: value as string,
          key: index.toString(),
        })
      );
    };

    setCommunityOption(uniqueOptions("community"));
    setLocationOption(uniqueOptions("location"));
  };

  useEffect(() => {
    if (showFilter) {
      generateFilterOptions();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showFilter, filteredItems]);

  // useEffect(() => {
  //   if (showFilter) {
  //     generateFilterOptions();
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [showFilter, aqt_data]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleFilterChange = (value: any, field: keyof FilterValues) => {
    set_filter_input_values(true);
    setFilterValues((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const applyFilter = () => {
    const filtered = aqt_data?.filter((item) => {
      const communityMatch =
        !filterValues.community ||
        item.serial_number === filterValues.community;
      const locationMatch =
        !filterValues.location || item.location === filterValues.location;

      return communityMatch && locationMatch;
    });

    setFilteredItems(filtered);
    setCurrentPage(1); // Reset to first page after filtering
    setShowFilter(false);
    setIsFilterActive(true);
  };

  const clearFilter = () => {
    setFilterValues({
      community: null,
      location: null,
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

  // useEffect(() => {
  //   const timer = setTimeout(() => setLoadinglgas(false), 2000);
  //   return () => clearTimeout(timer);
  // }, []);

  const onPageChange = (page: number) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    let result = aqt_data;

    // Apply search query
    if (searchQuery) {
      result = result?.filter((AQI_data) => {
        const searchLower = searchQuery.toLowerCase();
        return (
          AQI_data.location.toLowerCase().includes(searchLower) ||
          AQI_data.serial_number.toLowerCase().includes(searchLower)
        );
      });
    }

    setFilteredItems(result);
    setCurrentPage(1);
  }, [searchQuery, aqt_data]);

  const dataPerPage = 9;

  // const currentItems = aqt_data?.slice(
  //   (currentPage - 1) * dataPerPage,
  //   currentPage * dataPerPage
  // );
  const currentItems = filteredItems?.slice(
    (currentPage - 1) * dataPerPage,
    currentPage * dataPerPage
  );

  // const currentItems = the_FilteredData.length >0 ? the_FilteredData.slice(
  //   (currentPage - 1) * dataPerPage,
  //   currentPage * dataPerPage)
  //   :
  //   filteredItems.slice(
  //     (currentPage - 1) * dataPerPage,
  //     currentPage * dataPerPage
  // )

  const handleNavigate = (item: AMD_type_v2) => {
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
              <div className="relative">
                <Input
                  placeholder="Search for data... "
                  prefix={<IoSearch size={17.5} />}
                  className="w-[250px] h-[46px] lg:w-[323px] bg-transparent"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                {searchQuery.length > 0 ? (
                  <div
                    className="absolute right-[5px] top-[20%] z-[500] cursor-pointer"
                    onClick={() => {
                      setSearchQuery("");
                    }}
                  >
                    <MdClear color="red" size={30} />
                  </div>
                ) : (
                  ""
                )}
              </div>

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
                  className={`shadow-md rounded-md absolute  w-full h-fit z-[999] px-[25px] bg-white ${
                    showFilter === true ? "block" : "hidden"
                  }`}
                >
                  <div className="lg:flex gap-x-[20px]  mt-[20px]">
                    {/* <div className="lg:w-[25%] ">
                      <Select_v2
                        name="country"
                        label="Country"
                        placeholder="Select country"
                        required={false}
                        options={[
                          {
                            value: "Nigeria",
                            label: "Nigeria",
                            key: "Nigeria",
                          },
                        ]}
                        // options={countryOptions}
                        value={filterValues.country || undefined}
                        onChange={(value) =>
                          handleFilterChange(value, "country")
                        }
                      />
                    </div> */}
                    <div className="lg:w-[25%] ">
                      <Select_v2
                        name="location"
                        label="Location"
                        placeholder="Select location"
                        required={false}
                        options={locationOption}
                        value={filterValues.location || undefined}
                        onChange={(value) =>
                          handleFilterChange(value, "location")
                        }
                      />
                    </div>
                    {/* <div className="lg:w-[25%] ">
                      <Select_v2
                        name="lga"
                        label="L.G.A"
                        placeholder="Select L.G.A"
                        required={false}
                        options={lgaOptions}
                        value={filterValues.lga || undefined}
                        onChange={(value) => handleFilterChange(value, "lga")}
                      />
                    </div> */}
                    <div className="lg:w-[25%] ">
                      <Select_v2
                        name="community"
                        label="Community"
                        required={false}
                        placeholder="Select city"
                        options={communityOption}
                        value={filterValues.community || undefined}
                        onChange={(value) =>
                          handleFilterChange(value, "community")
                        }
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

                    <Button
                      disabled={filter_input_values ? false : true}
                      // disabled={
                      //   isFilterActive ? true : filter_input_values ? false : true
                      // }
                      type="primary"
                      onClick={applyFilter}
                      className="w-[234px] h-[48px] text-[16px] font-[400]  bg-BrandPrimary"
                    >
                      <div className="text-[16px] font-[400]">Apply Filter</div>
                    </Button>
                  </div>
                </div>
              )}
            </div>

            {/* AIR READING POSTS>>>>>>>>>>>>>>>>>>>>>> */}

            {isLoading === true ? (
              <div className="my-[40px] grid grid-cols-3 gap-[19px]">
                {Array.from({ length: dataPerPage }).map((_, index) => (
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
            ) : currentItems?.length !== 0 ? (
              <div className="my-[40px] grid grid-cols-1 gap-y-[30px] md:gap-[19px] md:grid-cols-2 xl:grid-cols-3">
                {currentItems?.map((item) => (
                  <AQ_Card item={item} clickFN={() => handleNavigate(item)} />
                ))}
              </div>
            ) : (
              <p className="text-[14px] font-bold"> Not found</p>
            )}
            {currentItems?.length !== 0 ? (
              <Pagination
                className="my-6 flex justify-end"
                current={currentPage}
                pageSize={dataPerPage}
                total={aqt_data?.length}
                // total={AQI_datas.length}
                onChange={onPageChange}
              />
            ) : (
              ""
            )}
          </div>
        </div>
      </Container>

      {isLoading === true ? (
        ""
      ) : (
        <div className="my-[40px]">
          <MapHighlights />
        </div>
      )}

      <Container>
        <Donors />
      </Container>
    </MainLayout>
  );
};
export default AirReading;

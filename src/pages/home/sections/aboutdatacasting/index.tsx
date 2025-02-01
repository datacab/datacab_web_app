import useContentDetails from "@hooks/useContentDetails";
import { Spin } from "antd";
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { ExtractedContent } from "../../../../types/ExtractedContent";
import useAirMonitoring from "@hooks/useAirMonitoring";
// import { useEffect, useState } from "react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// Define the type of each device in AirMonitoringDetails
// interface Device {
//   id: string;
//   lat: number;
//   lon: number;
//   location: string;
// }

// Define the return type of the hook

const AboutDataCasting = () => {
  const {
    AirMonitoringDetails,
    loading: isLoading,
    numberOfStates,
  } = useAirMonitoring();
  const data = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "Data Reach",
        data: [100, 200, 300, 400, 500, 600, 400, 300, 200, 100, 300, 500], // Example data for each month
        backgroundColor: "#4165EB",
        borderRadius: 10,
        barThickness: 10,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: "Air Monitoring Activity",
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        beginAtZero: true,
        min: 0,
        max: 600,
        ticks: {
          stepSize: 100,
        },
        grid: {
          display: true,
          color: "rgba(0, 0, 0, 0.1)", // Light grid lines
        },
      },
    },
  };

  const { contentDetails, loading } = useContentDetails();
  // console.log("contentDetails", contentDetails)

  // Filter content based on title and <h3> text within the content
  // const targetH3Text = "DATA CASTING FOR BIODIVERSITY";
  const specificContent = contentDetails.find(
    (item) =>
      item.title === "About Us" 
    // &&
    //   item.content.includes(`<h2><strong>${targetH3Text}</strong></h2>`)
  );

  const extractContent = (content: string): ExtractedContent => {
    // Match <h2> tag content
    const h2Match = content?.match(/<h2[^>]*>(.*?)<\/h2>/);
    const h2Text = h2Match
      ? h2Match[1].replace(/<[^>]+>/g, "")
      : "Default Title";

    // Match all <p> tags and extract text within
    const pMatches = content?.match(/<p>(.*?)<\/p>/g);
    const pTexts = pMatches
      ? pMatches?.map((p) => p.replace(/<p>|<\/p>/g, ""))
      : [];

    return { h2Text, pTexts };
  };

  const content = specificContent && specificContent?.content;
  const extracted = extractContent(content || "");

  return (
    <section id="about" className="pt-[40px] pb-[20px] lg:py-[80px]">
      <div className="flex flex-col-reverse lg:flex-row justify-between items-center gap-[60px] lg:gap-[80px]">
        <div className="w-full lg:w-[50%] flex flex-col gap-[8px]">
          {loading ? (
            <div className="flex justify-center items-center">
              <Spin size="large" />
            </div>
          ) : specificContent ? (
            <div className="w-full  flex flex-col gap-[8px]">
              <h2
                style={{ 
                  // fontFamily: "Merriweather",
                  fontWeight: 700 }}
                className="text-[20px] lg:text-[32px] lg:leading-[38px] uppercase font-arialBlack"
              >
                {extracted.h2Text}
              </h2>

              <div className="text-[16px] lg:text-[18px] font-[500] lg:leading-[28px] flex flex-col gap-[8px]">
                {extracted.pTexts.map((text, index) => (
                  <p key={index}>{text}</p> // Render extracted p texts
                ))}
              </div>
            </div>
          ) : (
            <p>Content not available</p>
          )}
        </div>

        <div className="w-full lg:w-[50%]">
          <div className="flex justify-center  items-center w-full lg:w-[550px] h-[350px] bg-[#fff] shadow-[4px_8px_20px_5px_rgba(65,101,235,0.5)] rounded-xl relative px-8">
            {/* Bar Chart */}
            <Bar data={data} options={options} />

            <div className="w-[80px] h-[80px] lg:w-[100px] lg:h-[100px] bg-primaryColor rounded-full absolute bottom-[54px] lg:bottom-20 -right-[20px] lg:-right-[70px] shadow-brandDark flex flex-col text-brandWhite justify-center items-center">
              {isLoading ? (
                <p>loading...</p>
              ) : (
                <>
                  {" "}
                  <p
                    style={{
                      fontFamily: "Merriweather",
                      fontWeight: 700,
                    }}
                    className="text-[10px]  lg:text-[20px]"
                  >
                    {numberOfStates && numberOfStates}
                  </p>
                  <p className="text-[12px] lg:text-[14px]">States</p>
                  <p className="text-[12px] lg:text-[14px]">Reached</p>
                </>
              )}
            </div>
            <div className="w-[90px] h-[90px] lg:w-[120px] lg:h-[120px] bg-primaryColor rounded-full absolute -bottom-10 lg:-bottom-20 -right-[20px] lg:-right-[40px] shadow-brandDark  flex flex-col text-brandWhite justify-center items-center">
              {isLoading ? (
                <p>loading...</p>
              ) : (
                <>
                  <p
                    style={{
                      fontFamily: "Merriweather",
                      fontWeight: 700,
                    }}
                    className="text-[12px] lg:text-[24px]"
                  >
                    {isLoading ? (
                      <p>loading...</p>
                    ) : (
                      AirMonitoringDetails && AirMonitoringDetails?.length
                    )}
                  </p>
                  <p className="text-[12px] lg:text-[14px]">Communities</p>
                  <p className="text-[12px] lg:text-[14px]">Reached</p>
                </>
              )}
            </div>
            <div className="w-[100px] h-[100px] lg:w-[140px] lg:h-[140px] bg-primaryColor rounded-full absolute -bottom-20 lg:-bottom-40 right-[60px] shadow-md shadow-brandDark flex flex-col text-brandWhite justify-center items-center">
              {isLoading ? (
                <p>loading...</p>
              ) : (
                <>
                  {" "}
                  <p
                    style={{
                      fontFamily: "Merriweather",
                      fontWeight: 700,
                    }}
                    className="text-[16px] lg:text-[32px]"
                  >
                    {AirMonitoringDetails && AirMonitoringDetails?.length}
                  </p>
                  <p className="text-[12px] lg:text-[14px]">Devices</p>
                  <p className="text-[12px] lg:text-[14px]">Deployed</p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutDataCasting;

import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const AboutDataCasting = () => {
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
        text: 'Air Monitoring Activity',
        
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

  return (
    <div id="about" className="pt-[40px] pb-[20px] lg:py-[80px]">
      <div className="flex flex-col-reverse lg:flex-row justify-between items-center gap-[60px] lg:gap-[80px]">
        <div className="w-full lg:w-[50%] flex flex-col gap-[8px]">
          <h2
            style={{
              fontFamily: "Merriweather",
              fontWeight: 700,
            }}
            className="text-[20px] lg:text-[32px] lg:w-[379px] lg:leading-[38px]"
          >
            About the Data Casting Biodiversity Initiative
          </h2>
          <h3 className="text-[16px] lg:text-[18px] font-[500] lg:leading-[28px]">
            The DATACAB Initiative uses the Internet of things (IOT) and Data
            analytics simplification tools to reinforce the capacity of CSOs,
            Newsrooms, and communities to use open source data, citizen science
            tools, and locally led climate adaptation strategies in rural and
            urban communities in Nigeria.
            <br />
            <br />
            The initiative is focused on building the capacity of civil society
            organizations, community-based groups, environmental monitors, media
            reporters, to use and incorporate data analysis for environmental
            monitoring, incident documentation, reporting, awareness and
            advocacy. The Initiative looks to democratise the use of citizen
            science data for qualitative and quantitative campaigns and
            engagements with stakeholders within Nigeria and across the world.
          </h3>
        </div>

        <div className="w-full lg:w-[50%]">
          <div className="flex justify-center  items-center w-full lg:w-[550px] h-[350px] bg-[#fff] shadow-[4px_8px_20px_5px_rgba(65,101,235,0.5)] rounded-xl relative px-8">
            {/* Bar Chart */}
            <Bar data={data} options={options} />

            <div className="w-[80px] h-[80px] lg:w-[100px] lg:h-[100px] bg-primaryColor rounded-full absolute bottom-[54px] lg:bottom-20 -right-[20px] lg:-right-[70px] shadow-brandDark flex flex-col text-brandWhite justify-center items-center">
              <p
                style={{
                  fontFamily: "Merriweather",
                  fontWeight: 700,
                }}
                className="text-[10px]  lg:text-[20px]"
              >
                7
              </p>
              <p className="text-[12px] lg:text-[14px]">States</p>
              <p className="text-[12px] lg:text-[14px]">Reached</p>
            </div>
            <div className="w-[90px] h-[90px] lg:w-[120px] lg:h-[120px] bg-primaryColor rounded-full absolute -bottom-10 lg:-bottom-20 -right-[20px] lg:-right-[40px] shadow-brandDark  flex flex-col text-brandWhite justify-center items-center">
              <p
                style={{
                  fontFamily: "Merriweather",
                  fontWeight: 700,
                }}
                className="text-[12px] lg:text-[24px]"
              >
                40
              </p>
              <p className="text-[12px] lg:text-[14px]">Communities</p>
              <p className="text-[12px] lg:text-[14px]">Reached</p>
            </div>
            <div className="w-[100px] h-[100px] lg:w-[140px] lg:h-[140px] bg-primaryColor rounded-full absolute -bottom-20 lg:-bottom-40 right-[60px] shadow-md shadow-brandDark flex flex-col text-brandWhite justify-center items-center">
              <p
                style={{
                  fontFamily: "Merriweather",
                  fontWeight: 700,
                }}
                className="text-[16px] lg:text-[32px]"
              >
                34
              </p>
              <p className="text-[12px] lg:text-[14px]">Devices</p>
              <p className="text-[12px] lg:text-[14px]">Deployed</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutDataCasting;

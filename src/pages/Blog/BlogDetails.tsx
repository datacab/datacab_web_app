import { useParams } from "react-router-dom";
import MainLayout from "@layouts/MainLayout";
import { Typography } from "antd";
import { IoCalendarOutline } from "react-icons/io5";
import { useLocation, useNavigate } from "react-router-dom";
import useBlog from "@hooks/useBlog";
import moment from "moment";

interface BlogData {
  id: string;
  title: string;
  content: string;
  image: string;
  updatedAt: string;
}

const BlogDetails = () => {
  const { blogID } = useParams<{ blogID: string }>(); // specify blogID param type
  const { blogDetails: blogs, loading } = useBlog(); // assuming blogs is BlogData[]
  const navigate = useNavigate();
  const location = useLocation();
  const { item } = location.state || {};


  const formattedDate = (value: string) => {
    const formattedDate_v1 = moment(value).format("YYYY-MM-DD");
    return formattedDate_v1;
  };


  const getRandomItems = (array: BlogData[], count: number): BlogData[] => {
    return array
      .sort(() => Math.random() - 0.5) // Shuffle array
      .slice(0, count); // Take first 'count' items
  };

  const randomItems = getRandomItems(blogs as BlogData[], 3).filter(
    (item: BlogData) => item.id !== blogID
  );

  const handleNavigate = (item: BlogData) => {
    navigate(`/blog-details/${item.id}`, { state: { item } });
  };

  const { Title, Paragraph } = Typography;

  return (
    <MainLayout>
      <div className="flex justify-center mt-[60px]">
        <div className="w-[90%] md:flex md:gap-x-[20px] xl:gap-x-[40px] mb-[150px] md:mb-[280px]">
          <div className="w-full md:w-[70%]">
            {item && (
              <div key={item.id} className="w-full">
                <div className="w-full h-[400px] rounded-md mb-[16.5px]">
                  <img
                    src={item.image}
                    alt="uploaded image"
                    className="w-full h-[400px] rounded-[14px] object-cover"
                  />
                </div>
                <div className="flex items-center gap-x-[5px]">
                  <IoCalendarOutline size={17.5} color="#757575" />
                  <div className="text-[#757575] text-[12px]">
                    {formattedDate(item.updatedAt)}
                  </div>
                </div>
                <Title
                  style={{
                    color: "#2C2C2C",
                  }}
                  ellipsis={{ rows: 1, expandable: false }}
                  level={4}
                >
                  {item.title}
                </Title>
                <div
                  style={{
                    color: "#757575",
                  }}
                  className="text-[14px]"
                  dangerouslySetInnerHTML={{ __html: item.content }}
                />
              </div>
            )}
          </div>
          <div className="w-full md:w-[30%]">
            <div className="text-[24px] font-[700] mb-[24px] mt-[50px] md:mt-[unset]">
              You May Also Like
            </div>

            {loading ? (
              <div className="grid grid-cols-1 gap-[19px]">
                {Array.from({ length: 3 }).map((_, index) => (
                  <div
                    key={index}
                    className="relative w-full h-[214px] flex flex-col gap-2"
                  >
                    <div className="absolute top-4 right-4 bg-gray-200 animate-pulse w-[26px] h-[26px] rounded-full"></div>
                    <div className="w-full h-[214px] bg-gray-200 animate-pulse rounded-[14px]"></div>
                  </div>
                ))}
              </div>
            ) : randomItems.length > 0 ? (
              <div className="grid grid-cols-1 gap-y-[30px]">
                {randomItems.map((item: BlogData) => (
                  <div
                    key={item.id}
                    className="w-full cursor-pointer"
                    onClick={() => handleNavigate(item)}
                  >
                    <div className="w-full h-[214px] rounded-md mb-[16.5px]">
                      <img
                        src={item.image}
                        alt="uploaded image"
                        className="w-full h-[214px] rounded-[14px] object-cover"
                      />
                    </div>
                    <div className="flex items-center gap-x-[5px]">
                      <IoCalendarOutline size={17.5} color="#757575" />
                      <div className="text-[#757575] text-[12px]">
                        {formattedDate(item.updatedAt)}
                      </div>
                    </div>
                    <Title
                      style={{
                        color: "#2C2C2C",
                      }}
                      ellipsis={{ rows: 1, expandable: false }}
                      level={4}
                    >
                      {item.title}
                    </Title>
                    <Paragraph
                      style={{
                        color: "#757575",
                      }}
                      ellipsis={{ rows: 2, expandable: false }}
                    >
                      {item.content.replace(/<[^>]*>/g, "")}
                    </Paragraph>
                    <div className="flex items-center gap-x-[15px]">
                      <div className="text-[14px] text-[#1D48E7]">Read more</div>
                      <img src="/arrowRightUp.svg" alt="arrow right up" />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p>NOTHING HERE FOR NOW</p>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default BlogDetails;

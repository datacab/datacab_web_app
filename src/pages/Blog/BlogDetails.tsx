import { useParams } from "react-router-dom";
import MainLayout from "@layouts/MainLayout";
import { Typography } from "antd";
import { useEffect, useState } from "react";
import { IoCalendarOutline } from "react-icons/io5";
import { useLocation, useNavigate } from "react-router-dom";

interface BlogData {
  id: string;
  title: string;
  content: string;
  image: string;
  updatedAt: string;
}

const blogs: BlogData[] = [
  {
    id: "0",
    title: "How to Start a Blog (I Got 200+ Million Visitors)",
    content:
      "I should be dead.I was born with a fatal disease called Spinal Muscular Atrophy (SMA). I’m in a wheelchair, and I can’t move anything but my face.But I’m not dead. On the contrary, I’ve traveled all over the world and become a multimillionaire. Over 200 million people have read my work.How is that possible?I write with a speech dictation software called Dragon NaturallySpeaking. I also have a mouse I operate with my lips.With this set up, I’ve been blogging for 15 years.To make money, I sell books and courses. I have over 60,000 customers.And I’m freakishly good at what I do.",
    image: "/blogImage.png",
    updatedAt: `25 June. 2024`,
  },
];

for (let i = 1; i < 30; i++) {
  blogs.push({
    id: `${i}`,
    title: `Africa Internet Governance Forum Abuja ${i}`,
    content:
      "Identifying the Challenges of Digital Exclusion in Africa, innovations, recommendations and the Identifying the Challenges of Digital Exclusion in Africa, innovations, recommendations and the",
    image: "/blogImage.png",
    updatedAt: `${i} Sept. 2024`,
  });
}

const BlogDetails = () => {
  const { blogID } = useParams();

  const getRandomItems = (array: BlogData[], count: number) => {
    return array
      .sort(() => Math.random() - 0.5) // Shuffle array
      .slice(0, count); // Take first 'count' items
  };

  const randomItems = getRandomItems(blogs, 3).filter(
    (item) => item.id !== blogID
  );

  const navigate = useNavigate();
  const [loadingImages, setLoadingImages] = useState<boolean>(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoadingImages(false), 2000);

    // Cleanup the timer when the component unmounts
    return () => clearTimeout(timer);
  }, []);

  const handleNavigate = (item: BlogData) => {
    navigate(`/blog-details/${item.id}`, { state: { item } });
  };

  const location = useLocation();
  const { item } = location.state || {};

  const { Title, Paragraph } = Typography;

  return (
    <MainLayout>
      <div className="flex justify-center mt-[60px]">
        <div className="w-[90%] md:flex md:gap-x-[20px] xl:gap-x-[40px] mb-[150px] md:mb-[280px]">
          <div className="w-full md:w-[70%]">
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
                  {item.updatedAt}
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
                {item.content}
              </Paragraph>
            </div>
          </div>
          <div className="w-full md:w-[30%]">
            <div className="text-[24px] font-[700] mb-[24px] mt-[50px] md:mt-[unset]">
              You May Also Like
            </div>

            {loadingImages === true ? (
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
              <div className="grid grid-cols-1 gap-y-[30px] ">
                {randomItems.map((item) => (
                  <div
                    key={item.id}
                    className="w-full  cursor-pointer"
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
                        {item.updatedAt}
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
                      {item.content}
                    </Paragraph>
                    <div className="flex items-center gap-x-[15px]">
                      <div className="text-[14px] text-[#1D48E7]">
                        Read more
                      </div>
                      <img src="/arrowRightUp.svg" alt="arrow right up" />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p> NOTHING HERE FOR NOW</p>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default BlogDetails;

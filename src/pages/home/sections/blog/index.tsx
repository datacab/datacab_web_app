import BlogCard from "@components/blogCard";
import { useEffect, useState } from "react";
import { IoIosArrowRoundForward } from "react-icons/io";
import { useNavigate } from "react-router-dom";
interface BlogData {
  id: string;
  title: string;
  content: string;
  image: string;
  updatedAt: string;
}

const EnvironmentalBlog = () => {
  const navigate = useNavigate();
  const [loadingImages, setLoadingImages] = useState<boolean>(true);
  useEffect(() => {
    const timer = setTimeout(() => setLoadingImages(false), 2000);

    // Cleanup the timer when the component unmounts
    return () => clearTimeout(timer);
  }, []);

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

  for (let i = 1; i < 3; i++) {
    blogs.push({
      id: `${i}`,
      title: `Africa Internet Governance Forum Abuja ${i}`,
      content:
        "Identifying the Challenges of Digital Exclusion in Africa, innovations, recommendations and the Identifying the Challenges of Digital Exclusion in Africa, innovations, recommendations and the",
      image: "/blogImage.png",
      updatedAt: `${i} Sept. 2024`,
    });
  }

  const handleNavigate = (item: BlogData) => {
    navigate(`/blog-details/${item.id}`, { state: { item } });
  };
  
  const HandleSeeAll = () => {
    navigate(`/blog`);
  };

  return (
    <div className=" pt-[40px] lg:pb-[40px] lg:pt-[80px]">
      <div className="flex items-center justify-between">
        <h2
          style={{
            fontFamily: "Merriweather",
            fontWeight: 700,
          }}
          className="text-[20px] lg:text-[32px]  lg:leading-[38px] "
        >
          Environmental Blog
        </h2>
        <p
          onClick={HandleSeeAll}
          className="flex items-center gap-2 text-[12px] lg:text-[16px] font-[600] cursor-pointer"
        >
          See all
          <IoIosArrowRoundForward />
        </p>
      </div>
      <div>
        {loadingImages === true ? (
          <div className="my-[40px] grid grid-cols-3 gap-[19px]">
            {Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className="relative w-full h-[180px] flex flex-col gap-2"
              >
                {/* Delete icon skeleton */}
                <div className="absolute top-4 right-4 bg-gray-200 animate-pulse w-[26px] h-[26px] rounded-full"></div>

                {/* Image skeleton */}
                <div className="w-full h-[180px] bg-gray-200 animate-pulse rounded-[14px]"></div>
              </div>
            ))}
          </div>
        ) : blogs.length > 0 ? (
          <div className="my-[40px] grid grid-cols-1 gap-y-[30px] md:gap-[19px] md:grid-cols-2 xl:grid-cols-3">
            {blogs.map((item) => (
              <BlogCard item={item} clickFN={() => handleNavigate(item)} />
            ))}
          </div>
        ) : (
          <p> NOTHING HERE FOR NOW</p>
        )}
      </div>
    </div>
  );
};

export default EnvironmentalBlog;

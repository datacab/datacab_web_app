import BlogCard from "@components/blogCard";
import useBlog from "@hooks/useBlog";
import { IoIosArrowRoundForward } from "react-icons/io";
import { useNavigate } from "react-router-dom";

interface BlogData {
  id: string;
  title: string;
  content: string;
  image?: string;
  updatedAt?: string;
}

const EnvironmentalBlog = () => {
  const { blogDetails, loading } = useBlog();
  const navigate = useNavigate();

  const handleNavigate = (item: BlogData) => {
    navigate(`/blog-details/${item.id}`, { state: { item } });
  };

  const HandleSeeAll = () => {
    navigate(`/blog`);
  };

  return (
    <div className="pt-[40px] lg:pb-[40px] lg:pt-[80px]">
      <div className="flex items-center justify-between">
        <h2
          style={{
            fontFamily: "Merriweather",
            fontWeight: 700,
          }}
          className="text-[20px] lg:text-[32px] lg:leading-[38px]"
        >
          Environmental Blog
        </h2>
        {blogDetails && blogDetails.length > 0 && (
          <p
            onClick={HandleSeeAll}
            className="flex items-center gap-2 text-[12px] lg:text-[16px] font-[600] cursor-pointer"
          >
            See all
            <IoIosArrowRoundForward />
          </p>
        )}
      </div>
      <div>
        {loading ? (
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
        ) : blogDetails && blogDetails.length > 0 ? (
          <div className="my-[40px] grid grid-cols-1 gap-y-[30px] md:gap-[19px] md:grid-cols-2 xl:grid-cols-3">
            {blogDetails.slice(0, 3).map((detail) => (
              <BlogCard
                key={(detail as BlogData).id}
                item={
                  {
                    ...detail,
                    content: detail.content.replace(/<[^>]*>/g, ""), // Strip HTML tags
                  } as BlogData
                }
                clickFN={() => handleNavigate(detail as BlogData)}
              />
            ))}
          </div>
        ) : (
          <p className="text-[14px] text-center text-red-500">Content not available</p>
        )}
      </div>
    </div>
  );
};

export default EnvironmentalBlog;

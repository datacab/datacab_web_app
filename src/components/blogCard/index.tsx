import { Typography } from "antd";
import { IoCalendarOutline } from "react-icons/io5";

interface BlogData {
  id: string;
  title: string;
  content: string;
  image: string;
  updatedAt: string;
}

interface props {
  item: BlogData;
  clickFN: (item: BlogData) => void;
}
const BlogCard = ({ item, clickFN }: props) => {
  const { Title, Paragraph } = Typography;
  return (
    <div
      key={item.id}
      className="w-full   cursor-pointer"
      onClick={() => clickFN(item)}
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
        <div className="text-[#757575] text-[12px]">{item.updatedAt}</div>
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
        <div className="font-[14px] text-[#1D48E7]">Read more</div>
        <img src="/arrowRightUp.svg" alt="arrow right up" />
      </div>
    </div>
  );
};

export default BlogCard;

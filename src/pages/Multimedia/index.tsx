import Container from "@components/container";
import MainLayout from "@layouts/MainLayout";
import { Pagination } from "antd";
import { useEffect, useState } from "react";
import { IoIosCloseCircleOutline } from "react-icons/io";

interface MultimediaData {
  id: string;
  image: string;
  image2: string;
}

const multimedia: MultimediaData[] = Array.from({ length: 36 }, (_, i) => ({
  id: `${i}`,
  image: "/datamultimg.png",
  image2: "/img2.png",
}));

interface ModalProps {
  isOpen: boolean;
  image: string;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, image, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
      <img src={image} alt="" className="max-w-full max-h-[80vh] rounded-lg" />
      <button
        className="absolute top-10 right-10 text-white text-2xl"
        onClick={onClose}
      >
        <IoIosCloseCircleOutline size={24} />
      </button>
    </div>
  );
};

const Multimedia = () => {
  const [loadingImages, setLoadingImages] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");

  const imagesPerPage = 12;

  useEffect(() => {
    const timer = setTimeout(() => setLoadingImages(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const onPageChange = (page: number) => {
    setCurrentPage(page);
  };

  const currentMultimedia = multimedia.slice(
    (currentPage - 1) * imagesPerPage,
    currentPage * imagesPerPage
  );

  const handleImageClick = (src: string) => {
    setSelectedImage(src);
    setModalOpen(true);
  };

  const renderImages = (startIndex: number, endIndex: number) => (
    <div className="flex gap-[10px] lg:gap-[20px]">
      {currentMultimedia.slice(startIndex, endIndex).map((item) => (
        <div className="mt-[15px] lg:mt-[30px] lg:w-[50%]" key={item.id}>
          <img
            src={item.image}
            alt=""
            className="cursor-pointer"
            onClick={() => handleImageClick(item.image)}
          />
        </div>
      ))}
    </div>
  );

  return (
    <MainLayout>
      <Container>
        <div className="flex justify-center mt-[60px]">
          <div className="w-[100%] ">
            <h1 className="font-[700] text-[32px] text-[#2C2C2C]">
              Multimedia
            </h1>
            <p className="my-[16px] text-[#757575] text-[18px] font-[500] md:w-[50%] ">
              We simplify environmental incident data into clear infographics,
              fostering grassroots participation in environmental protection.
            </p>

            {/* Image loading or display section */}
            {loadingImages ? (
              <div className="my-[40px] grid grid-cols-3 gap-[19px]">
                {Array.from({ length: 6 }).map((_, index) => (
                  <div
                    key={index}
                    className="relative w-full h-[180px] flex flex-col gap-2"
                  >
                    <div className="absolute top-4 right-4 bg-gray-200 animate-pulse w-[26px] h-[26px] rounded-full"></div>
                    <div className="w-full h-[180px] bg-gray-200 animate-pulse rounded-[14px]"></div>
                  </div>
                ))}
              </div>
            ) : currentMultimedia.length > 0 ? (
              <div className="mb-[40px] ">
                {renderImages(0, 2)}
                {renderImages(2, 6)}
                {renderImages(6, 8)}
                {renderImages(8, 12)}
              </div>
            ) : (
              <p>NOTHING HERE FOR NOW</p>
            )}

            {/* Pagination */}
            <Pagination
              className="my-6 flex justify-end"
              current={currentPage}
              pageSize={imagesPerPage}
              total={multimedia.length}
              onChange={onPageChange}
            />
          </div>

          {/* Modal for displaying the selected image */}
          <Modal
            isOpen={isModalOpen}
            image={selectedImage}
            onClose={() => setModalOpen(false)}
          />
        </div>
      </Container>
    </MainLayout>
  );
};

export default Multimedia;

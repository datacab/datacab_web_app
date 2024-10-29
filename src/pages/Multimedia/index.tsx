import Container from "@components/container";
import useMultimedia from "@hooks/useMultimedia";
import MainLayout from "@layouts/MainLayout";
import { Pagination } from "antd";
import { useState } from "react";
import { IoIosCloseCircleOutline } from "react-icons/io";

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
  const { multimediaDetails, loading } = useMultimedia();
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");

  const imagesPerPage = 16;

  const onPageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleImageClick = (src: string) => {
    setSelectedImage(src);
    setModalOpen(true);
  };

  const renderImages = (startIndex: number, endIndex: number) => (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
      {multimediaDetails.slice(startIndex, endIndex).map((item) => (
        <div
          className="rounded-[10px] overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
          key={item.id}
        >
          <img
            src={item.media}
            alt="multimedia-image"
            className="cursor-pointer w-full h-[214px] rounded-[10px] object-cover transition-transform duration-200 hover:scale-105"
            onClick={() =>
              handleImageClick(
                item.media ||
                  "https://res.cloudinary.com/dxoalsdsh/image/upload/v1728349839/DataCab/Multimedia/rzmuennv5uwf6juiw3ff.png"
              )
            }
          />
        </div>
      ))}
    </div>
  );

  const startIndex = (currentPage - 1) * imagesPerPage;
  const endIndex = Math.min(
    startIndex + imagesPerPage,
    multimediaDetails.length
  );

  return (
    <MainLayout>
      <Container>
        <div className="flex justify-center mt-[60px]">
          <div className="w-[100%]">
            <h1 className="font-[700] text-[32px] text-[#2C2C2C]">
              Multimedia
            </h1>
            <p className="my-[16px] text-[#757575] text-[18px] font-[500] md:w-[50%] ">
              We simplify environmental incident data into clear infographics,
              fostering grassroots participation in environmental protection.
            </p>

            {loading ? (
              <div className="my-[40px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[19px]">
                {Array.from({ length: imagesPerPage }).map((_, index) => (
                  <div
                    key={index}
                    className="relative w-full h-[180px] flex flex-col gap-2"
                  >
                    <div className="absolute top-4 right-4 bg-gray-200 animate-pulse w-[26px] h-[26px] rounded-full"></div>
                    <div className="w-full h-[180px] bg-gray-200 animate-pulse rounded-[14px]"></div>
                  </div>
                ))}
              </div>
            ) : multimediaDetails.length > 0 ? (
              <div className="mb-[40px]">
                {renderImages(startIndex, endIndex)}
              </div>
            ) : (
              <p>Content not available</p>
            )}

            <Pagination
              className="my-6 flex justify-end"
              current={currentPage}
              pageSize={imagesPerPage}
              total={multimediaDetails.length}
              onChange={onPageChange}
            />
          </div>

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

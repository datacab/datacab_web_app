import useMultimedia from "@hooks/useMultimedia";
import { useState } from "react";
import {
  IoIosArrowRoundForward,
  IoIosCloseCircleOutline,
} from "react-icons/io";
import { useNavigate } from "react-router-dom";

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
  const nav = useNavigate();
  const { multimediaDetails, loading } = useMultimedia();
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");

  const imagesPerPage = 8;
  const currentPage = 1;

  const handleImageClick = (src: string) => {
    setSelectedImage(src);
    setModalOpen(true);
  };


  const renderImages = (startIndex: number, endIndex: number) => (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
      {multimediaDetails.slice(startIndex, endIndex).map((item) => (
        <div
          className="relative rounded-[10px] overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 group"
          key={item.id}
        >
          {/* Image */}
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
  
          {/* Overlay with title on hover */}
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-60 text-white text-[14px] font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
            {item.title}
          </div>
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
    <div className="pt-[0px] pb-[40px] lg:pb-[80px]">
      <div className="flex items-center justify-between">
        <h2
          style={{
            fontFamily: "Merriweather",
            fontWeight: 700,
          }}
          className="text-[20px] lg:text-[32px] lg:leading-[38px]"
        >
          Multimedia
        </h2>

        {multimediaDetails.length > 0 && (
          <button
            onClick={() => nav("/multimedia")}
            className="flex items-center gap-2 text-[12px] lg:text-[16px] font-[600] cursor-pointer"
          >
            See all
            <IoIosArrowRoundForward />
          </button>
        )}
      </div>

      {loading ? (
        <div className="my-[40px] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[19px]">
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
      ) : multimediaDetails.length > 0 ? (
        <div className="my-[40px]">{renderImages(startIndex, endIndex)}</div>
      ) : (
        <p className="text-[14px] text-center text-red-500">Content not available</p>
      )}

      <Modal
        isOpen={isModalOpen}
        image={selectedImage}
        onClose={() => setModalOpen(false)}
      />
    </div>
  );
};

export default Multimedia;

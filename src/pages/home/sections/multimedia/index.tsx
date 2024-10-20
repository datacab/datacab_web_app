import { useState } from "react";
import {
  IoIosArrowRoundForward,
  IoIosCloseCircleOutline,
} from "react-icons/io";

// Define props for the Modal component
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
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");

  const handleImageClick = (src: string) => {
    setSelectedImage(src);
    setModalOpen(true);
  };

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
        <p className="flex items-center gap-2 text-[12px] lg:text-[16px] font-[600] cursor-pointer">
          See all
          <IoIosArrowRoundForward />
        </p>
      </div>
      <div>
        <div className="flex gap-[10px] lg:gap-[20px]">
          <div className="mt-[15px] lg:mt-[30px] lg:w-[50%]">
            <img
              src="/datamultimg.png"
              alt=""
              className="cursor-pointer"
              onClick={() => handleImageClick("/datamultimg.png")}
            />
          </div>
          <div className="flex lg:w-[50%] gap-[10px] lg:gap-[20px]">
            <div className="mt-[15px] lg:mt-[30px]">
              <img
                src="/img2.png"
                alt=""
                className="cursor-pointer"
                onClick={() => handleImageClick("/img2.png")}
              />
            </div>
            <div className="mt-[15px] lg:mt-[30px]">
              <img
                src="/img2.png"
                alt=""
                className="cursor-pointer"
                onClick={() => handleImageClick("/img2.png")}
              />
            </div>
          </div>
        </div>
        <div className="flex gap-[10px] lg:gap-[20px]">
          <div className="flex lg:w-[50%] gap-[10px] lg:gap-[20px]">
            <div className="mt-[15px] lg:mt-[30px]">
              <img
                src="/img2.png"
                alt=""
                className="cursor-pointer"
                onClick={() => handleImageClick("/img2.png")}
              />
            </div>
            <div className="mt-[15px] lg:mt-[30px]">
              <img
                src="/img2.png"
                alt=""
                className="cursor-pointer"
                onClick={() => handleImageClick("/img2.png")}
              />
            </div>
          </div>
          <div className="mt-[15px] lg:mt-[30px] lg:w-[50%]">
            <img
              src="/datamultimg.png"
              alt=""
              className="cursor-pointer"
              onClick={() => handleImageClick("/datamultimg.png")}
            />
          </div>
        </div>
      </div>

      {/* Modal for displaying the selected image */}
      <Modal
        isOpen={isModalOpen}
        image={selectedImage}
        onClose={() => setModalOpen(false)}
      />
    </div>
  );
};

export default Multimedia;

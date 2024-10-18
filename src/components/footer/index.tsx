import { FiFacebook, FiLinkedin, FiYoutube } from "react-icons/fi";
import {
  MdMailOutline,
  MdOutlineLocationOn,
  MdOutlinePhone,
} from "react-icons/md";
import { RiTwitterXFill } from "react-icons/ri";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="flex flex-col  shadow-sm bg-brandGray ">
      <div className="w-[90%] mx-auto py-[20px] lg:py-[40px] flex flex-col gap-[20px] lg:flex-row justify-between items-start ">
        <Link to="/" className="flex items-center z-[100] ">
          <img
            src="/datacablogotwo.svg"
            alt="logo"
            className="w-[150px] lg:w-auto "
          />
        </Link>

        <div className="flex flex-col lg:flex-row gap-[20px] lg:gap-[64px]">
          <div className="flex flex-col gap-[8px]">
            <label
              htmlFor="quick_links"
              className="text-[16px] text-brandDark font-[700]"
            >
              Quick Links
            </label>
            <ul className="text-brandDark text-[16px] flex flex-col gap-[8px]">
              <Link to="#about">
                <li className="cursor-pointer">About</li>
              </Link>
              <Link to="/multimedia">
                <li className="cursor-pointer">Multimedia</li>
              </Link>
              <Link to="/blog">
                <li className="cursor-pointer">Blog</li>
              </Link>
              <Link to="/air-reading">
                <li className="cursor-pointer">Oil Spillage</li>
              </Link>
              <Link to="/air-reading">
                <li className="cursor-pointer">Air Monitoring</li>
              </Link>
            </ul>
          </div>
          <div className="flex flex-col gap-[8px]">
            <label
              htmlFor="quick_links"
              className="text-[16px] text-brandDark font-[700]"
            >
              Media Awareness and Justice Initiative (MAJI)
            </label>
            <ul className="text-brandDark text-[16px]  flex flex-col gap-[8px]">
              <li className="flex items-start gap-[8px]">
                <MdMailOutline size={24} />
                <div className="flex flex-col gap-[4px]">
                  <p className="text-[14px] font-[600]">Email</p>
                  <p className="text-[14px] font-[500]">Support@maji.org.ng</p>
                </div>
              </li>
              <li className="flex items-start gap-[8px]">
                <MdOutlineLocationOn size={24} />
                <div className="flex flex-col gap-[4px]">
                  <p className="text-[14px] font-[600]">Address</p>
                  <p className="text-[14px] font-[500]">
                    #23 Okota Road, Lagos.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-[8px]">
                <MdOutlinePhone size={24} />
                <div className="flex flex-col gap-[4px]">
                  <p className="text-[14px] font-[600]">Phone</p>
                  <p className="text-[14px] font-[500]">+2347081036103</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-brandDark   py-[16px] bg-brandGray w-full ">
        <div className="w-[90%] mx-auto flex flex-col gap-[14px] lg:gap-0 lg:flex-row justify-between ">
          <p className="text-[16px] text-black">
            &copy; 2024 Datacab. All rights reserved.
          </p>

          <ul className="flex gap-[8px] items-center">
            <li className="w-[24px] h-[24px] rounded-full p-2 border border-brandDark flex items-center justify-center cursor-pointer">
              <FiFacebook size={24} />
            </li>
            <li className="w-[24px] h-[24px] rounded-full p-2 border border-brandDark flex items-center justify-center cursor-pointer">
              <FiLinkedin size={24} />
            </li>
            <li className="w-[24px] h-[24px] rounded-full p-2 border border-brandDark flex items-center justify-center cursor-pointer">
              <RiTwitterXFill size={24} />
            </li>
            <li className="w-[24px] h-[24px] rounded-full p-2 border border-brandDark flex items-center justify-center cursor-pointer">
              <FiYoutube size={24} />
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Footer;

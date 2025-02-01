import PrimaryBtn from "@components/button";
import { useState } from "react";
import { IoMdClose, IoMdMenu } from "react-icons/io";
import { Link, useLocation } from "react-router-dom";
import { NavigationTypes } from "../../types/NavigationTypes";

const navlinks: NavigationTypes[] = [
  { id: 1, title: "Home", link: "/" },
  { id: 2, title: "About", link: "/#about" },
  { id: 3, title: "Multimedia", link: "/multimedia" },
  { id: 4, title: "Blog", link: "/blog" },
];

const Nav = () => {
  const location = useLocation();
  const [open, setOpen] = useState<boolean>(false);

  const toggleMenu = () => setOpen((prev) => !prev);

  const isActive = (link: string) => {
    if (link === "/#about") {
      return location.hash === "#about";
    }
    return location.pathname === link;
  };

  const handleLinkClick = (link: string) => {
    if (link === "/#about" && location.pathname === "/") {
      const element = document.getElementById("about");
      if (element) element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="flex fixed top-0 z-[9999999] justify-between bg-white items-center w-[100%] px-4 lg:px-[80px] mx-auto py-[2rem] shadow-sm h-[14vh] ">
      <Link to="/" className="flex items-center z-[100]">
        <img src="/datalogo.png" alt="logo" className="w-[5rem] h-[5rem] md:w-[7rem] md:h-[7rem]" />
      </Link>

      <div className="lg:hidden z-[100]">
        {open ? (
          <div onClick={toggleMenu} className="cursor-pointer">
            <IoMdClose color="#000" size={24} />
          </div>
        ) : (
          <div onClick={toggleMenu} className="cursor-pointer">
            <IoMdMenu size={24} />
          </div>
        )}
      </div>

      <div className="hidden lg:flex">
        <ul className="flex gap-[20px] lg:gap-[70px] items-center">
          {navlinks.map((navlink) => (
            <li
              key={navlink.id}
              className={`md:text-[1.6rem] lg:text-[1.8rem] cursor-pointer font-[500] relative group ${
                isActive(navlink.link) ? "text-primaryColor" : "text-brandDark"
              }`}
            >
              <Link to={navlink.link} onClick={() => handleLinkClick(navlink.link)} className="relative">
                {navlink.title}
                {/* Fancy Underline */}
                <span className="absolute left-0 bottom-0 block w-0 h-[2px] bg-primaryColor transition-all duration-300 ease-in-out group-hover:w-full"></span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div
        className={`${
          open
            ? "top-0 opacity-100 transition-all duration-500 ease-in-out h-screen"
            : "max-h-0 opacity-0 transition-all duration-500 ease-in-out top-30"
        } shadow-sm pt-28 overflow-hidden flex flex-col  items-center text-center lg:hidden bg-brandWhite gap-4 absolute left-0 z-50 w-full p-6 mx-auto`}
      >
        <ul className="flex flex-col gap-[1.6rem] lg:gap-[4.8rem] items-center">
          {navlinks.map((navlink) => (
            <li
              key={navlink.id}
              className={`text-[2rem] cursor-pointer font-[500] ${
                isActive(navlink.link) ? "text-primaryColor" : ""
              }`}
            >
              <Link to={navlink.link} onClick={() => handleLinkClick(navlink.link)}>
                {navlink.title}
              </Link>
            </li>
          ))}
        </ul>
        <Link to="/air-reading">
          <PrimaryBtn className="bg-primaryColor h-[38px] lg:h-[48px] flex justify-center items-center text-brandWhite text-[1.8rem]">
            Check Air Quality
          </PrimaryBtn>
        </Link>
      </div>

      <div className="hidden lg:flex lg:items-center lg:gap-[1.6rem]">
        <Link to="/air-reading">
          <PrimaryBtn className="bg-primaryColor h-[38px] lg:h-[48px] flex justify-center items-center text-brandWhite">
            Check Air Quality
          </PrimaryBtn>
        </Link>
      </div>
    </div>
  );
};

export default Nav;

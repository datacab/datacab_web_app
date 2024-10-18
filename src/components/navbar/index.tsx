import PrimaryBtn from "@components/button";
import { useState } from "react";
import { IoMdClose, IoMdMenu } from "react-icons/io";
import { Link, useLocation } from "react-router-dom";
import { NavigationTypes } from "../../types/NavigationTypes";

const navlinks: NavigationTypes[] = [
  {
    id: 1,
    title: "Home",
    link: "/",
  },
  {
    id: 2,
    title: "About",
    link: (e: React.MouseEvent<HTMLElement>) => {
      e.preventDefault();
      document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
    },
  },
  {
    id: 3,
    title: "Multimedia",
    link: "#",
  },
  {
    id: 4,
    title: "Blog",
    link: "/blog",
  },
];

const Nav = () => {
  const location = useLocation();

  // Function to check if the link is active
  const isActive = (
    link: string | ((e: React.MouseEvent<HTMLElement>) => void)
  ) => {
    if (typeof link === "string") {
      return location.pathname.startsWith(link);
    }
    return false; // Return false for functions as they are not navigational links
  };

  const [open, setOpen] = useState<boolean>(false);
  const toggleMenu = () => {
    setOpen((prev) => !prev);
  };

  return (
    <div className="flex justify-between items-center w-[90%] mx-auto py-[1rem] shadow-sm">
      <Link to="/" className="flex items-center z-[100]">
        <img
          src="/datalogo.png"
          alt="logo"
          className="w-[4rem] h-[4rem] md:w-[7rem] md:h-[7rem]"
        />
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
              className={`md:text-[1.6rem] lg:text-[1.8rem] cursor-pointer font-[500] ${
                isActive(navlink.link) ? "text-primaryColor" : ""
              }`}
            >
              {typeof navlink.link === "function" ? (
                <button onClick={navlink.link} className="focus:outline-none">
                  {navlink.title}
                </button>
              ) : (
                <Link to={navlink.link}>{navlink.title}</Link>
              )}
            </li>
          ))}
        </ul>
      </div>

      <div
        className={`${
          open
            ? "top-0 opacity-100 transition-all duration-500 ease-in-out"
            : "max-h-0 opacity-0 transition-all duration-500 ease-in-out top-30"
        } shadow-sm pt-28 overflow-hidden flex flex-col justify-center items-center text-center lg:hidden bg-brandWhite gap-4 absolute left-0 z-50 w-full p-6 mx-auto`}
      >
        <ul className="flex flex-col gap-[1.6rem] lg:gap-[4.8rem] items-center">
          {navlinks.map((navlink) => (
            <li
              key={navlink.id}
              className={`text-[1.8rem] cursor-pointer font-[500] ${
                isActive(navlink.link) ? "text-primaryColor" : ""
              }`}
            >
              {typeof navlink.link === "function" ? (
                <button onClick={navlink.link} className="focus:outline-none">
                  {navlink.title}
                </button>
              ) : (
                <Link to={navlink.link}>{navlink.title}</Link>
              )}
            </li>
          ))}
        </ul>
        <Link to="#">
          <PrimaryBtn className="bg-primaryColor h-[38px] lg:h-[48px] flex justify-center items-center text-brandWhite">
            Check Air Quality
          </PrimaryBtn>
        </Link>
        <Link to="#">
          <PrimaryBtn className="text-brandWhite bg-brandDark h-[38px] lg:h-[48px] flex justify-center items-center">
            Check Air Spillage
          </PrimaryBtn>
        </Link>
      </div>

      <div className="hidden lg:flex lg:items-center lg:gap-[1.6rem]">
        <Link to="#">
          <PrimaryBtn className="bg-primaryColor h-[38px] lg:h-[48px] flex justify-center items-center text-brandWhite">
            Check Air Quality
          </PrimaryBtn>
        </Link>
        <Link to="#">
          <PrimaryBtn className="text-brandWhite bg-brandDark h-[38px] lg:h-[48px] flex justify-center items-center">
            Check Air Spillage
          </PrimaryBtn>
        </Link>
      </div>
    </div>
  );
};

export default Nav;

import MainLayout from "@layouts/MainLayout";
import AboutDataCasting from "./sections/aboutdatacasting";
import Hero from "./sections/hero";
import WhatWeDo from "./sections/whatwedo";
import MapHighlights from "./sections/map";
import Container from "@components/container";
import MediaAwareness from "./sections/media";
import MobileAppExperience from "./sections/app";
import EnvironmentalBlog from "./sections/blog";
import Multimedia from "./sections/multimedia";
import Donors from "./sections/donors";
import RequestData from "./sections/request";
import { useEffect } from "react";

const Home = () => {
  useEffect(() => {
    // Check if the URL has the #about hash
    if (window.location.hash === "#about") {
      const aboutSection = document.getElementById("about");
      if (aboutSection) {
        aboutSection.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, []);
  return (
    <MainLayout>
      <Hero />
      <Container>
        <AboutDataCasting />
        <WhatWeDo />
        <MapHighlights />
        <MediaAwareness />
        <MobileAppExperience />
        <EnvironmentalBlog />
        <Multimedia />
        <RequestData />
        <Donors />
      </Container>
    </MainLayout>
  );
};

export default Home;

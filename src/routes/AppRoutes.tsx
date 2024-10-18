import NotFound from "@pages/NotFound";
import React, { lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const Home = lazy(() => import("@pages/home"));
const Multimedia = lazy(() => import("@pages/Multimedia"));
const Blog = lazy(() => import("@pages/Blog"));
const AirReading = lazy(() => import("@pages/AirReading"));
const BlogDetails = lazy(() => import("@pages/Blog/BlogDetails"));

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <React.Suspense>
              {" "}
              <Home />
            </React.Suspense>
          }
        />

        <Route
          path="/multimedia"
          element={
            <React.Suspense>
              <Multimedia />
            </React.Suspense>
          }
        />
        <Route
          path="/blog"
          element={
            <React.Suspense>
              <Blog />
            </React.Suspense>
          }
        />
        <Route
          path="/blog-details/:blogID"
          element={
            <React.Suspense>
              <BlogDetails />
            </React.Suspense>
          }
        />
        <Route
          path="/air-reading"
          element={
            <React.Suspense>
              <AirReading />
            </React.Suspense>
          }
        />

        {/* 404 page */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;

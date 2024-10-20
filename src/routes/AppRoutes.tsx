import Spinner from "@components/spinner";
import NotFound from "@pages/NotFound";
import React, { lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const Home = lazy(() => import("@pages/home"));
const Multimedia = lazy(() => import("@pages/Multimedia"));
const Blog = lazy(() => import("@pages/Blog"));
const AirReading = lazy(() => import("@pages/AirReading"));
const BlogDetails = lazy(() => import("@pages/Blog/BlogDetails"));
const AirReadingDetails = lazy(() => import("@pages/AirReading/AirReadingDetails"));

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <React.Suspense fallback={<Spinner />}>
              {" "}
              <Home />
            </React.Suspense>
          }
        />

        <Route
          path="/multimedia"
          element={
            <React.Suspense fallback={<Spinner />}>
              <Multimedia />
            </React.Suspense>
          }
        />
        <Route
          path="/blog"
          element={
            <React.Suspense fallback={<Spinner />}>
              <Blog />
            </React.Suspense>
          }
        />
        <Route
          path="/blog-details/:blogID"
          element={
            <React.Suspense fallback={<Spinner />}>
              <BlogDetails />
            </React.Suspense>
          }
        />
        <Route
          path="/air-reading"
          element={
            <React.Suspense fallback={<Spinner />}>
              <AirReading />
            </React.Suspense>
          }
        />
                <Route
          path="/air-reading-details/:AQID"
          element={
            <React.Suspense fallback={<Spinner />}>
              <AirReadingDetails />
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

import React, { useEffect, useState } from "react";
import { Navbar } from "./components/common/Navbar/Navbar";
import { Body } from "./components/common/Body/Body";
import ErrorPage from "./error-page";

import { createBrowserRouter, RouterProvider, Route } from "react-router-dom";
import { VideoCreation } from "./components/common/Create/VideoCreation";
import { Formality } from "./components/common/Create/Formality";
import { Voice } from "./components/common/Create/Voice";
import { Music } from "./components/common/Create/Music";
import { Watch } from "./components/common/Video/Watch";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Body />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/vid",
    element: <VideoCreation />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/formality",
    element: <Formality />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/voice",
    element: <Voice />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/music",
    element: <Music />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/watch/:title",
    element: <Watch />,
    errorElement: <ErrorPage />,
  },
]);

function App() {
  return (
    <div className="w-full flex justify-center items-center h-full bg-myBlue">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;

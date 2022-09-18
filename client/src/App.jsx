import React, { useState } from "react";
import { Navbar } from "./components/common/Navbar/Navbar";
import { Body } from "./components/common/Body/Body";
import { GetAudio } from "./GetAudio";
import ErrorPage from "./error-page";

import {
  createBrowserRouter,
  RouterProvider,
  Route,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <GetAudio />,
    errorElement: <ErrorPage />,

  },
]);

const API_URL = process.env.REACT_APP_API_URL;
async function getSummary(text){
    const request = { text };
    const response = await fetch(`${API_URL}/summary`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(request),
      });
      return await response.json().summary;
}
  
function App() {
     // Text source: https://ugo-ii.com/products/content
  const [text, setText] = useState(
    "Employee recognition boosts morale and is the core of any great company. But, employee of the month awards are too temporary. UGO II has introduced employee of the decade awards to truly give our employees the sense that their contributions are appreciated. To ensure each employee will have a decade to be recognized in, UGO II has pre-reserved decades up to the year 32000."
  );
  const [summary, setSummary] = useState("");

  const submit = async () => {
    setSummary(await getSummary(text));

    
  };

  <RouterProvider router={router} />


  return (
    <div className="w-full h-full bg-myBlue ">
          <RouterProvider router={router} />

    </div>
  );
}


export default App;
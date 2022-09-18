import React, { useEffect, useState } from "react";
import { ref, getDownloadURL } from "firebase/storage";
import { getAudioDurationInSeconds } from "@remotion/media-utils";
import { Player } from "@remotion/player";
import { Navbar } from "./components/common/Navbar/Navbar";
import { Body } from "./components/common/Body/Body";
import ErrorPage from "./error-page";
import { storage } from "./firebase";
import { SummaryVideo } from "./remotion/SummaryVideo";
import { Summary, SummaryDetail } from "./types/summary";

import { createBrowserRouter, RouterProvider, Route } from "react-router-dom";
import { VideoCreation } from "./components/common/videoCreation/videoCreation";
import { Formality } from "./components/common/videoCreation/Formality";
import { Voice } from "./components/common/videoCreation/Voice";
import { Music } from "./components/common/videoCreation/Music";

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
]);

const API_URL = process.env.REACT_APP_API_URL;
function App() {
  const [summary, setSummary] = useState<SummaryDetail>();

  const title = "Hackathon";
  useEffect(() => {
    const effect = async () => {
      const request = { title };
      const response = await fetch(`${API_URL}/summary`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(request),
      });
      const summary: Summary = await response.json();

      setSummary(
        await Promise.all(
          summary.map(async (sentence, i) => {
            const audioSrc = await getDownloadURL(
              ref(storage, sentence.audioPath)
            );
            const durationInSeconds = await getAudioDurationInSeconds(audioSrc);
            return {
              ...sentence,
              audioSrc,
              durationInSeconds,
            };
          })
        )
      );
    };
    effect();
  }, [title]);

  const fps = 30;

  return (
    <div className="w-full flex justify-center items-center h-full bg-myBlue">
      <RouterProvider router={router} />
      {summary === undefined || (
        <Player
          className=""
          component={SummaryVideo}
          inputProps={{ titleText: title, titleColor: "black", summary }}
          durationInFrames={summary
            .map((s) => Math.ceil(s.durationInSeconds * fps))
            .reduce((a, b) => a + b)}
          compositionWidth={1080}
          compositionHeight={1920}
          fps={fps}
          style={{
            width: 360,
            height: 640,
          }}
          controls
        />
      )}
    </div>
  );
}

export default App;

import React from "react";
import { Composition } from "remotion";
import { SummaryVideo } from "./SummaryVideo";

export const MyVideo = () => {
  return (
    <>
      <Composition
        component={SummaryVideo}
        durationInFrames={400}
        width={1920}
        height={1080}
        fps={30}
        id="my-comp"
      />
    </>
  );
};

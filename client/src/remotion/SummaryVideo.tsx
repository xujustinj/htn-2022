import { useEffect, useState } from "react";
import { spring } from "remotion";
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
  Audio,
  Series,
} from "remotion";
import { getAudioDurationInSeconds } from "@remotion/media-utils";
import { Subtitle } from "./Subtitle";
import { Title } from "./Title";
import { SummaryDetail } from "../types/summary";

interface SummaryVideoProps {
  readonly titleText: string;
  readonly titleColor: string;
  readonly summary: SummaryDetail;
}

export const SummaryVideo = ({
  titleText,
  titleColor,
  summary,
}: SummaryVideoProps) => {
  // A <AbsoluteFill> is just a absolutely positioned <div>!
  return (
    <AbsoluteFill style={{ backgroundColor: "white" }}>
      <div className="m-3" />
      <Series>
        {summary.map(({ audioSrc, durationInSeconds, visualSrc }, i) => (
          <Series.Sequence
            key={i}
            durationInFrames={Math.ceil(durationInSeconds * 30)}
          >
            <Audio src={audioSrc} />
            <img src={visualSrc} style={{ objectFit: "cover" }} />
          </Series.Sequence>
        ))}
      </Series>
    </AbsoluteFill>
  );
};

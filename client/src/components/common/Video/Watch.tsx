import React, { useEffect, useState } from "react";
import { ref, getDownloadURL } from "firebase/storage";
import { getAudioDurationInSeconds } from "@remotion/media-utils";
import { Player } from "@remotion/player";
import { storage } from "../../../firebase";
import { SummaryVideo } from "../../../remotion/SummaryVideo";
import { Summary, SummaryDetail } from "../../../types/summary";

import { useParams } from "react-router-dom";

const API_URL = process.env.REACT_APP_API_URL;

export function Watch() {
  const { title } = useParams();

  const [summary, setSummary] = useState<SummaryDetail>();
  useEffect(() => {
    const effect = async () => {
      if (title === undefined) {
        return;
      }
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
      {title === undefined || summary === undefined || (
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

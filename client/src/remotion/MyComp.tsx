import React from 'react';

import { Gif } from "@remotion/gif";
import { useVideoConfig } from "remotion";

export const MyComp: React.FC<{ text: string }> = ({ text }) => {
    const { width, height } = useVideoConfig();
 
    return (
    <Gif
      src="https://media.giphy.com/media/3o72F7YT6s0EMFI0Za/giphy.gif"
      width={width}
      height={height}
      fit="fill"
    />
    )
  };
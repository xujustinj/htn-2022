import React from "react";
import { interpolate, useCurrentFrame } from "remotion";

export const Subtitle: React.FC<{ subtitle: string }> = ({ subtitle }) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [30, 50], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      className="text-blue-300 justify-center pb-52 flex items-end w-full text-4xl"
      style={{ opacity }}
    >
      {subtitle}
    </div>
  );
};

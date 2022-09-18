import { interpolate } from "remotion";
import { useCurrentFrame } from "remotion";
import React from "react";

export const Title: React.FC<{ title: string }> = ({ title }) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [20, 40], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return (
    <div
      style={{ opacity }}
      className="text-gray-700 text-9xl w-full border pt-80 text-center font-bold leading-relaxed"
    >
      {title}
    </div>
  );
};

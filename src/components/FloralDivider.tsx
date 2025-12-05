import React from "react";

// --- Divider groups mapped to actual file names in src/assets/dividers ---
import vine1 from "@/assets/dividers/divider-vine.png";
import vine2 from "@/assets/dividers/divider-vine-light.png";
import vine3 from "@/assets/dividers/divider-vine-dark.png";

import floral1 from "@/assets/dividers/divider-floral.png";
import floral2 from "@/assets/dividers/divider-floral-thin.png";
import floral3 from "@/assets/dividers/divider-flower.png";

import mush1 from "@/assets/dividers/divider-mushroom.png";
import mush2 from "@/assets/dividers/divider-mushroom-thin.png";
import mush3 from "@/assets/dividers/divider-mushroom-wide.png";

type DividerVariant = "vine" | "floral" | "mushroom";
type DividerSize = "sm" | "md" | "lg";

const dividerGroups: Record<DividerVariant, string[]> = {
  vine: [vine1, vine2, vine3],
  floral: [floral1, floral2, floral3],
  mushroom: [mush1, mush2, mush3],
};

export default function FloralDivider({
  variant = "vine",
  size = "md",
  className = "",
}: {
  variant?: DividerVariant;
  size?: DividerSize;
  className?: string;
}) {
  // pick random divider on each render
  const options = dividerGroups[variant];
  const dividerImg = options[Math.floor(Math.random() * options.length)];

  // size presets
  const heightMap: Record<DividerSize, string> = {
    sm: "h-4",
    md: "h-6",
    lg: "h-10",
  };

  return (
    <div className={`flex justify-center my-6 ${className}`}>
      <img
        src={dividerImg}
        className={`${heightMap[size]} w-auto opacity-90`}
        alt="Decorative divider"
        loading="lazy"
      />
    </div>
  );
}

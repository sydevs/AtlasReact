import { SVGProps } from "react";
export * from "./client";
export * from "./country";
export * from "./event";
export * from "./area";
export * from "./region";
export * from "./venue";
export * from "./registration";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

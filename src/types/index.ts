import { SVGProps } from "react";
export * from "./locations";
export * from "./event";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

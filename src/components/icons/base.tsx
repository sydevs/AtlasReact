import * as React from "react";
import { IconSvgProps } from "@/types";

type BaseIconProps = {
  view?: string;
  size?: number;
  paths?: string[] | undefined;
  pathProps?: React.SVGProps<SVGPathElement>;
};

export const BaseIcon: React.FC<BaseIconProps & IconSvgProps> = ({
  size = 24,
  view = "0 0 24 24",
  paths = [],
  pathProps = {
    fill: "currentColor",
    fillRule: "evenodd",
    clipRule: "evenodd"
  },
  children, height, ...props
}) => (
  <svg
    fill="none"
    aria-hidden="true"
    focusable="false"
    height={size || height}
    role="presentation"
    viewBox={view}
    width={size || height}
    className={props.onClick && "cursor-pointer hover:opacity-80"}
    {...props}
  >
    {children ?
      children :
      paths.map((path, index) => (
        <path key={index} d={path} {...pathProps} />
      ))}
  </svg>
);

export default BaseIcon;

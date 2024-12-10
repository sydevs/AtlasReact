import * as React from "react";
import { IconSvgProps } from "@/types";

type BaseIconProps = {
  view: string;
  paths?: string[] | undefined;
};

export const BaseIcon: React.FC<BaseIconProps & IconSvgProps> = ({
  size = 24,
  paths = [],
  children, height, view, ...props
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
        <path key={index} fill="currentColor" fillRule="evenodd" d={path} clipRule="evenodd" />
      ))}
  </svg>
);

export default BaseIcon;

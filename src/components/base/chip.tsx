import React from 'react';
import { IconSvgProps } from "@/types";
import { Chip as NextUIChip } from "@nextui-org/react";

interface Props {
  props?: any;
  children: React.ReactNode;
  icon?: React.FC<IconSvgProps>;
}

export default function Chip({ props, children, icon }: Props) {
  return (
    <NextUIChip
      color="primary"
      variant="flat"
      radius="sm"
      size="sm"
      classNames={{
        content: "uppercase text-primary font-bold"
      }}
      startContent={icon}
      {...props}
    >
      {children}
    </NextUIChip>
  );
}
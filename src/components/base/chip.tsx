import React from 'react';
import { IconSvgProps } from "@/types";
import { Chip as NextUIChip, ChipProps, Tooltip } from "@nextui-org/react";
import { DateTime } from "luxon";

type Props = {
  children: React.ReactNode;
  icon?: React.ReactElement<IconSvgProps>;
} & ChipProps

export default function Chip({ children, icon, ...props }: Props) {
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

type TimezoneChipProps = {
  time: DateTime;
} & ChipProps

export function TimezoneChip({ time, ...props }: TimezoneChipProps) {
  return (
    <Tooltip content={`${time.toFormat('ZZZZZ')} (${time.toFormat('Z')})`} placement="top">
      <span> {/* Tooltip wrapper needed for forwardRef to work */}
        <Chip color="primary" size="sm" variant="light" {...props}>
          {time.toFormat('ZZZZ')}
        </Chip>
      </span>
    </Tooltip>
  );
}
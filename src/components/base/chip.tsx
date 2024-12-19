import React from 'react';
import { IconSvgProps } from "@/types";
import { Chip as NextUIChip, ChipProps, Tooltip } from "@nextui-org/react";
import { DateTime } from "luxon";
import { useTranslation } from 'react-i18next';

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
        content: "uppercase font-bold"
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
  delay?: number;
} & ChipProps

export function TimezoneChip({ time, delay = 0, ...props }: TimezoneChipProps) {
  const { t } = useTranslation('events');
  const tooltip = t('timing.converted_to', { timezone: time.toFormat('ZZZZZ'), offset: time.toFormat('Z') })
  
  return (
    <Tooltip className='max-w-64' delay={delay} closeDelay={0} content={tooltip} placement="top">
      <abbr> {/* Tooltip wrapper needed for forwardRef to work */}
        <Chip color="primary" size="sm" variant="light" {...props}>
          {time.toFormat('ZZZZ')}
        </Chip>
      </abbr>
    </Tooltip>
  );
}
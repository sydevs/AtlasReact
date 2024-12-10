import React from 'react';
import { Tooltip, Button, ButtonProps } from "@nextui-org/react";
import { IconSvgProps } from "@/types";

type Props = {
  Icon: React.FC<IconSvgProps>;
  tooltip?: string;
  active: boolean;
  setActive: (value: boolean) => void;
} & ButtonProps;

export default function Toggle({ Icon, tooltip, active, setActive, ...props }: Props) {
  const button = (
    <Button isIconOnly
      color={active ? "secondary" : "primary"}
      variant={active ? "shadow" : "flat"}
      className={active ? "" : "text-primary"}
      radius="full"
      aria-label={tooltip || "Toggle"}
      onClick={() => setActive(!active)}
      {...props}
    >
      <Icon width={24} height={24} />
    </Button>
  )

  return (
    tooltip ?
      <Tooltip
        color={active ? "secondary" : "primary"}
        content={tooltip}
        placement="top"
      >
        {button}
      </Tooltip>
      :
      button
  );
}
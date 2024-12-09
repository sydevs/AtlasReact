import React from 'react';
import { Tooltip } from "@nextui-org/tooltip";
import { Button } from "@nextui-org/button";
import { IconSvgProps } from "@/types";

interface Props {
  Icon: React.FC<IconSvgProps>;
  tooltip?: string;
  active: boolean;
  setActive: (value: boolean) => void;
}

export default function Toggle({ Icon, tooltip, active, setActive }: Props) {
  const button = (
    <Button isIconOnly
      color={active ? "primary" : "secondary"}
      variant={active ? "shadow" : "faded"}
      radius="full"
      aria-label={tooltip || "Toggle"}
      onClick={() => setActive(!active)}
    >
      <Icon width={24} height={24} />
    </Button>
  )

  return (
    tooltip ?
      <Tooltip
        color={active ? "primary" : "secondary"}
        content={tooltip}
        delay={500}
        placement="top"
      >
        {button}
      </Tooltip>
      :
      button
  );
}
import type { Selection } from "@nextui-org/react";

import React from "react";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@nextui-org/react";

type DropdownItemProps = {
  value: string;
  label: string;
}

type Props = {
  startContent?: React.ReactNode;
  options: DropdownItemProps[];
}

export default function SelectionDropdown({ startContent, options } : Props) {
  const [selectedKeys, setSelectedKeys] = React.useState<Selection>(new Set([]));

  const selectedValue = React.useMemo(
    () => Array.from(selectedKeys).join(", ").replace(/_/g, ""),
    [selectedKeys],
  );

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button
          startContent={startContent}
          className="capitalize w-full"
          variant="bordered"
          radius="none"
        >
          {selectedValue}
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        disallowEmptySelection
        aria-label="Single selection example"
        selectedKeys={selectedKeys}
        selectionMode="single"
        variant="flat"
        onSelectionChange={setSelectedKeys}
      >
        {options.map(({ value, label }) => 
          <DropdownItem key={value} value={value}>{label}</DropdownItem>
        )}
      </DropdownMenu>
    </Dropdown>
  );
}
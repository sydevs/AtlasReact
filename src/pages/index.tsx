import { Link } from "@nextui-org/link";
import { Snippet } from "@nextui-org/snippet";
import { Code } from "@nextui-org/code";
import { button as buttonStyles } from "@nextui-org/theme";
import { Kbd } from "@nextui-org/kbd";
import { SearchIcon } from "@/components/icons";

import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/primitives";
import MapLayout from "@/layouts/map";
import { Input } from "@nextui-org/input";

export default function IndexPage() {
  return (
    <MapLayout>
      <Input
        aria-label="Search"
        classNames={{
          inputWrapper: "bg-default-100",
          input: "text-sm",
        }}
        endContent={
          <Kbd className="hidden lg:inline-block" keys={["command"]}>
            K
          </Kbd>
        }
        labelPlacement="outside"
        placeholder="Search..."
        startContent={
          <SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />
        }
        type="search"
      />
    </MapLayout>
  );
}

import { Kbd } from "@nextui-org/kbd";
import { SearchIcon } from "@/components/icons";
import { Input } from "@nextui-org/input";

export default function Search() {
  return (
    <div className="p-2 backdrop-blur-lg backdrop-saturate-150 bg-background/70">
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
    </div>
  );
}
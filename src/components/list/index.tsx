import { ScrollShadow } from "@nextui-org/react";

export { default as ListHeader } from "./header";
export { default as ListItem } from "./item";
export { default as EventsList, DynamicEventsList } from "./events";

export function List({ children } : { children: React.ReactNode }) {
  return (
    <ScrollShadow>
      <ul className="overflow-y-auto scroll-p-0 scroll-m-0">
        {children}
      </ul>
    </ScrollShadow>
  );
}

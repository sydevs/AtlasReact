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
import CountryList from "@/components/list/countries";
import Search from "@/components/search";

export default function IndexPage() {
  return (
    <MapLayout>
      <Search />
      <CountryList />
    </MapLayout>
  );
}

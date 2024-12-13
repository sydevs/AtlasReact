import { RightArrowIcon } from "../icons";
import { Link } from "@nextui-org/react";

interface Props {
  label: string;
  subtitle?: string;
  count: number;
  link: string;
}

export default function ListItem({ label, subtitle, count, link }: Props) {
  return (
    <Link href={link} className="block bg-panel-hover">
      <li className="px-6 py-5 flex flex-row items-center font-semibold">
        <div className="text-lg flex-grow">
          <div>{label}</div>
          {subtitle && <div className="text-md font-light">{subtitle}</div>}
        </div>
        <div className="text-right mr-1 font-mono">{count}</div>
        <RightArrowIcon className="text-xl" />
      </li>
    </Link>
  );
}
import { RightArrowIcon } from "../icons";
import { Link } from "@nextui-org/link";

interface Props {
  label: string;
  count: number;
  link: string;
}

export default function ListItem({ label, count, link }: Props) {
  return (
    <Link href={link} className="block bg-panel-hover">
      <li className="px-6 py-5 flex flex-row items-center font-semibold">
        <div className="text-lg flex-grow">{label}</div>
        <div className="text-right mr-1 font-mono">{count}</div>
        <RightArrowIcon className="text-xl" />
      </li>
    </Link>
  );
}
import { RightArrowIcon } from "../icons";
import { Link } from "@nextui-org/link";

interface Props {
  label: string;
  count: number;
  link: string;
}

export default function ListItem({ label, count, link }: Props) {
  return (
    <Link href={link} className="block bg-blur-hover">
      <li className="p-4 flex flex-row items-center">
        <div className="flex-grow">{label}</div>
        <div className="text-right mr-4">{count}</div>
        <RightArrowIcon />
      </li>
    </Link>
  );
}
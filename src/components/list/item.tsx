import { RightArrowIcon } from "../icons";
import { Link } from "@nextui-org/react";

interface Props {
  label: string;
  subtitle?: string;
  count: number;
  link: string;
  children?: React.ReactNode;
}

export default function ListItem({ label, subtitle, count, link, children }: Props) {
  return (
    <Link href={link} className="px-6 block bg-panel-hover">
      <li className="py-5 flex flex-row items-center font-semibold border-b border-divider">
        {children}
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
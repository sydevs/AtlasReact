import { RightArrowIcon } from "../icons";
import { Link } from "@nextui-org/react";

interface Props {
  label: string;
  subtitle?: string | null;
  count: number;
  link: string;
  children?: React.ReactNode;
}

export default function ListItem({ label, subtitle, count, link, children }: Props) {
  return (
    <Link href={link} className="px-6 block text-inherit transition-colors hover:bg-primary-10">
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
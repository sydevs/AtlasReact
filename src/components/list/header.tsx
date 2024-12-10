import { Link } from "@nextui-org/react";
import { LeftArrowIcon } from "../icons";

interface Props {
  title: string;
  returnLink: string;
}

export default function ListHeader({ title, returnLink }: Props) {
  return <h1 className="text-2xl font-bold text-center bg-panel p-2 flex flex-row items-center">
    <Link className="text-3xl" href={returnLink}><LeftArrowIcon /></Link>
    <span className="flex-grow">{title}</span>
  </h1>;
}
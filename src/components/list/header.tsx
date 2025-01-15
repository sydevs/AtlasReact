import { Link } from "@nextui-org/react";
import { UpArrowIcon } from "../icons";

interface Props {
  title: string;
  returnLink: string;
}

export default function ListHeader({ title, returnLink }: Props) {
  return <h1 className="text-2xl font-bold text-center p-2 flex flex-row items-center">
    <Link className="text-3xl" href={returnLink}><UpArrowIcon /></Link>
    <span className="flex-grow">{title}</span>
  </h1>;
}
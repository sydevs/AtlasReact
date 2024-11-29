import { Area } from "@/types";
import AreaItem from "../items/area";

interface Props {
  areas: Area[];
}

export default function AreaList({ areas }: Props) {
  return (
    <ul>
      {areas.map((area: Area) => (
        <AreaItem key={area.id} area={area} />
      ))}
    </ul>
  );
}
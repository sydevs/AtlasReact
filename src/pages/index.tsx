import MapLayout from "@/layouts/map";
import Search from "@/components/search";
import { useQuery } from "@tanstack/react-query";
import api from "@/config/api";
import Loader from "@/components/loader";
import { Country } from "@/types";
import { ListItem } from "@/components/list";

export default function IndexPage() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['countries'],
    queryFn: () => api.getCountries(),
  });

  return (
    <MapLayout>
      <Search />
      <Loader isLoading={isLoading} error={error}>
        {data &&
          <ul className="overflow-y-auto">
            {data.map((country: Country) => (
              <ListItem key={country.id} label={country.label} count={country.eventCount} link={`/country/${country.id}`} />
            ))}
          </ul>}
      </Loader>
    </MapLayout>
  );
}

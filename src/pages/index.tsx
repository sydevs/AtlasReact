import SearchBar from "@/components/search-bar";
import { useQuery } from "@tanstack/react-query";
import api from "@/config/api";
import Loader from "@/components/loader";
import { List, DynamicEventsList, ListItem } from "@/components/list";
import { useViewState } from "@/config/store";
import { useShallow } from 'zustand/react/shallow'
import { Main } from "@/components/base/main";
import { Helmet } from "react-helmet-async";

export default function IndexPage() {
  const [ zoom, latitude, longitude ] = useViewState(useShallow(s => [s.zoom, s.latitude, s.longitude]))
  const { data, isLoading, error } = useQuery({
    queryKey: ['countries'],
    queryFn: () => api.getCountries(),
  });

  return (
    <Main>
      <Helmet>
        <title>Free Meditation Classes</title>
        <meta property="og:url" content="https://wemeditate.com/map" />
        <link rel="canonical" href="https://wemeditate.com/map" />
      </Helmet>
      <SearchBar onSelect={value => console.log(value)} filterable={zoom < 7} />
      { zoom < 7 ?
        <Loader isLoading={isLoading} error={error}>
          {data &&
            <List>
              {data.map((country) => (
                <ListItem key={country.id} label={country.label} count={country.eventCount} link={`/country/${country.code}`} />
              ))}
            </List>}
        </Loader> :
        <DynamicEventsList latitude={latitude} longitude={longitude} />}
    </Main>
  );
}

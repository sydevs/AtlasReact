import SearchBar from "@/components/search-bar";
import { useQuery } from "@tanstack/react-query";
import api from "@/config/api";
import Loader from "@/components/loader";
import { List, DynamicEventsList, ListItem } from "@/components/list";
import { useSearchState, useViewState } from "@/config/store";
import { useShallow } from 'zustand/react/shallow'
import { Main } from "@/components/base/main";
import { Helmet } from "react-helmet-async";
import { CircleFlag } from 'react-circle-flags'

export default function IndexPage() {
  const onlineOnly = useSearchState(s => s.onlineOnly);
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
      <SearchBar onSelect={value => console.log(value)} filterable={true} />
      { zoom >= 7 || onlineOnly ?
        <DynamicEventsList
          latitude={latitude}
          longitude={longitude}
          onlineOnly={onlineOnly}
        /> :
        <Loader isLoading={isLoading} error={error}>
          <List>
            {data &&
              data.filter(country => country.eventCount > 0).map((country) => (
                <ListItem key={country.id} label={country.label} count={country.eventCount} link={`/country/${country.code}`}>
                  <CircleFlag countryCode={country.code.toLocaleLowerCase()} className="w-7 h-7 mr-3 border border-divider rounded-full bg-divider" />
                </ListItem>
              ))}
          </List>
        </Loader>}
    </Main>
  );
}

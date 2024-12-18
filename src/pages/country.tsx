import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import api from "@/config/api";
import Loader from "@/components/loader";
import { List, ListItem } from "@/components/list";
import SearchBar from "@/components/search-bar";
import { Main } from "@/components/base/main";
import { Helmet } from "react-helmet-async";
import { useMap } from "react-map-gl";
import { useEffect } from "react";
import { useViewState } from "@/config/store";
import { bboxPolygon } from "@turf/bbox-polygon";

export default function CountryPage() {
  let { countryCode } = useParams();
  const { mapbox } = useMap();
  const setBoundary = useViewState(s => s.setBoundary);
  const { data, isLoading, error } = useQuery({
    queryKey: ['country', countryCode],
    queryFn: () => api.getCountry(countryCode || ""),
  });

  useEffect(() => {
    if (mapbox && data) {
      setBoundary(bboxPolygon(data.bounds))
      mapbox.fitBounds(data.bounds)
    }
  }, [data, mapbox]);

  return (
    <Main>
      {data &&
        <Helmet>
          <title>{`Free Meditation Classes in ${data.label}`}</title>
          <meta name="description" content={`${data.eventCount} free meditation classes at ${data.label}`} />
        </Helmet>}
      <Loader isLoading={isLoading} error={error}>
        {data &&
          <>
            <SearchBar
              onSelect={value => console.log(value)}
              header={data.label}
              returnLink="/"
            />
            <List>
              {data.children.map((child) => (
                child.eventCount > 0 &&
                  <ListItem key={child.id} label={child.label} count={child.eventCount} link={`/${child.type}/${child.id}`} />
              ))}
            </List>
          </>}
      </Loader>
    </Main>
  );
}

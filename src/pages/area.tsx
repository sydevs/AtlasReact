import Loader from "@/components/loader";
import api from "@/config/api";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import { EventsList } from "@/components/list";
import SearchBar from "@/components/search-bar";
import { Main } from "@/components/base/main";
import { Helmet } from "react-helmet-async";
import { useMap } from "react-map-gl";
import { useEffect } from "react";
import { useViewState } from "@/config/store";
import { circle as geoCircle } from "@turf/circle";
import { bbox } from "@turf/bbox";

export default function AreaPage() {
  let { id } = useParams();
  const { mapbox } = useMap();
  const setBoundary = useViewState(s => s.setBoundary);
  const { data, isLoading, error } = useQuery({
    queryKey: ['area', id],
    queryFn: () => api.getArea(Number(id)),
  });

  useEffect(() => {
    if (mapbox && data) {
      let circle = geoCircle([data.longitude, data.latitude], data.radius)
      setBoundary(circle)
      let box = bbox(circle) as [number, number, number, number]
      mapbox.fitBounds(box)
    }
  }, [data, mapbox]);

  return (
    <Main>
      {data &&
        <Helmet>
          <title>{`Free Meditation Classes in ${data.label}`}</title>
          <meta name="description" content={`${data.events.length} free meditation classes at ${data.label}`} />
        </Helmet>}
      <Loader isLoading={isLoading} error={error}>
        {data &&
          <>
            <SearchBar
              onSelect={value => console.log(value)}
              header={data.label}
              returnLink={`/${data.parentType}/${data.parentId}`}
            />
            <EventsList events={data.events} />
          </>}
      </Loader>
    </ Main>
  );
}

import Loader from "@/components/loader";
import api from "@/config/api";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router";
import SearchBar from "@/components/search-bar";
import { EventsList } from "@/components/list";
import { useEffect } from "react";
import { Main } from "@/components/base/main";
import { Helmet } from "react-helmet-async";

export default function VenuePage() {
  let { id } = useParams();
  let navigate = useNavigate();

  const { data, isLoading, error } = useQuery({
    queryKey: ['venue', id],
    queryFn: () => api.getVenue(Number(id))
  });

  useEffect(() => {
    if (data && data.events.length < 2) {
      navigate(`/area/${data.parentId}`, { replace: true });
    }
  }, [data, navigate]);

  return (
    <Main>
      {data &&
        <Helmet>
          <title>{`Free Meditation Classes at ${data.label}`}</title>
          <meta name="description" content={`${data.events.length} free meditation classes at ${data.label}`} />
        </Helmet>}
      <Loader isLoading={isLoading} error={error}>
        {data &&
          <>
            <SearchBar onSelect={value => console.log(value)} header={data.label} returnLink='/' />
            <EventsList events={data.events} />
          </>}
      </Loader>
    </Main>
  );
}

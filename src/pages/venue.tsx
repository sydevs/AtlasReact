import Loader from "@/components/loader";
import api from "@/config/api";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router";
import SearchBar from "@/components/search-bar";
import { EventsList } from "@/components/list";
import { useEffect } from "react";
import { Main } from "@/components/base/main";
import { Helmet } from "react-helmet-async";
import { useMap } from "react-map-gl";
import { useTranslation } from "react-i18next";

export default function VenuePage() {
  const { id } = useParams();
  const { mapbox } = useMap();
  const { t } = useTranslation('common');
  const navigate = useNavigate();

  const { data, isLoading, error } = useQuery({
    queryKey: ['venue', id],
    queryFn: () => api.getVenue(Number(id))
  });

  useEffect(() => {
    if (data && data.events.length < 2) {
      navigate(data.parentPath, { replace: true });
    }
  }, [data, navigate]);

  useEffect(() => {
    if (mapbox && data) {
      mapbox.easeTo({ center: [data.longitude, data.latitude], zoom: 13 })
    }
  }, [data, mapbox]);

  return (
    <Main mapWindow={240}>
      {data &&
        <Helmet>
          <title>{t('venues.title', { venue: data.label })}</title>
          <meta name="description" content={t('venues.description', { count: data.events.length, venue: data.label })} />
        </Helmet>}
      <Loader isLoading={isLoading} error={error}>
        {data &&
          <>
            <SearchBar
              onSelect={value => console.log(value)}
              header={data.label}
              returnLink='/'
            />
            <EventsList events={data.events} />
          </>}
      </Loader>
    </Main>
  );
}

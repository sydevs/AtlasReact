import api from "@/config/api";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import Loader from "@/components/loader";
import SearchBar from "@/components/search-bar";
import { List, ListItem } from "@/components/list";
import { Main } from "@/components/base/main";
import { Helmet } from "react-helmet-async";

export default function RegionPage() {
  let { id } = useParams();
  const { data, isLoading, error } = useQuery({
    queryKey: ['region', id],
    queryFn: () => api.getRegion(Number(id)),
  });

  return (
    <Main>
      {data &&
        <Helmet>
          <title>{`Free Meditation Classes at ${data.label}`}</title>
          <meta name="description" content={`${data.eventCount} free meditation classes at ${data.label}`} />
        </Helmet>}
      <Loader isLoading={isLoading} error={error}>
        {data &&
          <>
            <SearchBar onSelect={value => console.log(value)} header={data.label} returnLink={`/${data.parentType}/${data.parentId}`} />
            <List>
              {data.areas.map((area) => (
                <ListItem key={area.id} label={area.label} count={area.eventCount} link={`/area/${area.id}`} />
              ))}
            </List>
          </>}
      </Loader>
    </Main>
  );
}

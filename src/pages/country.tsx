import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import api from "@/config/api";
import Loader from "@/components/loader";
import { List, ListItem } from "@/components/list";
import SearchBar from "@/components/search-bar";
import { Main } from "@/components/base/main";
import { Helmet } from "react-helmet-async";

export default function CountryPage() {
  let { code } = useParams();
  const { data, isLoading, error } = useQuery({
    queryKey: ['country', code],
    queryFn: () => api.getCountry(code || ""),
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
            <SearchBar onSelect={value => console.log(value)} header={data.label} returnLink="/" />
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

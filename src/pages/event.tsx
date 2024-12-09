import { ListHeader } from "@/components/list";
import Loader from "@/components/loader";
import api from "@/config/graphql-api";
import MapLayout from "@/layouts/map";
import { Link } from "@nextui-org/link";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import createDOMPurify from 'dompurify'
import EmblaCarousel from "@/components/carousel";
import { Input, Textarea } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
//import { Form } from "@nextui-org/form";

const DOMPurify = createDOMPurify(window)

export default function EventPage() {
  let { id } = useParams();
  const { data, isLoading, error } = useQuery({
    queryKey: ['event', id],
    queryFn: () => api.getEvent(Number(id)),
  });

  return (
    <MapLayout>
      <Loader isLoading={isLoading} error={error}>
        {data && <ListHeader title={data.label} returnLink={`/${data.location.type.toLowerCase()}/${data.location.id}`} />}
        {data &&
          <div className="bg-panel py-8 px-11 pb-24">
            <h2 className="text-lg font-bold mb-2">{data.label}</h2>
            <p className="text-sm mb-1">{data.address}</p>
            <p className="text-xs">{data.timing.recurrence}</p>
            <p className="text-xs font-semibold">{data.timing.firstDate}</p>
            <div className="flex flex-row gap-6 my-5">
              <Link href="#registrations">
                Register
              </Link>
              <Link href="#registrations">
                Get Directions
              </Link>
            </div>
            <div className="my-4" dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(data.descriptionHtml, {
                USE_PROFILES: { html: true },
                ALLOWED_TAGS: ['p', 'b', 'i', 'em', 'strong', 'a', 'ul', 'ol', 'li', 'del', 'br'],
                ALLOWED_ATTR: ['href'],
              })
            }}></div>
            <EmblaCarousel
              slides={[1, 2, 3] || data.images}
              options={{ containScroll: false }}
            />
            <div className="flex flex-row my-5 gap-5 space-around justify-center align-middle">
              <img src="/graphics/leaves.svg" className="h-12 object-fit -rotate-90 flip" />
              <div className="text-center text-lg">
                <h3 className="mb-1.5">Register Now</h3>
                <div className="text-xs italic">This class is on-going</div>
              </div>
              <img src="/graphics/leaves.svg" className="h-12 object-fit rotate-90" />
            </div>
            <form className="gap-4 flex flex-col justify-center">
              <Input label="Name" type="text" placeholder="Enter your name" variant="bordered" isRequired radius="none" />
              <Input label="Email" type="email" placeholder="Enter your email" variant="bordered" isRequired radius="none" />
              <Textarea label="Do you have any questions?" variant="bordered" isRequired radius="none" />
              <p className="text-xs">By submitting you confirm you agree to receive follow up messages about this and similar events, in accordance with our privacy policy.</p>
              <Button className="w-full rounded-sm" color="primary">
                Register
              </Button>
            </form>
          </div>}
      </Loader>
    </MapLayout>
  );
}

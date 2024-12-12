import Loader from "@/components/loader";
import api from "@/config/api";
import { Link } from "@nextui-org/react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import createDOMPurify from 'dompurify'
import EmblaCarousel from "@/components/carousel";
import Registration from "@/components/event/registration";
import { LeftArrowIcon, SignupIcon, ShareIcon, DirectionsIcon } from "@/components/icons";
import { useEffect, useRef } from "react";
import { Main } from "@/components/base/main";
import { useViewState } from "@/config/store";
import { useMap } from "react-map-gl";
import { useTranslation } from "react-i18next";

const DOMPurify = createDOMPurify(window)

export default function EventPage() {
  const { id } = useParams();
  const { mapbox } = useMap();
  const { t } = useTranslation();
  const setMapSelection = useViewState(s => s.setSelection);
  const { data, isLoading, error } = useQuery({
    queryKey: ['event', id],
    queryFn: () => api.getEvent(Number(id)),
  });

  const registrationRef = useRef<HTMLDivElement>(null);
  const executeScroll = () => registrationRef.current?.scrollIntoView({ behavior: 'smooth' })    

  useEffect(() => {
    if (!mapbox || !data) return;
    
    setMapSelection(data.location)
    mapbox.easeTo({
      center: [data.location.longitude, data.location.latitude],
      zoom: data.online ? 10 : 15,
    })

    return () => {
      setMapSelection(null)
      mapbox.zoomOut()
    }
  }, [data, mapbox])

  return (
    <Main width={467}>
      <Loader isLoading={isLoading} error={error}>
        {data &&
          <div className="bg-panel py-8 px-11 pb-24">
            <>
              <Link className="text-3xl absolute top-6 left-2" href={`/${data.location.type}/${data.location.id}`}>
                <LeftArrowIcon size={32} className="text-lg" />
              </Link>
              <Link className="text-3xl absolute top-8 right-4" href="#share">
                <ShareIcon size={18} />
              </Link>
            </>
            {data.online && data.languageCode && 
              <div className="text-xs px-2.5 py-2 border-primary border-1 rounded leading-tight ml-4 mb-2 float-right text-center">
                <div className="italic">This class is</div>
                {data.languageCode && <div className="text-primary font-bold">{data.languageCode}</div>}
                {data.online && <div className="text-secondary font-bold">Online</div>}
              </div>}
            <h2 className="text-lg font-bold mb-2">{data.label}</h2>
            <p className="text-sm mb-1">{data.location.address}</p>
            <p className="text-xs">{data.timing.recurrence}</p>
            <p className="text-xs font-medium">{data.timing.firstDate.toString()}</p>
            {data.contact.phoneNumber &&
              <Link className="text-sm hover:underline" href={`tel: ${data.contact.phoneNumber}`} target="_blank" rel="noopener noreferrer">
                tel: {data.contact.phoneNumber}
                {data.contact.phoneName && `, ${data.contact.phoneName}`}
              </Link>}
            <div className="flex flex-row gap-6 my-8 text-primary">
              <Link className="text-sm italic font-medium" onClick={executeScroll} href="#registrations">
                <SignupIcon className="mr-2" />
                {t('register')}
              </Link>
              <Link className="text-sm italic font-medium" href={data.location.directionsUrl} target="_blank" rel="noopener noreferrer">
                <DirectionsIcon className="mr-2" />
                {t('get_directions')}
              </Link>
            </div>
            <div className="mt-16 mb-4" dangerouslySetInnerHTML={{
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
            <div ref={registrationRef}>
              <Registration event={data} />
            </div>
          </div>}
      </Loader>
    </Main>
  );
}

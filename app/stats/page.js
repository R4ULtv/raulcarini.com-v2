import CloudflareAnalytics from "@/components/CloudflareAnalytics";
import GlobeStasts from "@/components/GlobeStasts";
import { search } from "country-js";

export const metadata = {
  metadataBase: process.env.HOST_NAME,
  title: "Stats - Raul Carini",
  description:
    "Statistics page of my website. View the globe with the location of the latest requests from the last week. The stats are managed by CloudFlare.",
  openGraph: {
    title: "Stats - Raul Carini",
    description:
      "Statistics page of my website. View the globe with the location of the latest requests from the last week. The stats are managed by CloudFlare.",
    url: process.env.HOST_NAME,
    images: [
      {
        url: `${process.env.HOST_NAME}/api/dynamic-og?title=Statistics&description=A%20globe%20with%20the%20last%20week%20requests`,
        width: 843,
        height: 441,
      },
    ],
  },
};

export default async function Stats() {
  const data = await CloudflareAnalytics();
  if (!data) return;

  const contryMap =
    data.data.viewer.zones[0].httpRequests1dGroups[0].sum.countryMap;

  // Create a list of locations, each of which includes the latitude and longitude of a country and a size that is proportional to the number of requests from that country.
  const locations = [];
  const weightRange = 0.06 - 0.03;

  contryMap.forEach((location, index) => {
    const country = search(location.clientCountryName);
    
    if (!country || country.length === 0) return;
    locations.push({
      location: [country[0].geo.latitude, country[0].geo.longitude],
      size: ((index + 1) / contryMap.length) * weightRange + 0.03,
    });
  });

  return <GlobeStasts locations={locations} />;
}

import GlobeStasts from "@/components/GlobeStasts";
import { search } from "country-js";

export default async function Stats() {
  // Define the GraphQL query to fetch data from the Cloudflare API.
  const query = `{
    viewer {
        zones(filter: { zoneTag: "${process.env.CLOUDFLARE_ZONE_TAG}" }) {
            httpRequests1dGroups(
                filter: { date_geq: "${
                  new Date(new Date().setDate(new Date().getDate() - 7))
                    .toISOString()
                    .split("T")[0]
                }", date_leq: "${new Date().toISOString().split("T")[0]}" }
                limit: 1
            ) {
                dimensions {
                    date
                }
                sum {
                    requests
                    pageViews
                    countryMap {
                        clientCountryName
                        requests
                    }
                }
                uniq {
                    uniques
                }
            }
        }
    }
}`;

  const ref = await fetch("https://api.cloudflare.com/client/v4/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.CLOUDFLARE_API_KEY}`,
    },
    body: JSON.stringify({ query: query }),
    next: { revalidate: 60 * 60 * 24 },
  });

  // Parse the response from the API as JSON and extract the data.
  const data = await ref.json();
  const contryMap =
    data.data.viewer.zones[0].httpRequests1dGroups[0].sum.countryMap;

  // Create a list of locations, each of which includes the latitude and longitude of a country and a size that is proportional to the number of requests from that country.
  const locations = [];
  const weightRange = 0.06 - 0.03;

  contryMap.forEach((location, index) => {
    const country = search(location.clientCountryName);
    if (!country) return;
    locations.push({
      location: [country[0].geo.latitude, country[0].geo.longitude],
      size: ((index + 1) / contryMap.length) * weightRange + 0.03,
    });
  });

  return <GlobeStasts locations={locations} />;
}

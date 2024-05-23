export default async function CloudflareAnalytics() {
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
  try {
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

    return data;
  } catch (error) {
    return null;
  }
}

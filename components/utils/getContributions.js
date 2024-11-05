export default async function getGithubContribution() {
  const res = await fetch(
    "https://github-contributions-api.jogruber.de/v4/R4ULtv?y=last",
    { next: { revalidate: 43200 } }, // Revalidate every 12h
  );
  return await res.json();
}

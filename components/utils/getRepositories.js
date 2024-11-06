export default async function getRepositories() {
  const res = await fetch(
    "https://api.github.com/users/R4ULtv/repos?sort=created",
    { next: { revalidate: 43200 } }, // Revalidate every 12h
  );
  return await res.json();
}

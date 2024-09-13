export default async function getRepositories() {
  const res = await fetch(
    "https://api.github.com/users/R4ULtv/repos?sort=created",
    { next: { revalidate: 604800 } } // Revalidate every week
  );
  return await res.json();
}

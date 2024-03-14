import DetailsCard from "@/components/DetailsCard";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import useSWR, { mutate } from "swr";

export default function Place({ places }) {
  const router = useRouter();
  const { id } = router.query;

  const session = useSession();
  const userId = session.data?.user.id;

  const {
    data: user,
    userError,
    userIsLoading,
    mutate,
  } = useSWR(userId ? `/api/user/${userId}` : null);

  const {
    data: place,
    error,
    isLoading,
  } = useSWR(id ? `/api/places/${id}` : null);

  if (error || userError) return <div>failed to load</div>;
  if (isLoading || userIsLoading) return <div>loading...</div>;
  if (!place) return null;

  async function toggleFavorite(id) {
    if (session.status === "unauthenticated") {
      alert("Please sign in to add favorites");
      return;
    }

    const foundEntry = user.favoritePlaces.find(
      (favorite) => favorite._id === id
    );

    const response = await fetch(`/api/user/${userId}`, {
      method: foundEntry ? "PATCH" : "POST",
      body: JSON.stringify({ id }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) mutate();
  }

  const isFavorite = user?.favoritePlaces
    .map((place) => place._id)
    .includes(id);

  //----------------------------------------------------------------

  const matchingPlace = places.find((place) => place._id === String(id));

  if (!matchingPlace) {
    return <h1>Sorry, this place is not available</h1>;
  }

  return (
    <DetailsCard
      id={id}
      toggleFavorite={toggleFavorite}
      isFavorite={isFavorite}
      place={place}
      matchingPlace={matchingPlace}
    />
  );
}

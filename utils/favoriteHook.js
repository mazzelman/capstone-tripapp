// import general things to run the app
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import useSWR, { mutate } from "swr";

function usePlaceData(id) {
  return useSWR(id ? `/api/places/${id}` : null);
}

function useFavoriteToggle() {
  const router = useRouter();
  const { id } = router.query;
  const session = useSession();
  const userId = session.data?.user.id;

  const isProfilePage = router.pathname.startsWith("/profile");

  const {
    data: user,
    error: userError,
    isLoading: userIsLoading,
  } = useSWR(userId ? `/api/user/${userId}` : null);

  const {
    data: place,
    error,
    isLoading,
  } = usePlaceData(isProfilePage ? null : id);

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

    if (response.ok) {
      // Trigger a mutation to update data
      mutate(`/api/user/${userId}`);
      if (!isProfilePage) {
        mutate(`/api/places/${id}`);
      }
    }
  }

  const isFavorite = user?.favoritePlaces
    .map((place) => place._id)
    .includes(id);

  return {
    user,
    place,
    error: error || userError,
    isLoading: isLoading || userIsLoading,
    toggleFavorite,
    isFavorite,
  };
}

export default useFavoriteToggle;

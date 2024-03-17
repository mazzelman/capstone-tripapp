// import general things to run the app
import useSWR, { mutate } from "swr";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Link from "next/link";
// import fontawesome icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft as faChevronLeftSolid } from "@fortawesome/free-solid-svg-icons";
// import components
import Wrapper700 from "@/components/Partials/Wrapper700";
import DetailsCard from "@/components/Cards/DetailsCard";
// import components for styles
import StyledPrimarySection from "@/components/Sections/StyledPrimarySection";
import StyledSecondarySection from "@/components/Sections/StyledSecondarySection";
import StyledTertiarySection from "@/components/Sections/StyledTertiarySection";

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

  if (error || userError)
    return (
      <StyledTertiarySection $textAlign={true}>
        <h2>failed to load...</h2>
      </StyledTertiarySection>
    );
  if (isLoading || userIsLoading)
    return (
      <StyledTertiarySection $textAlign={true}>
        <h2>loading...</h2>
      </StyledTertiarySection>
    );
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

  return (
    <Wrapper700>
      <StyledSecondarySection>
        <Link href="/">
          <FontAwesomeIcon icon={faChevronLeftSolid} size="xs" fixedWidth />
          <span>go back</span>
        </Link>
      </StyledSecondarySection>
      <StyledPrimarySection>
        <DetailsCard
          id={id}
          isFavorite={isFavorite}
          toggleFavorite={toggleFavorite}
          place={place}
        />
      </StyledPrimarySection>
    </Wrapper700>
  );
}

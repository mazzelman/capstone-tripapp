// import general things to run the app
import useSWR from "swr";
import { useSession } from "next-auth/react";
import Link from "next/link";
// import fontawesome icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft as faChevronLeftSolid } from "@fortawesome/free-solid-svg-icons";
// import components
import Wrapper700 from "@/components/Partials/Wrapper700";
import Card from "@/components/Cards/Card";
import LoginButton from "@/components/Buttons/LoginButton";
// import components for styles
import StyledPrimarySection from "@/components/Sections/StyledPrimarySection";
import StyledSecondarySection from "@/components/Sections/StyledSecondarySection";
import StyledTertiarySection from "@/components/Sections/StyledTertiarySection";

export default function Favorite() {
  const session = useSession();
  const userId = session.data?.user.id;

  const {
    data: user,
    error,
    isLoading,
  } = useSWR(userId ? `/api/user/${userId}` : null);

  if (!session.data) {
    return (
      <StyledTertiarySection $textAlign={true}>
        <h2>Please sign in to view your favorite places</h2>
        <LoginButton />
      </StyledTertiarySection>
    );
  }

  if (error)
    return (
      <StyledTertiarySection $textAlign={true}>
        <h2>failed to load</h2>
      </StyledTertiarySection>
    );
  if (isLoading)
    return (
      <StyledTertiarySection $textAlign={true}>
        <h2>loading...</h2>
      </StyledTertiarySection>
    );

  return (
    <>
      {user.favoritePlaces.length === 0 && (
        <StyledTertiarySection $textAlign={true}>
          <h2>Wow, so much empty...</h2>
        </StyledTertiarySection>
      )}
      {user.favoritePlaces.length > 0 && (
        <Wrapper700>
          <StyledSecondarySection>
            <Link href="/">
              <FontAwesomeIcon icon={faChevronLeftSolid} size="xs" fixedWidth />
              <span>go back</span>
            </Link>
          </StyledSecondarySection>
        </Wrapper700>
      )}
      <Wrapper700>
        {user.favoritePlaces.map((place) => {
          return (
            <StyledPrimarySection key={place._id}>
              <Card place={place} />
            </StyledPrimarySection>
          );
        })}
      </Wrapper700>
    </>
  );
}

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
// import components for styles
import StyledPrimarySection from "@/components/Sections/StyledPrimarySection";
import StyledSecondarySection from "@/components/Sections/StyledSecondarySection";
import StyledTertiarySectionCenter from "@/components/SectionsCentered/StyledTertiarySectionCenter";

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
      <StyledTertiarySectionCenter>
        <h2>Please sign in to view your favorite places</h2>
      </StyledTertiarySectionCenter>
    );
  }

  if (error)
    return (
      <StyledTertiarySectionCenter>
        <h2>failed to load</h2>
      </StyledTertiarySectionCenter>
    );
  if (isLoading)
    return (
      <StyledTertiarySectionCenter>
        <h2>loading...</h2>
      </StyledTertiarySectionCenter>
    );

  return (
    <>
      {user.favoritePlaces.length === 0 && (
        <StyledTertiarySectionCenter>
          <h2>Wow, so much empty...</h2>
        </StyledTertiarySectionCenter>
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
      {user.favoritePlaces.map((place) => {
        return (
          <Wrapper700 key={place._id}>
            <StyledPrimarySection>
              <Card place={place} />
            </StyledPrimarySection>
          </Wrapper700>
        );
      })}
    </>
  );
}

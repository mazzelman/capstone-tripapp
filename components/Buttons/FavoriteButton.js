// import general things to run the app
import { useSession } from "next-auth/react";
import useSWR from "swr";
// import fontawesome icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons";
import { faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons";
// import components for styles
import styled from "styled-components";
import StyledTertiarySection from "@/components/Sections/StyledTertiarySection";

export default function FavoriteButton({ id, toggleFavorite }) {
  const session = useSession();
  const userId = session.data?.user.id;

  const {
    data: user,
    error: userError,
    isLoading: userIsLoading,
  } = useSWR(userId ? `/api/user/${userId}` : null);

  if (userIsLoading) {
    return (
      <StyledTertiarySection>
        <h2>Loading...</h2>
      </StyledTertiarySection>
    );
  }

  if (userError) {
    return (
      <StyledTertiarySection>
        <h2>Error loading user data...</h2>
      </StyledTertiarySection>
    );
  }

  return (
    <>
      {session.status === "authenticated" && (
        <StyledFavoriteButton type="button" onClick={() => toggleFavorite(id)}>
          {user.favoritePlaces.find((favorite) => favorite._id === id) ? (
            <FontAwesomeIcon icon={faHeartSolid} size="2x" />
          ) : (
            <FontAwesomeIcon icon={faHeartRegular} size="2x" />
          )}
        </StyledFavoriteButton>
      )}
      {session.status === "unauthenticated" && (
        <StyledFavoriteButton type="button" onClick={() => toggleFavorite(id)}>
          <FontAwesomeIcon icon={faHeartRegular} size="2x" />
        </StyledFavoriteButton>
      )}
    </>
  );
}

export const StyledFavoriteButton = styled.button`
  color: var(--secondary-color);
  position: absolute;
  right: 1em;
  top: 0.5em;
  border: none;
  background-color: transparent;
`;

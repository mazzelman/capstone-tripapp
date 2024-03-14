import styled from "styled-components";
import useSWR from "swr";
import { useSession } from "next-auth/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft as faChevronLeftSolid } from "@fortawesome/free-solid-svg-icons";

import FavoriteCard from "@/components/FavoriteCard";
import { StyledLink } from "@/components/DetailsCard";

export default function Favorite(toggleFavorite) {
  const session = useSession();
  const userId = session.data?.user.id;

  const {
    data: user,
    error,
    isLoading,
  } = useSWR(userId ? `/api/user/${userId}` : null);

  if (!session.data) {
    return <h2>Please sign in to view your favorite places</h2>;
  }

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  return (
    <>
      <StyledSection>
        <StyledLink href="/">
          <FontAwesomeIcon icon={faChevronLeftSolid} size="xs" fixedWidth />
          <span>go back</span>
        </StyledLink>
        {user.favoritePlaces.map((place) => {
          return (
            <FavoriteCard
              key={place._id}
              place={place}
              // isFavorite={isFavorite}
              // favoritePlaces={favoritePlaces}
              toggleFavorite={toggleFavorite}
            />
          );
        })}
      </StyledSection>
    </>
  );
}

export const StyledSectionEmpty = styled.section`
  padding: var(--main-padding-mobile);
  @media only screen and (min-width: 600px) {
    padding: var(--hero-padding-desktop);
  }
`;

export const StyledSection = styled.section`
  padding: var(--main-padding-mobile);
  @media only screen and (min-width: 600px) {
    padding: var(--main-padding-desktop);
  }
`;

export const StyledEmpty = styled.h2`
  text-align: center;
`;

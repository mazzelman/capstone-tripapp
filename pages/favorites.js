import styled from "styled-components";
import FavoriteCard from "@/components/FavoriteCard";

export default function Favorites({ places, isFavorite, onToggleFavorite }) {
  // Filter favorite places based on isFavorite state
  const favoritePlaces = places.filter((place) => isFavorite[place._id]);

  if (favoritePlaces.length === 0) {
    return (
      <StyledSectionEmpty>
        <StyledEmpty>Wow, so much empty...</StyledEmpty>
      </StyledSectionEmpty>
    );
  } else {
    return (
      <StyledSection>
        <FavoriteCard
          isFavorite={isFavorite}
          favoritePlaces={favoritePlaces}
          onToggleFavorite={onToggleFavorite}
        />
      </StyledSection>
    );
  }
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

// import general things to run the app
import Link from "next/link";
import useFavoriteToggle from "@/utils/favoriteHook";
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

export default function Place() {
  const { place, error, isLoading, toggleFavorite, isFavorite } =
    useFavoriteToggle();
  if (error)
    return (
      <StyledTertiarySection $textAlign={true}>
        <h2>failed to load...</h2>
      </StyledTertiarySection>
    );
  if (isLoading)
    return (
      <StyledTertiarySection $textAlign={true}>
        <h2>loading...</h2>
      </StyledTertiarySection>
    );
  if (!place) return null;

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
          id={place._id}
          isFavorite={isFavorite}
          toggleFavorite={toggleFavorite}
          place={place}
        />
      </StyledPrimarySection>
    </Wrapper700>
  );
}

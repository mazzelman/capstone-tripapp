import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft as faChevronLeftSolid } from "@fortawesome/free-solid-svg-icons";

import Image from "next/image";
import Link from "next/link";

import FavoriteButton from "./FavoriteButton";

import { StyledSection } from "@/pages/favorites";
import { StyledCardBody } from "./PreviewCard";
import { StyledTitle } from "./PreviewCard";
import { StyledInfo } from "./PreviewCard";

export default function DetailsCard({
  id,
  isFavorite,
  toggleFavorite,
  matchingPlace,
}) {
  return (
    <StyledSection>
      <StyledLink href="/">
        <FontAwesomeIcon icon={faChevronLeftSolid} size="xs" fixedWidth />
        <span>go back</span>
      </StyledLink>
      <StyledCard key={matchingPlace._id}>
        <Image
          src={matchingPlace.image}
          sizes="100vw"
          style={{
            width: "100%",
            height: "auto",
          }}
          width="0"
          height="0"
          alt={matchingPlace.name}
          loading="lazy"
        />
        <StyledCardBody>
          <StyledTitle>{matchingPlace.name}</StyledTitle>
          <FavoriteButton
            id={id}
            isFavorite={isFavorite}
            toggleFavorite={toggleFavorite}
          />
          <StyledInfo>
            {matchingPlace.region} &#183; &nbsp;
            {matchingPlace.activities
              .map((activity) => activity.activityname)
              .join(", ")}
          </StyledInfo>
          <p>
            Description: <br /> {matchingPlace.description}
          </p>
          <p>
            Reviews: <br />
            {matchingPlace.reviews.map((review) => review.review).join(", ")}
          </p>
        </StyledCardBody>
      </StyledCard>
    </StyledSection>
  );
}

export const StyledCard = styled.article`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
  grid-column-gap: 0;
  grid-row-gap: 0;
  padding: var(--main-padding-mobile);
  @media only screen and (min-width: 600px) {
    padding: var(--card-padding-desktop);
  }
`;

export const StyledLink = styled(Link)`
  display: block;
  padding: var(--main-padding-mobile);
  @media only screen and (min-width: 600px) {
    padding: 2em 8em 0;
  }
`;

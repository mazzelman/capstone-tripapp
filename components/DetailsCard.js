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
import CommentForm from "./CommentForm";

export default function DetailsCard({
  id,
  isFavorite,
  toggleFavorite,
  place,
  newCommentDummy,
}) {
  const {
    _id,
    name,
    description,
    region,
    image,
    temperature,
    reviews,
    activities,
  } = place;
  // console.log(place);
  return (
    <StyledSection>
      <StyledLink href="/">
        <FontAwesomeIcon icon={faChevronLeftSolid} size="xs" fixedWidth />
        <span>go back</span>
      </StyledLink>
      <StyledCard key={_id}>
        <Image
          src={image}
          sizes="100vw"
          style={{
            width: "100%",
            height: "auto",
          }}
          width="0"
          height="0"
          alt={name}
          loading="lazy"
        />
        <StyledCardBody>
          <StyledTitle>{name}</StyledTitle>
          <FavoriteButton
            id={_id}
            isFavorite={isFavorite}
            toggleFavorite={toggleFavorite}
          />
          <StyledInfo>
            {region} &#183; &nbsp;
            {activities.map((activity) => activity.activityname).join(", ")}
          </StyledInfo>
          <p>
            Description: <br /> {description}
          </p>
          <p>
            Reviews: <br />
            {reviews.map((review) => review.review).join(", ")}
          </p>
        </StyledCardBody>
      </StyledCard>
      <CommentForm newCommentDummy={newCommentDummy} />
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

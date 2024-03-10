import styled from "styled-components";
import Link from "next/link";
import Image from "next/image";
import FavoriteButton from "./FavoriteButton";

export default function PreviewCard({
  formResults,
  favoritePlaces,
  onToggleFavorite,
}) {
  return (
    <>
      {formResults.map(({ id, name, activity, region, image }) => (
        <StyledCard key={id}>
          <Link href={`/places/${id}`}>
            <StyledCardImage
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
          </Link>
          <StyledCardBody>
            <Link href={`/places/${id}`}>
              <StyledTitle>{name}</StyledTitle>
            </Link>
            <FavoriteButton
              id={id}
              favoritePlaces={favoritePlaces}
              onToggleFavorite={onToggleFavorite}
            />
            <StyledInfo>
              {region} &#183; {activity.join(", ")}
            </StyledInfo>
          </StyledCardBody>
        </StyledCard>
      ))}
    </>
  );
}

export const StyledCard = styled.article`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
  grid-column-gap: 0;
  grid-row-gap: 0;
`;

export const StyledCardImage = styled(Image)`
  border-top-left-radius: 0.3em;
  border-top-right-radius: 0.3em;
`;

export const StyledCardBody = styled.div`
  position: relative;
  padding: 1em;
  background-color: var(--secondary-color-background);
  border-bottom-left-radius: 0.3em;
  border-bottom-right-radius: 0.3em;
`;

export const StyledTitle = styled.h3`
  margin-top: 0.5em;
  margin-bottom: 0.2em;
`;

export const StyledInfo = styled.p`
  color: var(--primary-disabled-color);
  margin-top: 0;
`;

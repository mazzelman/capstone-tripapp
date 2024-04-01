import Link from "next/link";
import Image from "next/image";
// import components

// import components for styles
import styled from "styled-components";

export default function Minicard({ place }) {
  const { _id, name, image } = place;

  return (
    <StyledCardArticle>
      <Link href={`/places/${_id}`}>
        <StyledCardImage
          src={image}
          sizes="100vw"
          width="0"
          height="0"
          alt={name}
          loading="lazy"
        />
      </Link>
      <StyledCardBody>
        <Link href={`/places/${_id}`}>
          <StyledCardTitle>{place.name}</StyledCardTitle>
        </Link>
      </StyledCardBody>
    </StyledCardArticle>
  );
}

export const StyledCardArticle = styled.article`
  display: flex;
  flex-direction: row;
  background-color: var(--secondary-color-background);
  border-bottom-left-radius: 0.3em;
  border-bottom-right-radius: 0.3em;
`;

export const StyledCardBody = styled.article`
  padding: 1em;
  position: relative;
`;

export const StyledCardImage = styled(Image)`
  border-top-left-radius: 0.3em;
  border-top-right-radius: 0.3em;
  width: 30%;
  height: auto;
  border-radius: 2px;
`;

export const StyledCardTitle = styled.h3`
  margin-bottom: 0.3em;
`;

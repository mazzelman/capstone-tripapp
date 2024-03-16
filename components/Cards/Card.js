// import general things to run the app
import Link from "next/link";
import Image from "next/image";
// import components for styles
import styled from "styled-components";

export default function Card({ $spotlight, place }) {
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

  return (
    <StyledCardArticle $spotlight={$spotlight}>
      <Link href={`/places/${_id}`}>
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
        <Link href={`/places/${_id}`}>
          <StyledCardTitle>{place.name}</StyledCardTitle>
        </Link>
        <StyledCardSubHeading>
          {region} &#183; &nbsp;
          {activities.map((activity) => activity.activityname).join(", ")}
        </StyledCardSubHeading>
      </StyledCardBody>
    </StyledCardArticle>
  );
}

export const StyledCardArticle = styled.article`
  background-color: ${(props) =>
    props.$spotlight
      ? "rgba(244, 177, 87, 0.3)"
      : "var(--secondary-color-background)"};
  border-bottom-left-radius: 0.3em;
  border-bottom-right-radius: 0.3em;
`;

export const StyledCardBody = styled.article`
  padding: 1em;
`;

export const StyledCardImage = styled(Image)`
  border-top-left-radius: 0.3em;
  border-top-right-radius: 0.3em;
`;

export const StyledCardTitle = styled.h3`
  margin-bottom: 0.3em;
`;

export const StyledCardSubHeading = styled.span`
  font-size: 0.9em;
  color: var(--primary-disabled-color);
  margin-top: 0;
`;

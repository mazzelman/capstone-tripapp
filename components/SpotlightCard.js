import styled from "styled-components";
import Image from "next/image";
import Link from "next/link";

export default function SpotlightCard({ randomSurprise }) {
  return (
    <StyledCard key={randomSurprise.id}>
      <h3>Surprise Card!</h3>
      <Image
        src={randomSurprise.image}
        sizes="100vw"
        style={{
          width: "100%",
          height: "auto",
        }}
        width="0"
        height="0"
        alt={randomSurprise.name}
        loading="lazy"
      />
      <Link href={`/places/${randomSurprise.id}`}>
        <h3>{randomSurprise.name}</h3>
      </Link>
      <p>Region: {randomSurprise.region}</p>
      <p>
        Activity:{" "}
        {Array.isArray(randomSurprise.activity)
          ? randomSurprise.activity.join(", ")
          : randomSurprise.activity}
      </p>
      <p>Description: {randomSurprise.description}</p>
    </StyledCard>
  );
}

export const StyledCard = styled.div`
  margin: 1em 0;
  padding: var(--main-padding);
  border: 3px solid aliceblue;
  border-radius: 8px;
  background-color: blanchedalmond;
`;

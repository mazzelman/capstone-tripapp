import styled from "styled-components";
import Image from "next/image";

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
      <h3>{randomSurprise.name}</h3>
      <p>Region: {randomSurprise.region}</p>
      <p>Activity: {randomSurprise.activity}</p>
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

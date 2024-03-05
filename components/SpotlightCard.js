import { StyledCard } from "./PreviewCard";
import Image from "next/image";

export default function SpotlightCard({ randomSurprise }) {
  return (
    <StyledCard key={randomSurprise.id}>
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

import { StyledCard } from "./PreviewCard";
import Image from "next/image";
import Link from "next/link";

export default function DetailsCard({ matchingPlace }) {
  return (
    <>
      <Link href="/">back</Link>
      <StyledCard key={matchingPlace.id}>
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
        <h3>{matchingPlace.name}</h3>
        <p>Region: {matchingPlace.region}</p>
        <p>Activity: {matchingPlace.activity}</p>
        <p>Description: {matchingPlace.description}</p>
      </StyledCard>
    </>
  );
}

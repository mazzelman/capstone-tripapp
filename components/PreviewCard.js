import styled from "styled-components";
import Link from "next/link";
import Image from "next/image";

export default function PreviewCard({ formResults }) {
  return (
    <>
      {formResults.map(({ id, name, activity, region, image }) => (
        <StyledCard key={id}>
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
          <Link href={`/places/${id}`}>
            <h3>{name}</h3>
          </Link>
          <p>Region: {region}</p>
          <p>
            Activity: {Array.isArray(activity) ? activity.join(", ") : activity}
          </p>
        </StyledCard>
      ))}
    </>
  );
}

export const StyledCard = styled.div`
  margin: 1em 0;
  padding: var(--main-padding);
  border: 3px solid aliceblue;
  border-radius: 8px;
`;

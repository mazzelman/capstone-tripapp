import styled from "styled-components";

export default function PreviewCard({ formResults }) {
  return (
    <>
      {formResults.map(({ id, name, activity, region }) => (
        <StyledCard key={id}>
          <h3>{name}</h3>
          <p>Region: {region}</p>
          <p>Activity: {activity}</p>
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

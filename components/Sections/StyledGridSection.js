import styled from "styled-components";

export default function StyledGridSection({ children }) {
  return <StyledSection>{children}</StyledSection>;
}

export const StyledSection = styled.section`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
  grid-column-gap: 1em;
  grid-row-gap: 1em;
  margin: var(--main-margin-s-mobile);
  @media only screen and (min-width: 600px) {
    margin: var(--main-margin-s-desktop);
    grid-template-columns: repeat(2, 1fr);
  }
`;

import styled from "styled-components";

export default function StyledPrimarySection({ children }) {
  return <StyledSection>{children}</StyledSection>;
}

export const StyledSection = styled.section`
  margin: var(--main-margin-s-mobile);
  @media only screen and (min-width: 600px) {
    margin: var(--main-margin-s-desktop);
  }
`;

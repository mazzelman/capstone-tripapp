import styled from "styled-components";

export default function StyledSecondarySection({ $textAlign, children }) {
  return <StyledSection $textAlign={$textAlign}>{children}</StyledSection>;
}

export const StyledSection = styled.section`
  text-align: ${(props) => (props.$textAlign ? "center" : "left")};
  margin: var(--main-margin-s-mobile);
  @media only screen and (min-width: 600px) {
    margin: var(--main-margin-xl-desktop);
  }
`;

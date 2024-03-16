import styled from "styled-components";

export default function StyledSecondarySectionCenter({ children }) {
  return <StyledSection>{children}</StyledSection>;
}

export const StyledSection = styled.section`
  text-align: center;
  margin: var(--main-margin-s-mobile);
  @media only screen and (min-width: 600px) {
    margin: var(--main-margin-xl-desktop);
  }
`;

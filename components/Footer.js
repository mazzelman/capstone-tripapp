import styled from "styled-components";

export default function Footer() {
  return (
    <StyledFooter>
      <StyledFooterInner>I´m the footer</StyledFooterInner>
    </StyledFooter>
  );
}

export const StyledFooter = styled.footer`
  background-color: lightblue;
`;

export const StyledFooterInner = styled.div`
  max-width: var(--max-with);
  padding: var(--main-padding);
  margin: var(--main-margin);
`;

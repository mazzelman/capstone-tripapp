import Link from "next/link";
import styled from "styled-components";

export default function Header() {
  return (
    <StyledHeader>
      <StyledHeaderInner>
        <StyledLogo href="/">Trip and bla</StyledLogo>
      </StyledHeaderInner>
    </StyledHeader>
  );
}

export const StyledHeader = styled.header`
  background-color: lightcoral;
`;

export const StyledLogo = styled(Link)`
  color: #ffffff;
  font-weight: 600;
  text-decoration: none;
`;

export const StyledHeaderInner = styled.div`
  max-width: var(--max-with);
  padding: var(--main-padding);
  margin: var(--main-margin);
`;

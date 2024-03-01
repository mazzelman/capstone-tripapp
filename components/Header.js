import styled from "styled-components";

export default function Header() {
  return (
    <StyledHeader>
      <StyledHeaderInner>I´m the header</StyledHeaderInner>
    </StyledHeader>
  );
}

export const StyledHeader = styled.header`
  background-color: lightcoral;
`;

export const StyledHeaderInner = styled.div`
  max-width: var(--max-with);
  margin: var(--main-margin);
`;

// import components for styles
import styled from "styled-components";

export default function Divider() {
  return <StyledDivider />;
}

export const StyledDivider = styled.hr`
  margin: 2em;
  border: 1px solid var(--secondary-color-background);
`;

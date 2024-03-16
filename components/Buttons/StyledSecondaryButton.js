import styled from "styled-components";

export default function StyledSecondaryButton({ children, ...props }) {
  return <StyledButton {...props}>{children}</StyledButton>;
}

export const StyledButton = styled.button`
  color: var(--primary-color);
  background-color: var(--secondary-color-background);
  padding: 0.5em;
  border: 1px solid var(--primary-color);
  border-radius: 0.3em;
  cursor: pointer;
  &:hover {
    color: var(--secondary-color-background);
    background-color: var(--primary-color);
    transition: 500ms ease-in-out;
  }
`;

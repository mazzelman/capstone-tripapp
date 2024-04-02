import styled from "styled-components";

export default function StyledDeleteButton({ children, ...props }) {
  return <StyledButton {...props}>{children}</StyledButton>;
}

export const StyledButton = styled.button`
  color: var(--delete-color);
  background-color: var(--secondary-color-background);
  padding: 0.5em;
  border: 1px solid var(--delete-color);
  border-radius: 0.3em;
  cursor: pointer;
  &:hover {
    color: var(--secondary-color-background);
    background-color: var(--delete-color);
    transition: 500ms ease-in-out;
  }
`;

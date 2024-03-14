import styled from "styled-components";
import { useSession, signIn, signOut } from "next-auth/react";

export default function LoginButton() {
  const { data: session } = useSession();

  if (session) {
    return (
      <StyledPrimaryButton type="button" onClick={() => signOut()}>
        Sign out
      </StyledPrimaryButton>
    );
  } else {
    return (
      <StyledPrimaryButton type="button" onClick={() => signIn()}>
        Sign in
      </StyledPrimaryButton>
    );
  }
}

export const StyledPrimaryButton = styled.button`
  flex-grow: 1;
  color: var(--secondary-color-background);
  background-color: var(--primary-color);
  padding: 0.5em;
  border: 1px solid var(--primary-color);
  border-radius: 0.3em;
  cursor: pointer;
  &:hover {
    color: var(--primary-color);
    background-color: var(--secondary-color-background);
    transition: 500ms ease-in-out;
  }
`;

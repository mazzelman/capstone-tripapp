import styled from "styled-components";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Footer({
  activePage,
  setActivePage,
  toggleActivePage,
}) {
  const router = useRouter();
  return (
    <StyledFooter>
      <StyledFooterInner>
        <nav>
          <StyledNavigationUl>
            <li>
              <StyledNavigationLink
                href="/"
                $active={router.pathname === "/"}
                onClick={toggleActivePage}
              >
                Home
              </StyledNavigationLink>
            </li>
            <li>
              <StyledNavigationLink
                href="/favorites"
                $active={router.pathname === "/favorites"}
                onClick={toggleActivePage}
              >
                Favorites
              </StyledNavigationLink>
            </li>
            <li>
              <StyledNavigationLink
                href="/profile"
                $active={router.pathname === "/profile"}
                onClick={toggleActivePage}
              >
                Profile
              </StyledNavigationLink>
            </li>
          </StyledNavigationUl>
        </nav>
      </StyledFooterInner>
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

export const StyledNavigationUl = styled.ul`
  list-style-type: none;
  display: flex;
  justify-content: space-around;
  padding-left: 0;
  gap: 1rem;
  @media only screen and (min-width: 600px) {
    display: none;
  }
`;

export const StyledNavigationLink = styled(Link)`
  text-decoration: ${(props) => (props.$active ? "underline" : "none")};
  color: white;
  &:hover {
    text-decoration: underline;
  }
`;

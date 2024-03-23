// import general things to run the app
import Link from "next/link";
import { useRouter } from "next/router";
// import components for styles
import styled from "styled-components";
// import components for styles
import { navigationLinks } from "@/lib/navigation";

export default function Header({ togglePageActive }) {
  const router = useRouter();
  return (
    <StyledHeader>
      <StyledHeaderInner>
        <StyledLogo href="/">Trip and bla</StyledLogo>
        <nav>
          <StyledNavigationUl>
            {navigationLinks.map((link) =>
              link.isHeader ? (
                <li key={link.id}>
                  <StyledNavigationLink
                    href={link.href}
                    $active={router.pathname === link.href}
                    onClick={togglePageActive}
                  >
                    {link.name}
                  </StyledNavigationLink>
                </li>
              ) : null
            )}
          </StyledNavigationUl>
        </nav>
      </StyledHeaderInner>
    </StyledHeader>
  );
}

export const StyledHeader = styled.header`
  background-color: var(--secondary-color-background);
`;

export const StyledHeaderInner = styled.div`
  display: flex;
  justify-content: space-between;
  max-width: var(--max-with);
  padding: var(--main-padding-mobile);
  margin: var(--main-margin);
  align-items: center;
  @media only screen and (min-width: 600px) {
    padding: var(--main-padding-desktop);
  }
`;

export const StyledLogo = styled(Link)`
  color: var(--primary-color);
  font-size: 1.2em;
  font-weight: 700;
  text-decoration: none;
`;

export const StyledNavigationUl = styled.ul`
  list-style-type: none;
  display: flex;
  padding-left: 0;
  gap: 1rem;
  @media only screen and (max-width: 600px) {
    display: none;
  }
`;

export const StyledNavigationLink = styled(Link)`
  color: var(--primary-color);
  text-decoration: ${(props) => (props.$active ? "underline" : "none")};
  font-weight: ${(props) => (props.$active ? "700" : "400")};
  &:hover {
    text-decoration: underline;
  }
`;

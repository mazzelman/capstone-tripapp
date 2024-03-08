import styled from "styled-components";
import Link from "next/link";
import { useRouter } from "next/router";
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
  background-color: lightcoral;
`;

export const StyledLogo = styled(Link)`
  color: #ffffff;
  font-weight: 600;
  text-decoration: none;
`;

export const StyledHeaderInner = styled.div`
  display: flex;
  justify-content: space-between;
  max-width: var(--max-with);
  padding: var(--main-padding);
  margin: var(--main-margin);
  align-items: center;
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
  text-decoration: ${(props) => (props.$active ? "underline" : "none")};
  color: white;
  &:hover {
    text-decoration: underline;
  }
`;

import styled from "styled-components";
import Link from "next/link";
import { useRouter } from "next/router";
import { navigationLinks } from "@/lib/navigation";

export default function Footer({ togglePageActive }) {
  const router = useRouter();
  return (
    <StyledFooter>
      <StyledFooterInner>
        <nav>
          <StyledNavigationUl>
            {navigationLinks.map((link) =>
              link.isFooter ? (
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
      </StyledFooterInner>
    </StyledFooter>
  );
}

export const StyledFooter = styled.footer`
  background-color: lightblue;
`;

export const StyledFooterInner = styled.div`
  max-width: var(--max-with);
  padding: var(--main-padding-mobile);
  margin: var(--main-margin);
  @media only screen and (min-width: 600px) {
    padding: var(--main-padding-desktop);
  }
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

import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useRouter } from "next/router";
import { navigationLinks } from "@/lib/navigation";

export default function Footer({ togglePageActive }) {
  const router = useRouter();
  return (
    <StyledFooter>
      <StyledFooterInner>
        <StyledDesktopFooter>
          Copyleft &#183; 2024
          <Link href="/">legal</Link>
        </StyledDesktopFooter>
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
                    <FontAwesomeIcon icon={link.icon} />
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
  background-color: var(--secondary-color-background);
  @media only screen and (max-width: 600px) {
    width: 100%;
    position: fixed;
    bottom: 0;
  }
`;

export const StyledFooterInner = styled.div`
  max-width: var(--max-with);
  padding: var(--main-padding-mobile);
  margin: var(--main-margin);
  @media only screen and (min-width: 600px) {
    padding: var(--main-padding-desktop);
  }
`;

export const StyledDesktopFooter = styled.div`
  color: var(--primary-color);
  font-size: 0.9em;
  display: flex;
  justify-content: space-between;
  padding: 1em 0;
  @media only screen and (max-width: 600px) {
    display: none;
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
  text-decoration: none;
  color: ${(props) =>
    props.$active ? "var(--primary-color)" : "var(--primary-disabled-color)"};
`;

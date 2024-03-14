import styled from "styled-components";
import { StyledSection } from "./favorites";
import Image from "next/image";
import { useSession } from "next-auth/react";
import LoginButton from "@/components/LoginButton";

export default function Profile() {
  const { data: session } = useSession();

  if (session) {
    return (
      <>
        <StyledSection>
          <StyledArticle>
            <h2>{session.user.name}</h2>
            <StyledProfilePicture
              src={session.user.image}
              width={200}
              height={200}
              alt="profile picture"
            />
          </StyledArticle>
        </StyledSection>
        <StyledSection>
          <StyledArticle>
            <LoginButton />
          </StyledArticle>
        </StyledSection>
      </>
    );
  } else {
    return (
      <>
        <StyledSection>
          <StyledArticle>
            <h2>Lizzy Lazycat</h2>
            <Image
              src={"/images/profile-placeholder.png"}
              width={200}
              height={200}
              alt="profile picture"
            />
          </StyledArticle>
        </StyledSection>
        <StyledSection>
          <StyledArticle>
            <LoginButton />
          </StyledArticle>
        </StyledSection>
      </>
    );
  }
}

export const StyledArticle = styled.article`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  padding: var(--main-padding-mobile);
  @media only screen and (min-width: 600px) {
    padding: 1em 8em;
  }
`;

export const StyledProfilePicture = styled(Image)`
  border-radius: 50%;
`;

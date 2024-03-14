import styled from "styled-components";
import { StyledSection } from "./favorites";
import Image from "next/image";
import LoginButton from "@/components/LoginButton";

export default function Profile() {
  return (
    <StyledSection>
      <LoginButton />
      <StyledArticle>
        <h2>Lizzy Lazycat</h2>
        <Image
          src={"/images/profile-placeholder.png"}
          width={200}
          height={200}
          alt="profile picture"
        />

        <div>
          <h3>About me:</h3>
          <p>
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
            commodo ligula eget dolor. Aenean massa. Cum sociis natoque
            penatibus et magnis dis parturient montes, nascetur ridiculus mus.
            Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.
            Nulla consequat massa quis enim.{" "}
          </p>
        </div>
      </StyledArticle>
    </StyledSection>
  );
}

export const StyledArticle = styled.article`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  padding: var(--main-padding-mobile);
  @media only screen and (min-width: 600px) {
    padding: var(--card-padding-desktop);
  }
`;

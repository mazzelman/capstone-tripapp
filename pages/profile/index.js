// import general things to run the app
import Image from "next/image";
import useSWR from "swr";
import { useSession } from "next-auth/react";
// import components
import LoginButton from "@/components/Buttons/LoginButton";
import Wrapper700 from "@/components/Partials/Wrapper700";
import Card from "@/components/Cards/Card";
// import components for styles
import styled from "styled-components";
import StyledPrimarySection from "@/components/Sections/StyledPrimarySection";
import StyledTertiarySection from "@/components/Sections/StyledTertiarySection";
import Divider from "@/components/dividers/divider";
import FormAboutMe from "@/components/Forms/FormAboutme";

export default function Profile() {
  const session = useSession();
  const userId = session.data?.user.id;

  const {
    data: user,
    error,
    isLoading,
  } = useSWR(userId ? `/api/user/${userId}` : null);

  console.log(user);

  const handleDelete = async (user) => {
    try {
      const response = await fetch(`/api/user`, {
        method: "DELETE",
      });
      if (response.ok) {
        window.alert("Text deleted successfully");
      } else {
        window.alert("Failed to delete text");
      }
    } catch (error) {
      window.alert("Error deleting text:", error);
    }
  };

  if (!session.data) {
    return (
      <StyledTertiarySection $textAlign={true}>
        <h2>Please sign in.</h2>
        <LoginButton />
      </StyledTertiarySection>
    );
  }

  if (error)
    return (
      <StyledTertiarySection $textAlign={true}>
        <h2>failed to load</h2>
      </StyledTertiarySection>
    );
  if (isLoading)
    return (
      <StyledTertiarySection $textAlign={true}>
        <h2>loading...</h2>
      </StyledTertiarySection>
    );

  if (session) {
    return (
      <Wrapper700>
        <StyledPrimarySection>
          <StyledArticle>
            <StyledUserName>{session.data.user.name}</StyledUserName>
            <StyledProfilePicture
              src={session.data.user.image}
              width={100}
              height={100}
              alt="profile picture"
            />
          </StyledArticle>
        </StyledPrimarySection>

        <StyledPrimarySection>
          {user.aboutmetext.length > 0 ? (
            <StyledArticle>
              <h2>About Me:</h2>
              {user.aboutmetext}
              <button type="button" name="deleteAboutMe" onClick={handleDelete}>
                Delete
              </button>
            </StyledArticle>
          ) : (
            <FormAboutMe user={user} />
          )}
        </StyledPrimarySection>

        <StyledPrimarySection>
          <StyledArticle>
            <LoginButton />
          </StyledArticle>
        </StyledPrimarySection>
        <Divider />
        <StyledPrimarySection>
          <h2>Created places</h2>
        </StyledPrimarySection>
        {user.createdPlaces.map((place) => {
          return (
            <StyledPrimarySection key={place._id}>
              <Card place={place} />
            </StyledPrimarySection>
          );
        })}
      </Wrapper700>
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
    padding: 1em 0em;
  }
`;

export const StyledUserName = styled.h2`
  margin-bottom: 0;
`;

export const StyledProfilePicture = styled(Image)`
  border-radius: 50%;
`;

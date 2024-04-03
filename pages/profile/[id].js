// import general things to run the app
import useSWR from "swr";
import { useRouter } from "next/router";
// import components
import MiniCard from "@/components/Cards/MiniCard";
import Divider from "@/components/dividers/divider";
import Wrapper700 from "@/components/Partials/Wrapper700";
// import components for styles
import styled from "styled-components";
import StyledPrimarySection from "@/components/Sections/StyledPrimarySection";
import { StyledArticle, StyledProfilePicture, StyledUserName } from ".";
import StyledTertiarySection from "@/components/Sections/StyledTertiarySection";

export default function OpenProfile() {
  const router = useRouter();
  const { id } = router.query;

  const {
    data: user,
    error: userError,
    isLoading: userIsLoading,
  } = useSWR(id ? `/api/user/${id}` : null);

  if (userIsLoading) {
    return (
      <StyledTertiarySection>
        <h2>Loading...</h2>
      </StyledTertiarySection>
    );
  }

  if (userError) {
    return (
      <StyledTertiarySection>
        <h2>Error loading user data...</h2>
      </StyledTertiarySection>
    );
  }

  return (
    <Wrapper700>
      <StyledPrimarySection>
        <StyledArticle>
          <StyledUserName>{user.name}</StyledUserName>
          <StyledProfilePicture
            src={user.image}
            width={100}
            height={100}
            alt="profile picture"
          />
        </StyledArticle>
      </StyledPrimarySection>
      <StyledPrimarySection>
        {user.aboutmetext.length > 0 && (
          <>
            <h3>About Me:</h3>
            <StyledAboutMe>{user.aboutmetext}</StyledAboutMe>
          </>
        )}
      </StyledPrimarySection>
      <Divider />
      <StyledPrimarySection>
        <h2>Created trips </h2>
      </StyledPrimarySection>

      {user.createdPlaces.map((place) => {
        return (
          <StyledPrimarySection key={place._id}>
            <MiniCard place={place} />
          </StyledPrimarySection>
        );
      })}
    </Wrapper700>
  );
}

export const StyledAboutMe = styled.div`
  padding: var(--main-padding);
  background-color: var(--secondary-color-background);
  border-radius: var(--border-radius);
`;

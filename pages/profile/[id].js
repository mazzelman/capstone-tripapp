import useSWR from "swr";
import { useRouter } from "next/router";
import Wrapper700 from "@/components/Partials/Wrapper700";
import Minicard from "@/components/Cards/MiniCard";
// import components for styles
import StyledPrimarySection from "@/components/Sections/StyledPrimarySection";
import Divider from "@/components/dividers/divider";
import { StyledArticle, StyledProfilePicture, StyledUserName } from ".";
import styled from "styled-components";

export default function OpenProfile() {
  const router = useRouter();
  const { id } = router.query;

  const {
    data: user,
    error: userError,
    isLoading: userIsLoading,
  } = useSWR(`/api/user/${id}`);

  if (userIsLoading) {
    return <div>Loading...</div>;
  }

  if (userError) {
    return <div>Error loading user data...</div>;
  }

  return (
    <>
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
          <StyledArticle></StyledArticle>
        </StyledPrimarySection>
        <Divider />
        <StyledPrimarySection>
          <h2>Created places</h2>
        </StyledPrimarySection>

        {user.createdPlaces.map((place) => {
          return (
            <StyledPrimarySection key={place._id}>
              <Minicard place={place} />
            </StyledPrimarySection>
          );
        })}
      </Wrapper700>
    </>
  );
}

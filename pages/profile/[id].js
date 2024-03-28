import useSWR from "swr";
import { useRouter } from "next/router";
import Wrapper700 from "@/components/Partials/Wrapper700";
import Card from "@/components/Cards/Card";
// import components for styles

import StyledPrimarySection from "@/components/Sections/StyledPrimarySection";

import Divider from "@/components/dividers/divider";
import { StyledArticle, StyledProfilePicture, StyledUserName } from ".";

export default function OpenProfile() {
  const router = useRouter();
  const { id } = router.query;

  const {
    data: user,
    error: userError,
    isLoading: userIsLoading,
  } = useSWR(`/api/user/`);

  if (userIsLoading) {
    return <div>Loading...</div>;
  }

  if (userError) {
    return <div>Error loading user data...</div>;
  }

  const singleUser = user.find((user) => id === user._id);

  //console.log(singleUser);

  return (
    <>
      <Wrapper700>
        <StyledPrimarySection>
          <StyledArticle>
            <StyledUserName>{singleUser.name}</StyledUserName>
            <StyledProfilePicture
              src={singleUser.image}
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
        {singleUser.createdPlaces.map((place) => {
          return (
            <StyledPrimarySection key={place._id}>
              <Card place={place} />
            </StyledPrimarySection>
          );
        })}
      </Wrapper700>
    </>
  );
}

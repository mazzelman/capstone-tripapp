// import general things to run the app
import useSWR from "swr";
import { useSession } from "next-auth/react";
// import components
import AddPlaces from "@/components/Forms/FormAddPlaces";
import Wrapper700 from "@/components/Partials/Wrapper700";
import LoginButton from "@/components/Buttons/LoginButton";
// import components for styles
import StyledPrimarySection from "@/components/Sections/StyledPrimarySection";
import StyledTertiarySection from "@/components/Sections/StyledTertiarySection";

export default function OwnPlaces({ getUniqueValues }) {
  const session = useSession();
  const userId = session.data?.user.id;

  const {
    data: user,
    error,
    isLoading,
  } = useSWR(userId ? `/api/user/${userId}` : null);

  if (!session.data) {
    return (
      <StyledTertiarySection $textAlign={true}>
        <h2>Please sign in to add your trips.</h2>
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

  return (
    <>
      <Wrapper700>
        <StyledPrimarySection></StyledPrimarySection>
        <AddPlaces getUniqueValues={getUniqueValues} />
      </Wrapper700>
    </>
  );
}

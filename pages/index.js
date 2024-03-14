import styled from "styled-components";
import Form from "@/components/Form";
import SpotlightCard from "@/components/SpotlightCard";
import PreviewCard from "@/components/PreviewCard";
import { useSession } from "next-auth/react";
export default function HomePage({
  formResults,
  setFormResults,
  handleResults,
  getUniqueValues,
  places,
  randomSurprise,
  setRandomSurprise,
  handleSurprise,
}) {
  return (
    <>
      <Form
        formResults={formResults}
        setFormResults={setFormResults}
        handleResults={handleResults}
        getUniqueValues={getUniqueValues}
        places={places}
        randomSurprise={randomSurprise}
        setRandomSurprise={setRandomSurprise}
        handleSurprise={handleSurprise}
      />
      {formResults === -1 && (
        <StyledSectionEmpty>
          <h2>no matches...</h2>
        </StyledSectionEmpty>
      )}
      {!formResults && (
        <StyledSectionEmpty>
          <h2>Howdy, and welcome to our site!</h2>
          <p>
            At the moment you can search for a region, or an activity. Or both
            if you like. If you find a bug, or want to give feedback, please
            leave a comment at github.
            <br /> Thanks, the Travel App Team Jeanny, Jeanette and Marcel.
          </p>
        </StyledSectionEmpty>
      )}
      {formResults.length > 0 && (
        <StyledAvailableTrips>Available trips:</StyledAvailableTrips>
      )}
      <StyledSection>
        {randomSurprise ? (
          <SpotlightCard
            randomSurprise={randomSurprise}
            // toggleFavorite={toggleFavorite}
          />
        ) : null}
        {formResults.length > 0 && (
          <PreviewCard
            formResults={formResults}
            // toggleFavorite={toggleFavorite}
          />
        )}
      </StyledSection>
    </>
  );
}

export const StyledSection = styled.section`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
  grid-column-gap: 1em;
  grid-row-gap: 1em;
  padding: var(--main-padding-mobile);
  @media only screen and (min-width: 600px) {
    grid-template-columns: repeat(2, 1fr);
    padding: var(--main-padding-desktop);
  }
`;

export const StyledSectionEmpty = styled.section`
  text-align: center;
  padding: var(--main-padding-mobile);
  @media only screen and (min-width: 600px) {
    padding: var(--card-padding-desktop);
  }
`;

export const StyledAvailableTrips = styled.h4`
  margin-bottom: 0;
  padding: var(--main-padding-mobile);
  @media only screen and (min-width: 600px) {
    padding: var(--main-padding-desktop);
  }
`;

// import components
import Form from "@/components/Forms/Form";
import Card from "@/components/Cards/Card";
import { navigationLinks } from "@/lib/navigation";
import Link from "next/link";
// import components for styles
import styled from "styled-components";
import StyledSecondarySection from "@/components/Sections/StyledSecondarySection";
import StyledTertiarySection from "@/components/Sections/StyledTertiarySection";
import StyledGridSection from "@/components/Sections/StyledGridSection";
import Wrapper700 from "@/components/Partials/Wrapper700";

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
        <StyledTertiarySection $textAlign={true}>
          <h2>no matches...</h2>
        </StyledTertiarySection>
      )}
      {!formResults && !randomSurprise ? (
        <Wrapper700>
          <StyledSecondarySection $textAlign={true}>
            <StyledHeroTitle>Travel with us, around the world!</StyledHeroTitle>
            <StyledHeroText>
              Hello and welcome to our travel website! We are here to help you
              find the best places to visit around the world. You can search for
              places based on your preferences or let us surprise you with a
              random destination. <strong>Enjoy</strong> your trip!
            </StyledHeroText>
            <StyledPillsWrapper>
              {navigationLinks.map((link) =>
                link.isHeader ? (
                  <StyledPills key={link.id} href={link.href}>
                    {link.name}
                  </StyledPills>
                ) : null
              )}
            </StyledPillsWrapper>
          </StyledSecondarySection>
        </Wrapper700>
      ) : null}
      {formResults.length > 0 || randomSurprise ? (
        <StyledSecondarySection>
          <h4>Available trips:</h4>
        </StyledSecondarySection>
      ) : null}

      {randomSurprise || formResults.length > 0 ? (
        <StyledGridSection>
          {randomSurprise ? (
            <Card $spotlight={true} place={randomSurprise} />
          ) : null}
          {formResults.length > 0 &&
            formResults.map((place) => {
              return <Card key={place._id} place={place} />;
            })}
        </StyledGridSection>
      ) : null}
    </>
  );
}

export const StyledHeroTitle = styled.h1`
  font-size: 1.5em;
  @media only screen and (min-width: 600px) {
    font-size: 2.5em;
  }
`;

export const StyledHeroText = styled.p`
  font-size: 1em;
  @media only screen and (min-width: 600px) {
    font-size: 1.2em;
  }
`;

export const StyledPillsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1em;
  justify-content: center;
  margin-top: 2.5em;
`;

export const StyledPills = styled(Link)`
  color: var(--secondary-color-background);
  background-color: var(--primary-color);
  padding: 0.4em 1em;
  border-radius: var(--border-radius);
  &:hover {
    text-decoration: none;
    background-color: var(--secondary-color);
    transition: 500ms ease-in-out;
  }
`;

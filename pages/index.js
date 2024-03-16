// import components
import Form from "@/components/Forms/Form";
import Card from "@/components/Cards/Card";
// import components for styles
import StyledSecondarySection from "@/components/Sections/StyledSecondarySection";
import StyledTertiarySectionCenter from "@/components/SectionsCentered/StyledTertiarySectionCenter";
import StyledGridSection from "@/components/Sections/StyledGridSection";

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
        <StyledTertiarySectionCenter>
          <h2>no matches...</h2>
        </StyledTertiarySectionCenter>
      )}
      {!formResults && !randomSurprise ? (
        <StyledTertiarySectionCenter>
          <h2>Howdy, and welcome to our site!</h2>
          <p>
            At the moment you can search for a region, or an activity. Or both
            if you like. If you find a bug, or want to give feedback, please
            leave a comment at github.
            <br /> Thanks, the Travel App Team Jeanny, Jeanette and Marcel.
          </p>
        </StyledTertiarySectionCenter>
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

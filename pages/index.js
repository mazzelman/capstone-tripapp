import Form from "@/components/Form";
import SpotlightCard from "@/components/SpotlightCard";
import PreviewCard from "@/components/PreviewCard";

export default function HomePage({
  formResults,
  setFormResults,
  handleResults,
  getUniqueValues,
  places,
  randomSurprise,
  setRandomSurprise,
  handleSurprise,
  isFavorite,
  favoritePlaces,
  onToggleFavorite,
}) {
  return (
    <div>
      <h1>Create your Trip!</h1>
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
      {randomSurprise ? (
        <SpotlightCard
          randomSurprise={randomSurprise}
          favoritePlaces={favoritePlaces}
          onToggleFavorite={onToggleFavorite}
        />
      ) : null}
      {formResults.length > 0 && (
        <PreviewCard
          formResults={formResults}
          isFavorite={isFavorite}
          favoritePlaces={favoritePlaces}
          onToggleFavorite={onToggleFavorite}
        />
      )}
      {formResults === -1 && <h2>no matches...</h2>}
    </div>
  );
}

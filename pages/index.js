import Form from "@/components/Form";

export default function HomePage({
  formResults,
  setFormResults,
  handleResults,
  getUniqueRegions,
  getUniqueActivities,
  places,
  randomSurprise,
  setRandomSurprise,
  handleSurprise,
}) {
  return (
    <div>
      <h1>Create your Trip!</h1>
      <Form
        formResults={formResults}
        setFormResults={setFormResults}
        handleResults={handleResults}
        getUniqueRegions={getUniqueRegions}
        getUniqueActivities={getUniqueActivities}
        places={places}
        randomSurprise={randomSurprise}
        setRandomSurprise={setRandomSurprise}
        handleSurprise={handleSurprise}
      />
    </div>
  );
}

import Form from "@/components/Form";

export default function HomePage({
  formResults,
  setFormResults,
  handleResults,
  getUniqueActivities,
  places,
}) {
  return (
    <div>
      <h1>Create your Trip!</h1>
      <Form
        formResults={formResults}
        setFormResults={setFormResults}
        handleResults={handleResults}
        getUniqueActivities={getUniqueActivities}
        places={places}
      />
    </div>
  );
}

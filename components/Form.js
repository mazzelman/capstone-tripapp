import PreviewCard from "./PreviewCard";

export default function Form({
  formResults,
  setFormResults,
  handleResults,
  getUniqueActivities,
  places,
}) {
  // Function to get the user inputs from form
  function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);

    const results = places.filter((place) => place.activity === data.activity);
    handleResults(results);
  }

  // handle form reset
  function handleFormReset() {
    setFormResults(0);
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="activity">Choose your activity</label>
        <select name="activity" id="activity">
          <option value="disabled">---</option>
          {getUniqueActivities().map((activity, id) => (
            <option key={id} value={activity}>
              {activity}
            </option>
          ))}
        </select>
        <button type="submit">Submit</button>
        <button type="button" onClick={handleFormReset}>
          Reset
        </button>
      </form>

      {formResults.length > 0 && <PreviewCard formResults={formResults} />}
    </>
  );
}

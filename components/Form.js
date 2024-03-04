import { dbPlaces } from "@/lib/db";
import { useState } from "react";
import PreviewCard from "./PreviewCard";

const places = dbPlaces;

export default function Form() {
  const [formResults, setFormresults] = useState(0);

  // Function to get unique values of the 'activity' key
  const getUniqueActivities = () => {
    const uniqueActivities = new Set();
    dbPlaces.forEach((place) => uniqueActivities.add(place.activity));
    return Array.from(uniqueActivities);
  };

  // Function to get the user inputs from form
  function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);

    const results = places.filter((place) => place.activity === data.activity);

    setFormresults(results);
  }

  // handle form reset
  function handleFormReset() {
    setFormresults(0);
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

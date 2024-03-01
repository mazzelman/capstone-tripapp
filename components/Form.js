import { dbPlaces } from "@/lib/db";
import { useState } from "react";
import PreviewCard from "./PreviewCard";

const places = dbPlaces;

export default function Form() {
  const [formResults, setFormresults] = useState(0);

  // Function to get unique values of the 'activity' key
  const getUniqueActivities = () => {
    const uniqueActivities = new Set();
    dbPlaces.map((place) => uniqueActivities.add(place.activity));
    return Array.from(uniqueActivities);
  };

  // Function to get the user inputs from form

  function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    console.log(data);

    const results = places.filter((place) => place.activity === data.activity);

    setFormresults(results);
  }

  console.log(formResults);

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
      </form>
      {/* Search results. Will later be a Card Component */}

      {formResults.length > 0 && <PreviewCard formResults={formResults} />}
    </>
  );
}

/* <option value="0">---</option>
<option value="1">Hike</option>
<option value="2">City</option>
<option value="3">Beach</option> */

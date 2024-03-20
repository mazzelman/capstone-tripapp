import styled from "styled-components";
import React from "react";
import StyledTertiarySection from "../Sections/StyledTertiarySection";

import { useState } from "react";
import useSWR from "swr";

export default function AddPlaces({ getUniqueValues }) {
  const [isChecked, setIsChecked] = useState([]);

  const { data, error, isLoading } = useSWR("/api/activities");

  if (error)
    return (
      <StyledTertiarySection $textAlign={true}>
        <h2>Failed to load...</h2>
      </StyledTertiarySection>
    );

  if (isLoading) {
    return (
      <StyledTertiarySection $textAlign={true}>
        <h2>loading...</h2>
      </StyledTertiarySection>
    );
  }

  if (!data) {
    return (
      <StyledTertiarySection $textAlign={true}>
        <h2>Data could not be loaded...</h2>
      </StyledTertiarySection>
    );
  }

  async function handleOwnPlaceSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);

    const activityArray = Object.values(data);
    console.log(activityArray);

    try {
      const response = await fetch("/api/places", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        console.log("Place added successfully");
        // Clear the input field and textarea
        event.target.reset();
      } else {
        console.error("Failed to add place");
      }
    } catch (error) {
      console.error("Error adding place:", error);
    }
  }

  function handleChange(checkbox) {
    setIsChecked(isChecked.push(...checkbox));
    console.log(isChecked);
  }

  return (
    <>
      <StyledAddPlacesForm onSubmit={handleOwnPlaceSubmit}>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Paris"
          required
        ></input>
        <label htmlFor="region">Region:</label>

        <select name="region" id="region" required>
          <option value="disabled">---</option>
          {getUniqueValues("region").map((region, id) => (
            <option key={id} value={region}>
              {region}
            </option>
          ))}
        </select>

        <p>Activities:</p>
        {data.map((activities) => (
          <div key={activities._id}>
            <input
              type="checkbox"
              id={activities._id}
              name={activities.activityname}
              value={activities._id}
              onClick={() => handleChange(activities._id)}
            />
            <label htmlFor={activities._id}>{activities.activityname}</label>
          </div>
        ))}

        <label htmlFor="ownPlaceRating">Rating</label>
        <input
          type="range"
          id="ownPlaceRating"
          name="ownPlaceRating"
          min="1"
          max="5"
          list="markers"
        ></input>

        <StyledDatalist id="markers">
          <option value="1" label="1"></option>
          <option value="2" label="2"></option>
          <option value="3" label="3"></option>
          <option value="4" label="4"></option>
          <option value="5" label="5"></option>
        </StyledDatalist>

        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          name="description"
          placeholder="Share your thoughts... "
          required
        ></textarea>
        <button type="submit" name="submit" id="submit">
          Submit
        </button>
      </StyledAddPlacesForm>
    </>
  );
}

export const StyledAddPlacesForm = styled.form`
  display: flex;
  flex-direction: column;
`;

export const StyledDatalist = styled.datalist`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  writing-mode: vertical-lr;
  width: 200px;
`;

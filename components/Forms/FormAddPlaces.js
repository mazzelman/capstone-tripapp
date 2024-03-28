// import general things to run the app
import React from "react";
import useSWR from "swr";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/router";
import UploadImage from "./FormImageUpload";
// import components for styles
import styled from "styled-components";
import StyledSecondarySection from "../Sections/StyledSecondarySection";
import StyledTertiarySection from "../Sections/StyledTertiarySection";
import Divider from "../dividers/divider";
// import components
import StyledPrimaryButton from "../Buttons/StyledPrimaryButton";

export default function AddPlaces({
  getUniqueValues,
  isImage,
  setIsImage,
  publicId,
  setPublicId,
}) {
  const [isChecked, setIsChecked] = useState([]);

  const router = useRouter();

  const session = useSession();
  const userId = session.data?.user.id;
  const userName = session.data?.user.name;

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
    const ownPlace = Object.fromEntries(formData);

    const data = {
      ...ownPlace,
      activities: isChecked,
      image: isImage,
      imageId: publicId,
      userId: userId,
      userName: userName,
    };

    setIsChecked([]);

    try {
      const response = await fetch("/api/places", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        window.alert("Place added successfully");
        // Clear the input field and textarea
        event.target.reset();
        // reload the page
        router.reload();
      } else {
        window.alert("Failed to add place");
      }
    } catch (error) {
      console.error("Error adding place:", error);
    }
  }

  const handleChange = (event) => {
    const { value, checked } = event.target;

    if (checked) {
      setIsChecked((prevCheckedValues) => [...prevCheckedValues, value]);
    } else {
      setIsChecked((prevCheckedValues) =>
        prevCheckedValues.filter((item) => item !== value)
      );
    }
  };

  return (
    <StyledSecondarySection>
      <h2>Create your own places!</h2>
      <p>
        The first step is to upload an image. When the image is successfully
        uploaded, you will get a confirmation right here under the image upload.
        After that, you will be able to fill out the form that appears. The file
        size is limited to <strong>1MB</strong>.
      </p>
      <Divider />
      <UploadImage
        isImage={isImage}
        setIsImage={setIsImage}
        setPublicId={setPublicId}
      />
      {isImage && (
        <StyledAddPlacesForm onSubmit={handleOwnPlaceSubmit}>
          <StyledFormGroup>
            <StyledFormLabel htmlFor="name">Name:</StyledFormLabel>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="The name of the place..."
              required
            ></input>
          </StyledFormGroup>

          <StyledFormGroup>
            <StyledFormLabel htmlFor="region">Region:</StyledFormLabel>
            <select name="region" id="region" required>
              <option value="disabled">---</option>
              {getUniqueValues("region").map((region, id) => (
                <option key={id} value={region}>
                  {region}
                </option>
              ))}
            </select>
          </StyledFormGroup>

          <StyledFormGroup>
            <p>Activities:</p>
            <StyledActivities>
              {data.map((activities) => (
                <label key={activities._id} htmlFor={activities._id}>
                  <input
                    type="checkbox"
                    id={activities._id}
                    name={activities.activityname}
                    value={activities._id}
                    onChange={handleChange}
                  />
                  {activities.activityname}
                </label>
              ))}
            </StyledActivities>
          </StyledFormGroup>

          <StyledFormGroup>
            <StyledFormLabel htmlFor="description">
              Description:
            </StyledFormLabel>
            <textarea
              id="description"
              name="description"
              placeholder="Describe this place... "
              rows="4"
              cols="50"
              required
            ></textarea>
          </StyledFormGroup>

          <StyledFormGroup>
            <StyledFormLabel htmlFor="initialReview">
              Your review:
            </StyledFormLabel>
            <textarea
              id="initialReview"
              name="initialReview"
              placeholder="Add your review... "
              rows="4"
              cols="50"
              required
            ></textarea>
          </StyledFormGroup>

          <StyledPrimaryButton type="submit" name="submit" id="submit">
            Submit
          </StyledPrimaryButton>
        </StyledAddPlacesForm>
      )}
    </StyledSecondarySection>
  );
}

export const StyledAddPlacesForm = styled.form`
  display: flex;
  gap: 0.5em;
  flex-direction: column;
`;

export const StyledFormGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1em;
`;

export const StyledFormLabel = styled.label`
  margin-bottom: 0.5em;
`;

export const StyledActivities = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1em;
`;

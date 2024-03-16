// import general things to run the app
import React from "react";
import { useRouter } from "next/router";
// Import the StyledPrimaryButton component
import StyledPrimaryButton from "../Buttons/StyledPrimaryButton";
import StyledSecondaryButton from "../Buttons/StyledSecondaryButton";
// import components for styles
import styled from "styled-components";

export default function FormComments({ fetchComments }) {
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);

    // Add the ID of the place to the comment data
    data.placeId = router.query.id;
    data.createdAt = new Date(); // Add the current timestamp

    try {
      const response = await fetch("/api/comments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        console.log("Comment posted successfully");
        // Clear the input field and textarea
        event.target.reset();
        fetchComments();
        // Optionally, you can redirect the user to the place details page or update the UI
      } else {
        console.error("Failed to post comment");
      }
    } catch (error) {
      console.error("Error posting comment:", error);
    }
  };

  return (
    <StyledForm onSubmit={handleSubmit}>
      <label htmlFor="username">Name:</label>
      <input type="text" id="username" name="username" required />
      <label htmlFor="commenttext">Add a comment:</label>
      <textarea
        id="commenttext"
        name="commenttext"
        rows="4"
        cols="50"
        required
      ></textarea>
      <StyledPrimaryButton type="submit">Add new comment</StyledPrimaryButton>
      <StyledSecondaryButton type="reset">Reset</StyledSecondaryButton>
    </StyledForm>
  );
}

export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 0.5em;
  margin: 1em 0;
  border-radius: var(--border-radius);
  background-color: var(--secondary-color-background);
  padding: var(--main-padding-mobile);
`;

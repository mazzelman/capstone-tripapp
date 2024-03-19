// import general things to run the app
import React from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
// Import the StyledPrimaryButton component
import StyledPrimaryButton from "../Buttons/StyledPrimaryButton";
import StyledSecondaryButton from "../Buttons/StyledSecondaryButton";
// import components for styles
import styled from "styled-components";
import Link from "next/link";

export default function FormComments({ fetchComments }) {
  const router = useRouter();

  const { data: session } = useSession();

  if (!session) {
    return (
      <StyledCommentsSignIn>
        <StyledSignInHeadline>
          Please
          <StyledSignInLink href="/profile">
            <strong> sign in </strong>
          </StyledSignInLink>
          to comment.
        </StyledSignInHeadline>
      </StyledCommentsSignIn>
    );
  }

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
      <label htmlFor="username">Name: *</label>
      <StyledCommentsUsername
        type="text"
        id="username"
        name="username"
        value={session.user.name}
        readOnly
        required
      />
      <StyledCommentsUsernameInfo>
        * Username is prefilled and can not be changed!
      </StyledCommentsUsernameInfo>
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

export const StyledCommentsUsername = styled.input`
  background-color: var(--primary-color-background);
`;

export const StyledCommentsUsernameInfo = styled.span`
  font-size: 0.8em;
  margin-bottom: 1em;
`;

export const StyledCommentsSignIn = styled.article`
  text-align: center;
  background-color: var(--secondary-color-background);
  margin: 1em 0;
  padding: var(--main-padding);
  border-radius: 0.3em;
`;

export const StyledSignInHeadline = styled.h2`
  margin-bottom: 0;
`;

export const StyledSignInLink = styled(Link)`
  color: var(--secondary-color);
`;

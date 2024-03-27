// import general things to run the app
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Image from "next/image";
import useSWR from "swr";

// import fontawesome icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil as faPencilSolid } from "@fortawesome/free-solid-svg-icons";
import { faTrash as faTrashSolid } from "@fortawesome/free-solid-svg-icons";
// import components
import FavoriteButton from "../Buttons/FavoriteButton";
import FormComments from "../Forms/FormComments";
import StyledPrimaryButton from "../Buttons/StyledPrimaryButton";
import UploadImage from "../Forms/FormImageUpload";
import StyledSecondaryButton from "../Buttons/StyledSecondaryButton";
// import components for styles
import styled from "styled-components";
import { StyledCardArticle } from "./Card";
import { StyledCardImage } from "./Card";
import { StyledCardTitle } from "./Card";
import { StyledCardSubHeading } from "./Card";
import { StyledActivities, StyledFormGroup } from "../Forms/FormAddPlaces";
import { StyledFormLabel } from "../Forms/FormAddPlaces";
import StyledTertiarySection from "../Sections/StyledTertiarySection";

export default function DetailsCard({
  id,
  isFavorite,
  toggleFavorite,
  place,
  getUniqueValues,
}) {
  const {
    _id,
    name,
    description,
    region,
    image,
    temperature,
    reviews,
    initialReview,
    activities,
    userId,
  } = place;

  const [comments, setComments] = useState([]);
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [isEditingPlaceId, setIsEditingPlaceId] = useState(false);
  const [editingActivities, setEditingActivities] = useState([]);

  const session = useSession();

  const router = useRouter();

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

  //----------------------------------------------------------------

  const handleEdit = (commentId) => {
    setEditingCommentId(commentId);
  };

  //----------------------------------------------------------------

  // for the places

  function handleEditPlace() {
    setIsEditingPlaceId(true);
  }

  function cancelEditPlace() {
    setIsEditingPlaceId(false);
  }

  //----------------------------------------------------------------

  // for the place
  async function handleEditPlaceSubmit() {
    try {
      // Get the edited place data
      const editedPlaceText = getTextAreaValue("initialReview");
      const editedDescriptionText = getTextAreaValue("description");
      const editedPlaceName = getInputValue("placeName");
      const editedRegion = getInputValue("region");
      const editedActivities = editingActivities;

      // Check if any of the required fields are empty
      if (!editedPlaceText || !editedDescriptionText || !editedPlaceName) {
        window.alert("Please fill out all fields");
        return;
      }

      // Send the edited place to the server
      const response = await fetch(`/api/places/${_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          initialReview: editedPlaceText,
          description: editedDescriptionText,
          name: editedPlaceName,
          region: editedRegion,
          activities: editedActivities,
        }),
      });

      // Handle response from the server
      if (response.ok) {
        window.alert("Place edited successfully");
        setIsEditingPlaceId(false); // Reset editing state
      } else {
        window.alert("Failed to edit Place");
      }
    } catch (error) {
      window.alert("Error editing Place:", error);
    }
  }

  // Helper function to get value from textarea
  function getTextAreaValue(id) {
    const textarea = document.getElementById(id);
    return textarea ? textarea.value.trim() : "";
  }

  // Helper function to get value from input field
  function getInputValue(id) {
    const input = document.getElementById(id);
    return input ? input.value.trim() : "";
  }

  const handleChange = (event) => {
    const { value, checked } = event.target;

    if (checked) {
      setEditingActivities((prevCheckedValues) => [
        ...prevCheckedValues,
        value,
      ]);
    } else {
      setEditingActivities((prevCheckedValues) =>
        prevCheckedValues.filter((item) => item !== value)
      );
    }
  };
  //----------------------------------------------------------------

  // for the place

  const handleDeletePlace = async () => {
    try {
      const response = await fetch(`/api/places/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        window.alert("Place deleted successfully");
        router.push("/places"); // Redirect to the home page after successful delete
      } else {
        window.alert("Failed to delete place");
      }
    } catch (error) {
      window.alert("Error deleting place:", error);
    }
  };

  //----------------------------------------------------------------
  // for the comments
  const handleDelete = async (commentId) => {
    try {
      const response = await fetch(`/api/comments/${commentId}`, {
        method: "DELETE",
      });
      if (response.ok) {
        window.alert("Comment deleted successfully");
        fetchComments();
      } else {
        window.alert("Failed to delete comment");
      }
    } catch (error) {
      window.alert("Error deleting comment:", error);
    }
  };

  //----------------------------------------------------------------

  const handleEditSubmit = async (commentId) => {
    try {
      // Get the edited comment text from the corresponding textarea
      const editedCommentTextarea = document.getElementById(
        `edit-comment-${commentId}`
      );
      const editedCommentText = editedCommentTextarea
        ? editedCommentTextarea.value
        : "";

      // Check if the edited comment text is not empty
      if (editedCommentText.trim() === "") {
        window.alert("Edited comment text is empty");
        return; // Exit early if the edited comment text is empty
      }

      // Send the edited comment to the server
      const response = await fetch(`/api/comments/${commentId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ commenttext: editedCommentText }),
      });

      // Handle response from the server
      if (response.ok) {
        window.alert("Comment edited successfully");
        fetchComments(); // Fetch updated comments after successful edit
        setEditingCommentId(null); // Reset editing state
      } else {
        window.alert("Failed to edit comment");
      }
    } catch (error) {
      window.alert("Error editing comment:", error);
    }
  };

  //----------------------------------------------------------------

  const handleCancelEdit = () => {
    setEditingCommentId(null);
  };

  //----------------------------------------------------------------

  // Add logic to render edit textarea for the clicked comment
  const renderEditTextarea = (commentId, commentText) => {
    if (editingCommentId === commentId) {
      return (
        <StyledEditTextareaWrapper>
          <textarea
            defaultValue={commentText}
            id={`edit-comment-${commentId}`}
            rows="4"
            required
          ></textarea>
          <StyledPrimaryButton onClick={() => handleEditSubmit(commentId)}>
            Save
          </StyledPrimaryButton>
          <StyledSecondaryButton onClick={() => handleCancelEdit()}>
            Cancel
          </StyledSecondaryButton>
        </StyledEditTextareaWrapper>
      );
    }
    return null;
  };

  //----------------------------------------------------------------

  // Define fetchComments function outside the useEffect
  const fetchComments = async () => {
    try {
      const response = await fetch(`/api/comments?placeId=${_id}`);
      if (response.ok) {
        const data = await response.json();
        setComments(data);
      } else {
        console.error("Failed to fetch comments");
      }
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  //----------------------------------------------------------------

  return (
    <>
      <StyledCardArticle key={_id}>
        {isEditingPlaceId ? (
          "test"
        ) : (
          <StyledCardImage
            src={image}
            sizes="100vw"
            width="0"
            height="0"
            alt={name}
            loading="lazy"
          />
        )}
        <StyledCardBody>
          {isEditingPlaceId ? (
            <input
              type="text"
              defaultValue={name}
              id="placeName"
              name="placeName"
            ></input>
          ) : (
            <StyledCardTitle>{name}</StyledCardTitle>
          )}
          <FavoriteButton
            id={_id}
            isFavorite={isFavorite}
            toggleFavorite={toggleFavorite}
          />
          {isEditingPlaceId ? (
            <StyledFormGroup>
              <p>Activities:</p>
              <StyledActivities>
                {data.map((allActivities) => (
                  <label key={allActivities._id} htmlFor={allActivities._id}>
                    <input
                      type="checkbox"
                      id={allActivities._id}
                      name={allActivities.activityname}
                      value={allActivities._id}
                      onChange={handleChange}
                    />
                    {allActivities.activityname}
                  </label>
                ))}
              </StyledActivities>
            </StyledFormGroup>
          ) : (
            <StyledCardSubHeading>
              {region} &#183; &nbsp;
              {activities.map((activity) => activity.activityname).join(", ")}
            </StyledCardSubHeading>
          )}
          {isEditingPlaceId ? (
            <StyledFormGroup>
              <StyledFormLabel htmlFor="region">Region:</StyledFormLabel>
              <select name="region" id="region" required>
                {getUniqueValues("region").map((region, id) => (
                  <option key={id} value={region}>
                    {region}
                  </option>
                ))}
              </select>
            </StyledFormGroup>
          ) : null}
          <StyledCardSubHeadings>Description:</StyledCardSubHeadings>
          {isEditingPlaceId ? (
            <StyledFormGroup>
              <StyledFormLabel htmlFor="description"></StyledFormLabel>
              <textarea
                defaultValue={description}
                id="description"
                name="description"
                rows="8"
                cols="50"
                required
              ></textarea>
            </StyledFormGroup>
          ) : (
            <StyledCardText>{description}</StyledCardText>
          )}
          <StyledCardSubHeadings>Reviews:</StyledCardSubHeadings>
          {isEditingPlaceId ? (
            <StyledFormGroup>
              <StyledFormLabel htmlFor="initialReview"></StyledFormLabel>
              <textarea
                defaultValue={initialReview}
                id="initialReview"
                name="initialReview"
                rows="8"
                cols="50"
                required
              ></textarea>
            </StyledFormGroup>
          ) : (
            <StyledCardText>{initialReview}</StyledCardText>
          )}

          {session.status === "authenticated" &&
            userId === session.data.user.id && (
              <>
                <StyledCardButtonWrapper>
                  {isEditingPlaceId && (
                    <StyledSecondaryButton onClick={cancelEditPlace}>
                      <FontAwesomeIcon icon={faTrashSolid} />
                      &nbsp;cancel edit
                    </StyledSecondaryButton>
                  )}
                  {!isEditingPlaceId && (
                    <StyledSecondaryButton onClick={handleEditPlace}>
                      <FontAwesomeIcon icon={faPencilSolid} />
                      &nbsp;Edit Place
                    </StyledSecondaryButton>
                  )}
                </StyledCardButtonWrapper>
                <StyledCardButtonWrapper>
                  {!isEditingPlaceId && (
                    <StyledSecondaryButton onClick={handleDeletePlace}>
                      <FontAwesomeIcon icon={faTrashSolid} />
                      &nbsp;Delete Place
                    </StyledSecondaryButton>
                  )}
                  {isEditingPlaceId && (
                    <StyledSecondaryButton onClick={handleEditPlaceSubmit}>
                      <FontAwesomeIcon icon={faTrashSolid} />
                      &nbsp;Submit
                    </StyledSecondaryButton>
                  )}
                </StyledCardButtonWrapper>
              </>
            )}
        </StyledCardBody>
      </StyledCardArticle>
      <FormComments fetchComments={fetchComments} />
      {comments.length > 0 && (
        <StyledComments>
          <h3>Comments:</h3>
          {comments
            .map((comment) => (
              <div key={comment._id}>
                <StyledCommentsAnswers>
                  <StyledCommentsImage
                    src={
                      comment.userImage
                        ? comment.userImage
                        : "/images/profile-placeholder.png"
                    }
                    width="50"
                    height="50"
                    alt="Profile picture"
                    loading="lazy"
                  />
                  <StyledCommentsBody>
                    <StyledCommentsName>{comment.username}</StyledCommentsName>
                    <StyledCommentsPostDate>
                      {new Date(comment.createdAt).toLocaleString()}
                    </StyledCommentsPostDate>
                    <StyledCommentsText>
                      {comment.commenttext}
                    </StyledCommentsText>
                    {renderEditTextarea(comment._id, comment.commenttext)}

                    {session.status === "authenticated" &&
                      comment.userId === session.data.user.id && (
                        <StyledCommentButtonsWrapper>
                          <StyledEditCommentButton
                            type="button"
                            onClick={() => handleEdit(comment._id)}
                          >
                            <FontAwesomeIcon icon={faPencilSolid} />
                          </StyledEditCommentButton>
                          <StyledDeleteCommentButton
                            type="button"
                            onClick={() => handleDelete(comment._id)}
                          >
                            <FontAwesomeIcon icon={faTrashSolid} />
                          </StyledDeleteCommentButton>
                        </StyledCommentButtonsWrapper>
                      )}
                  </StyledCommentsBody>
                </StyledCommentsAnswers>
                <StyledCommentHr />
              </div>
            ))
            .reverse()}
        </StyledComments>
      )}
    </>
  );
}

export const StyledCardBody = styled.div`
  position: relative;
  padding: 1em;
`;

export const StyledCardSubHeadings = styled.h4`
  margin-top: 1.5em;
  margin-bottom: 0;
`;

export const StyledCardText = styled.p`
  margin-top: 0.5em;
`;

export const StyledCardButtonWrapper = styled.div`
  display: flex;
  gap: 0.5em;
`;

export const StyledComments = styled.article`
  background-color: var(--secondary-color-background);
  padding: var(--main-padding);
  border-radius: 0.3em;
`;

export const StyledCommentsBody = styled.article`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

export const StyledCommentsAnswers = styled.section`
  display: flex;
  gap: 1em;
  margin-top: 1em;
  padding: 1em 0;
`;

export const StyledCommentsImage = styled(Image)`
  border-radius: 50%;
`;

export const StyledCommentsName = styled.h4`
  margin-bottom: 0;
`;

export const StyledCommentsPostDate = styled.span`
  color: var(--primary-disabled-color);
  font-size: 0.8em;
`;

export const StyledCommentsText = styled.div`
  margin-top: 0.5em;
  border-radius: 0.3em;
`;
export const StyledCommentHr = styled.hr`
  border: 1px solid var(--primary-color-background);
`;

export const StyledCommentButtonsWrapper = styled.div`
  display: flex;
  justify-content: end;
  margin-top: 0.5em;
`;

export const StyledEditCommentButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  &:hover {
    color: var(--primary-color);
  }
`;

export const StyledDeleteCommentButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  &:hover {
    color: var(--secondary-color);
  }
`;

export const StyledEditTextareaWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5em;
  margin-top: 0.5em;
`;

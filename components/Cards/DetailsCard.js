// import general things to run the app
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";
// import fontawesome icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil as faPencilSolid } from "@fortawesome/free-solid-svg-icons";
import { faTrash as faTrashSolid } from "@fortawesome/free-solid-svg-icons";
// import components
import FavoriteButton from "../Buttons/FavoriteButton";
import FormComments from "../Forms/FormComments";
import StyledPrimaryButton from "../Buttons/StyledPrimaryButton";
import StyledSecondaryButton from "../Buttons/StyledSecondaryButton";
// import components for styles
import styled from "styled-components";
import { StyledCardArticle } from "./Card";
import { StyledCardImage } from "./Card";
import { StyledCardTitle } from "./Card";
import { StyledCardSubHeading } from "./Card";

export default function DetailsCard({ id, isFavorite, toggleFavorite, place }) {
  const {
    _id,
    name,
    description,
    region,
    image,
    temperature,
    reviews,
    activities,
  } = place;

  const [comments, setComments] = useState([]);
  const [editingCommentId, setEditingCommentId] = useState(null);
  const session = useSession();

  //----------------------------------------------------------------

  const handleEdit = (commentId) => {
    setEditingCommentId(commentId);
  };

  //----------------------------------------------------------------

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

  useEffect(() => {
    // Fetch comments associated with the current place
    fetchComments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [_id]);

  //----------------------------------------------------------------

  return (
    <>
      <StyledCardArticle key={_id}>
        <StyledCardImage
          src={image}
          sizes="100vw"
          style={{
            width: "100%",
            height: "auto",
          }}
          width="0"
          height="0"
          alt={name}
          loading="lazy"
        />
        <StyledCardBody>
          <StyledCardTitle>{name}</StyledCardTitle>
          <FavoriteButton
            id={_id}
            isFavorite={isFavorite}
            toggleFavorite={toggleFavorite}
          />
          <StyledCardSubHeading>
            {region} &#183; &nbsp;
            {activities.map((activity) => activity.activityname).join(", ")}
          </StyledCardSubHeading>
          <StyledCardSubHeadings>Description:</StyledCardSubHeadings>
          <StyledCardText>{description}</StyledCardText>
          <StyledCardSubHeadings>Reviews:</StyledCardSubHeadings>
          <StyledCardText>
            {reviews.map((review) => review.review).join(", ")}
          </StyledCardText>
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

                    {session.status === "authenticated" && (
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

// import general things to run the app
import React, { useState, useEffect } from "react";
import Image from "next/image";
// import components
import FavoriteButton from "../Buttons/FavoriteButton";
import FormComments from "../Forms/FormComments";
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

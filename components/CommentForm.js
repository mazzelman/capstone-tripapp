import styled from "styled-components";
import useSWR from "swr";

export default function CommentForm({ newCommentDummy }) {
  const { data } = useSWR(`/api/comments`);
  console.log(data);

  async function handleNewComment(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    //console.log(data);
    newCommentDummy(data);
  }

  return (
    <>
      <StyledCommentFieldset>
        <StyledCommentForm onSubmit={handleNewComment}>
          <label htmlFor="username">Username</label>
          <input type="text" name="username" id="username"></input>
          <label htmlFor="commenttext">Write a comment</label>
          <textarea type="text" name="usercomment" id="usercomment"></textarea>
          <button type="submit">Submit</button>
        </StyledCommentForm>
      </StyledCommentFieldset>
    </>
  );
}

export const StyledCommentForm = styled.form`
  display: flex;
  flex-direction: column;

  background-color: var(--secondary-color-background);
  padding: 1em;
  border-radius: 0.3em;
`;

export const StyledCommentFieldset = styled.fieldset`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: center;
  gap: 1em;
  border: none;
  padding: 0;
  margin-top: 1em;
  @media only screen and (min-width: 600px) {
    flex-direction: row;
    gap: 0.4em;
  }
`;

import StyledPrimaryButton from "../Buttons/StyledPrimaryButton";
import StyledSecondaryButton from "../Buttons/StyledSecondaryButton";
import { StyledForm } from "./FormComments";

export default function FormAboutMe(user) {
  const handleSubmit = async (event) => {
    event.preventDefault();

    const { _id, username } = user;

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);

    data.id = user.user._id;
    //console.log(data);

    try {
      const response = await fetch("/api/user", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        console.log("Text posted successfully");

        event.target.reset();
      } else {
        console.error("Failed to post text");
      }
    } catch (error) {
      console.error("Error posting text:", error);
    }
  };
  return (
    <StyledForm onSubmit={handleSubmit}>
      <label htmlFor="aboutmetext">Tell something about you:</label>
      <textarea
        id="abouttext"
        name="aboutmetext"
        rows="4"
        cols="50"
        required
      ></textarea>
      <StyledPrimaryButton type="submit">Submit</StyledPrimaryButton>
      <StyledSecondaryButton type="reset">Reset</StyledSecondaryButton>
    </StyledForm>
  );
}

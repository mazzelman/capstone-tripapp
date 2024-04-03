// import general things to run the app
import { useSession } from "next-auth/react";
// import components
import { StyledForm } from "./FormComments";
import StyledPrimaryButton from "../Buttons/StyledPrimaryButton";
import StyledSecondaryButton from "../Buttons/StyledSecondaryButton";
import StyledDeleteButton from "../Buttons/StyledDeleteButton";

export default function FormAboutme({ aboutmetext }) {
  const session = useSession();
  const userId = session.data?.user.id;

  //----------------------------------------------------------------

  async function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const aboutmetext = formData.get("aboutmetext");

    const data = { aboutmetext, id: userId };

    try {
      const response = await fetch("/api/user", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        window.alert("Text posted successfully");

        event.target.reset();
      } else {
        window.alert("Failed to post text");
      }
    } catch (error) {
      window.alert("Error posting text:", error);
    }
  }

  //----------------------------------------------------------------

  async function handleDelete(event) {
    event.preventDefault();

    const data = { id: userId };
    try {
      // Display confirmation dialog
      const confirmed = window.confirm(
        "Are you sure you want to delete this about me text?"
      );
      if (confirmed) {
        const response = await fetch("/api/user", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });

        if (response.ok) {
          window.alert("Text deleted successfully");
          // Reset the value of the aboutmetext textarea
          document.getElementById("aboutmetext").value = "";
        } else {
          window.alert("Failed to delete text");
        }
      }
    } catch (error) {
      window.alert("Error deleting text:", error);
    }
  }

  //----------------------------------------------------------------

  return (
    <StyledForm onSubmit={handleSubmit}>
      <label htmlFor="aboutmetext">About me:</label>
      <textarea
        id="aboutmetext"
        name="aboutmetext"
        rows="4"
        cols="50"
        defaultValue={aboutmetext}
        required
      ></textarea>
      <StyledPrimaryButton type="submit">Submit</StyledPrimaryButton>
      <StyledDeleteButton onClick={handleDelete} type="button">
        Delete
      </StyledDeleteButton>
    </StyledForm>
  );
}

// import general things to run the app
import Image from "next/image";
import React, { useState } from "react";
// import fontawesome icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudArrowUp as faCloudArrowUpSolid } from "@fortawesome/free-solid-svg-icons";
import { faImage as faImageSolid } from "@fortawesome/free-solid-svg-icons";
// import components
import StyledSecondaryButton from "../Buttons/StyledSecondaryButton";
// import components for styles
import styled from "styled-components";

const UploadImage = ({ isImage, setIsImage }) => {
  const [image, setImage] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setImage(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const uploadImage = async () => {
    try {
      const res = await fetch("/api/imageUpload", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ image }),
      });
      const data = await res.json();
      setIsImage(data.url);
      //window.alert("Image uploaded");
    } catch (error) {
      window.alert(
        "Error uploading image, the file seems too big. Only 1MB allowed."
      );
    }
  };

  return (
    <>
      <StyledUpload>
        {image && (
          <StyledUploadImage
            sizes="100vw"
            style={{
              width: "100%",
              height: "auto",
            }}
            width="0"
            height="0"
            src={image}
            alt="Preview"
          />
        )}
        <StyledUploadInputLabel htmlFor="imageUpload">
          {image ? (
            <>
              <FontAwesomeIcon icon={faImageSolid} size="2xl" />
              <StyledUploadInputText>
                You choosed this image
              </StyledUploadInputText>
            </>
          ) : (
            <>
              <FontAwesomeIcon icon={faCloudArrowUpSolid} size="2xl" />
              <StyledUploadInputText>Choose an image</StyledUploadInputText>
            </>
          )}
        </StyledUploadInputLabel>
        <StyledUploadInput
          type="file"
          id="imageUpload"
          onChange={handleImageChange}
        />
        <StyledSecondaryButton onClick={uploadImage}>
          Upload Image
        </StyledSecondaryButton>
      </StyledUpload>
      {isImage && (
        <StyledUploadMessage>
          <StyledUploadSuccessMessage>
            Image uploaded successfully!
          </StyledUploadSuccessMessage>
        </StyledUploadMessage>
      )}
    </>
  );
};

export default UploadImage;

export const StyledUploadImage = styled(Image)`
  border-radius: var(--border-radius);
`;

export const StyledUpload = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 1em;
`;

export const StyledUploadInputLabel = styled.label`
  color: var(--primary-color);
  text-align: center;
  cursor: pointer;
  padding: var(--main-padding);
  border: 1px dashed var(--primary-color);
  border-radius: var(--border-radius);
  background-color: var(--primary-color-background);
  &:hover {
    color: var(--secondary-color);
    background-color: var(--primary-color-background);
    transition: 500ms ease-in-out;
  }
`;

export const StyledUploadInputText = styled.span`
  display: block;
  margin-top: 0.5em;
`;

export const StyledUploadInput = styled.input`
  width: 0.1px;
  height: 0.1px;
  opacity: 0;
  overflow: hidden;
  position: absolute;
  z-index: -1;
`;

export const StyledUploadMessage = styled.div`
  text-align: center;
  padding: 3em 0;
`;

export const StyledUploadSuccessMessage = styled.h3`
  margin-bottom: 0;
`;

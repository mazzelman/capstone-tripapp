import Image from "next/image";
import React, { useState } from "react";

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
      window.alert("Image uploaded");
      //console.log(isImage);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleImageChange} />
      <button onClick={uploadImage}>Upload Image</button>
      {image && <Image width={600} height={300} src={image} alt="Preview" />}
    </div>
  );
};

export default UploadImage;

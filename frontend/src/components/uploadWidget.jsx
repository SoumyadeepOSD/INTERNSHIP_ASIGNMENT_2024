import React, { useRef, useState } from "react";

const UploadWidget = ({ onUpload }) => {
  const [image, setImage] = useState(null);
  const fileInput = useRef(null);

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // You can set a preview of the image
    const imageUrl = URL.createObjectURL(file);
    setImage(imageUrl);

    // You can pass the file to the parent component
    onUpload(file);
  };

  return (
    <>
      <input
        type="file"
        accept="image/*"
        onChange={handleUpload}
        style={{ display: "none" }}
        ref={fileInput}
      />
      <button
        className="font-bold p-3 rounded-md border-2 border-slate-200"
        onClick={() => fileInput.current.click()}
      >
        Choose image
      </button>
    </>
  );
};

export default UploadWidget;

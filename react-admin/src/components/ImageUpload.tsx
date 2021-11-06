import React, { ChangeEvent } from "react";
import axios from "axios";

interface IImageUpload {
    setImage: (url: string) => void;
}

const ImageUpload = ({ setImage }: IImageUpload) => {
  const onUpload = async ({
    target: { files },
  }: ChangeEvent<HTMLInputElement>) => {
    if (files === null || !files.length) return;

    const formData = new FormData;
    formData.append('image', files[0]);

    const { data }: any = await axios.post("upload", formData);

    setImage(data.url);
  };
  return (
    <div className="btn btn-primary">
      Upload
      <input type="file" id='image' hidden onChange={onUpload} />
    </div>
  );
};

export default ImageUpload;

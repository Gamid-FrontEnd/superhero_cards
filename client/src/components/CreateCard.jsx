import React, { useState } from "react";
import { addCard } from "./cardsServices";
import {
  FileInputFieldStyles,
  FileInputLabelStyles,
  FormDivStyles,
  InputFieldStyles,
  LabelStyles,
  SubmitButtonStyles,
  TextareaStyles,
} from "../styles/styles";

const CreateCard = () => {
  const [formData, setFormData] = useState({
    nickname: "",
    catch_phrase: "",
    origin_description: "",
    real_name: "",
    superpowers: "",
    images: [],
  });

  const [imagePreviews, setImagePreviews] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData({ ...formData, images: files });

    const previewUrls = files.map((file) => URL.createObjectURL(file));
    setImagePreviews(previewUrls);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addCard(formData);

      setFormData({
        nickname: "",
        catch_phrase: "",
        origin_description: "",
        real_name: "",
        superpowers: "",
        images: [],
      });
      setImagePreviews([]);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h2>Create a Card</h2>
      <form onSubmit={handleSubmit}>
        <FormDivStyles>
          <LabelStyles htmlFor="nickname">Nickname:</LabelStyles>
          <InputFieldStyles
            type="text"
            id="nickname"
            name="nickname"
            value={formData.nickname}
            onChange={handleChange}
          />
        </FormDivStyles>
        <FormDivStyles>
          <LabelStyles htmlFor="real_name">Real name:</LabelStyles>
          <InputFieldStyles
            type="text"
            id="real_name"
            name="real_name"
            value={formData.real_name}
            onChange={handleChange}
          />
        </FormDivStyles>
        <FormDivStyles>
          <LabelStyles htmlFor="catch_phrase">Catch phrase:</LabelStyles>
          <TextareaStyles
            cols="30"
            rows="3"
            id="catch_phrase"
            name="catch_phrase"
            value={formData.catch_phrase}
            onChange={handleChange}
          />
        </FormDivStyles>
        <FormDivStyles>
          <LabelStyles htmlFor="origin_description">
            Origin description:
          </LabelStyles>
          <TextareaStyles
            cols="30"
            rows="3"
            id="origin_description"
            name="origin_description"
            value={formData.origin_description}
            onChange={handleChange}
          />
        </FormDivStyles>
        <FormDivStyles>
          <LabelStyles htmlFor="superpowers">Superpowerse:</LabelStyles>
          <TextareaStyles
            cols="30"
            rows="3"
            id="superpowers"
            name="superpowers"
            value={formData.superpowers}
            onChange={handleChange}
          />
        </FormDivStyles>
        <div>
          <FileInputLabelStyles htmlFor="images">
            Images
            <FileInputFieldStyles
              type="file"
              id="images"
              name="images"
              onChange={handleImageChange}
              multiple
              accept="image/*"
            />
          </FileInputLabelStyles>
        </div>

        {imagePreviews.length > 0 && (
          <div>
            <h3>Image Previews:</h3>
            {imagePreviews.map((src, index) => (
              <img
                key={index}
                src={src}
                alt={`preview ${index}`}
                style={{ width: "100px", height: "100px", margin: "10px" }}
              />
            ))}
          </div>
        )}
        <SubmitButtonStyles type="submit">Create Hero</SubmitButtonStyles>
      </form>
    </div>
  );
};

export default CreateCard;

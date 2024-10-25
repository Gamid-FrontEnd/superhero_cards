import React, { useState } from "react";
import {
  CloseButtonStyles,
  FileInputFieldStyles,
  FileInputLabelStyles,
  FormDivStyles,
  InputFieldStyles,
  LabelStyles,
  SubmitButtonStyles,
  TextareaStyles,
} from "../styles/styles";
import { ImageList, ImageListItem } from "@mui/material";
import { updateCard } from "./cardsServices";

const UpdateCard = ({ card, isModalOpen, handleUpdate, updateMode }) => {
  const [nickname, setNickname] = useState(card.nickname);
  const [realName, setRealName] = useState(card.real_name);
  const [superpowers, setSuperpowers] = useState(card.superpowers);
  const [originDescription, setOriginDescription] = useState(
    card.origin_description
  );
  const [catchPhrase, setCatchPhrase] = useState(card.catch_phrase);
  const [updatedImages, setUpdatedImages] = useState(card.images);
  const [newImages, setNewImages] = useState([]);

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("nickname", nickname);
    formData.append("catch_phrase", catchPhrase);
    formData.append("origin_description", originDescription);
    formData.append("real_name", realName);
    formData.append("superpowers", superpowers);

    if (newImages.length > 0) {
      newImages.forEach((image) => formData.append("images", image));
    }

    formData.append("updatedImages", JSON.stringify(updatedImages));

    try {
      await updateCard(card.id, formData);
      isModalOpen();
    } catch (error) {
      console.error("Error updating card:", error);
    }
    handleUpdate();
  };

  const handleDeleteImage = (index) => {
    const updatedImageList = updatedImages.filter((_, i) => i !== index);
    setUpdatedImages(updatedImageList);
  };

  const handleAddImages = (event) => {
    const files = Array.from(event.target.files);
    setNewImages([...newImages, ...files]);
  };

  return (
    <div>
      <CloseButtonStyles
        onClick={() => {
          isModalOpen();
          updateMode();
          setUpdatedImages(card.images);
          setNickname(card.nickname);
          setRealName(card.real_name);
          setSuperpowers(card.superpowers);
          setOriginDescription(card.origin_description);
          setCatchPhrase(card.catch_phrase);
          setNewImages([]);
        }}
      >
        &times;
      </CloseButtonStyles>

      <ImageList
        variant="masonry"
        cols={2}
        gap={8}
        sx={{
          maxHeight: 200,
          width: "100%",
          display: "flex",
          justifyContent: "space-around",
        }}
      >
        {card.images.map((image, index) => (
          <ImageListItem key={index}>
            <img
              src={image}
              alt={`${card.nickname}`}
              style={{
                width: "150px",
                height: "150px",
              }}
            />
            <button onClick={() => handleDeleteImage(index)}>Delete</button>
          </ImageListItem>
        ))}
      </ImageList>

      <FormDivStyles>
        <LabelStyles htmlFor="nickname">Nickname:</LabelStyles>
        <InputFieldStyles
          style={{ padding: "5px" }}
          type="text"
          name="nickname"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
        />
      </FormDivStyles>
      <FormDivStyles>
        <LabelStyles htmlFor="real_name">Real name:</LabelStyles>
        <InputFieldStyles
          style={{ padding: "5px" }}
          type="text"
          value={realName}
          onChange={(e) => setRealName(e.target.value)}
        />
      </FormDivStyles>
      <FormDivStyles>
        <LabelStyles htmlFor="superpowers">Superpowerse:</LabelStyles>
        <TextareaStyles
          style={{ width: "80%", padding: "5px" }}
          cols="30"
          rows="3"
          value={superpowers}
          onChange={(e) => setSuperpowers(e.target.value)}
        />
      </FormDivStyles>
      <FormDivStyles>
        <LabelStyles htmlFor="origin_description">
          Origin description:
        </LabelStyles>
        <TextareaStyles
          style={{ width: "80%", padding: "5px" }}
          cols="30"
          rows="3"
          value={originDescription}
          onChange={(e) => setOriginDescription(e.target.value)}
        />
      </FormDivStyles>
      <FormDivStyles>
        <LabelStyles htmlFor="catch_phrase">Catch phrase:</LabelStyles>
        <TextareaStyles
          style={{ width: "80%", padding: "5px" }}
          cols="30"
          rows="1"
          value={catchPhrase}
          onChange={(e) => setCatchPhrase(e.target.value)}
        />
      </FormDivStyles>
      <div>
        <FileInputLabelStyles>
          <FileInputFieldStyles
            type="file"
            multiple
            onChange={handleAddImages}
          />
          Choose photos
        </FileInputLabelStyles>
        {newImages.length > 0 && (
          <div>
            <p style={{ margin: 0 }}>New Images:</p>
            <ImageList
              variant="masonry"
              cols={2}
              gap={8}
              sx={{
                maxHeight: 150,
                width: "100%",
                display: "flex",
                justifyContent: "space-around",
              }}
            >
              {newImages.map((image, index) => (
                <ImageListItem key={index}>
                  <img
                    src={URL.createObjectURL(image)}
                    alt={`${image.name}`}
                    style={{
                      width: "60px",
                      height: "60px",
                    }}
                  />
                </ImageListItem>
              ))}
            </ImageList>
          </div>
        )}
      </div>
      <SubmitButtonStyles
        onClick={() => {
          handleSubmit();
          updateMode();
        }}
      >
        Save
      </SubmitButtonStyles>
    </div>
  );
};

export default UpdateCard;

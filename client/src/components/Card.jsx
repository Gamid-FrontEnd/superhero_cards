import React, { useState } from "react";
import {
  CardStyles,
  CloseButtonStyles,
  DeleteButtonStyles,
  FileInputFieldStyles,
  FileInputLabelStyles,
  FormDivStyles,
  HeroImageStyles,
  HeroNameStyles,
  InputFieldStyles,
  LabelStyles,
  ModalContentStyles,
  ModalOverlayStyles,
  SubmitButtonStyles,
  TextareaStyles,
  UpdateButtonStyles,
} from "../styles/styles";
import { updateCard } from "./cardsServices";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";

const Card = ({ card, handleDelete, handleUpdate }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updateMode, setUpdateMode] = useState(false);

  const [nickname, setNickname] = useState(card.nickname);
  const [realName, setRealName] = useState(card.real_name);
  const [superpowers, setSuperpowers] = useState(card.superpowers);
  const [originDescription, setOriginDescription] = useState(
    card.origin_description
  );
  const [catchPhrase, setCatchPhrase] = useState(card.catch_phrase);
  const [updatedImages, setUpdatedImages] = useState(card.images);
  const [newImages, setNewImages] = useState([]);

  const handleAddImages = (event) => {
    const files = Array.from(event.target.files);
    setNewImages([...newImages, ...files]);
  };

  const handleDeleteImage = (index) => {
    const updatedImageList = updatedImages.filter((_, i) => i !== index);
    setUpdatedImages(updatedImageList);
  };

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
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error updating card:", error);
    }
    handleUpdate();
  };

  return (
    <div>
      <CardStyles onClick={() => setIsModalOpen(true)}>
        <HeroImageStyles src={card.images[0]} alt={card.nickname} />
        <HeroNameStyles>{card.nickname}</HeroNameStyles>
      </CardStyles>

      {isModalOpen && (
        <ModalOverlayStyles>
          <div
            style={{
              position: "absolute",
              zIndex: -1,
              width: "100vw",
              height: "100vh",
            }}
            onClick={() => {
              setIsModalOpen(false);
              setUpdateMode(false);
            }}
          ></div>
          <ModalContentStyles>
            {!updateMode ? (
              <div>
                <CloseButtonStyles
                  onClick={() => {
                    setIsModalOpen(false);
                  }}
                >
                  &times;
                </CloseButtonStyles>
                <ImageList
                  variant="masonry"
                  cols={2}
                  gap={8}
                  sx={{
                    maxHeight: 300,
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
                          width: "250px",
                          height: "250px",
                          borderRadius: "10px",
                        }}
                      />
                    </ImageListItem>
                  ))}
                </ImageList>

                <div>
                  <h1>{card.nickname}</h1>
                  <h3>
                    Real Name: <span>{card.real_name}</span>
                  </h3>
                  <p>
                    <strong>Origin:</strong> {card.origin_description}
                  </p>
                  <p>
                    <strong>Superpowers:</strong> {card.superpowers}
                  </p>
                  <blockquote>
                    <strong>He say:</strong> {card.catch_phrase}
                  </blockquote>
                </div>

                <UpdateButtonStyles onClick={() => setUpdateMode(true)}>
                  Update
                </UpdateButtonStyles>

                <DeleteButtonStyles
                  onClick={() => {
                    handleDelete(card.id);
                    setIsModalOpen(false);
                  }}
                >
                  Delete
                </DeleteButtonStyles>
              </div>
            ) : (
              <div>
                <CloseButtonStyles
                  onClick={() => {
                    setIsModalOpen(false);
                    setUpdateMode(false);
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
                      <button onClick={() => handleDeleteImage(index)}>
                        Delete
                      </button>
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
                  <LabelStyles htmlFor="catch_phrase">
                    Catch phrase:
                  </LabelStyles>
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
                    setUpdateMode(false);
                  }}
                >
                  Save
                </SubmitButtonStyles>
              </div>
            )}
          </ModalContentStyles>
        </ModalOverlayStyles>
      )}
    </div>
  );
};

export default Card;

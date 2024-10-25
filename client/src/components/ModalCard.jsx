import React from "react";
import {
  CloseButtonStyles,
  DeleteButtonStyles,
  UpdateButtonStyles,
} from "../styles/styles";
import { ImageList, ImageListItem } from "@mui/material";

const ModalCard = ({ card, updateMode, isModalOpen, handleDelete }) => {
  return (
    <div>
      <CloseButtonStyles
        onClick={() => {
          isModalOpen();
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

      <UpdateButtonStyles onClick={() => updateMode()}>
        Update
      </UpdateButtonStyles>

      <DeleteButtonStyles
        onClick={() => {
          handleDelete(card.id);
          isModalOpen();
        }}
      >
        Delete
      </DeleteButtonStyles>
    </div>
  );
};

export default ModalCard;

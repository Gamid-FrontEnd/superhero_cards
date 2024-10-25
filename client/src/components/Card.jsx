import React, { useState } from "react";
import {
  CardStyles,
  HeroImageStyles,
  HeroNameStyles,
  ModalContentStyles,
  ModalOverlayStyles,
} from "../styles/styles";
import UpdateCard from "./UpdateCard";
import ModalCard from "./ModalCard";

const Card = ({ card, handleDelete, handleUpdate }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updateMode, setUpdateMode] = useState(false);

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
              <ModalCard
                card={card}
                updateMode={() => setUpdateMode(true)}
                isModalOpen={() => setIsModalOpen(false)}
                handleDelete={handleDelete}
              />
            ) : (
              <UpdateCard
                card={card}
                isModalOpen={() => setIsModalOpen(false)}
                handleUpdate={handleUpdate}
                updateMode={() => setUpdateMode(false)}
              />
            )}
          </ModalContentStyles>
        </ModalOverlayStyles>
      )}
    </div>
  );
};

export default Card;

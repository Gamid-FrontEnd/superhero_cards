import React, { useEffect, useState } from "react";
import { getCards, deleteCard } from "./cardsServices";
import { CardListStyles } from "../styles/styles";
import Card from "./Card";
import Pagination from "@mui/material/Pagination";

const CardsList = () => {
  const [cards, setCards] = useState([{}]);
  const [updateTrigger, setUpdateTrigger] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 5;

  const fetchCards = async () => {
    const data = await getCards();
    setCards(data);
  };

  useEffect(() => {
    fetchCards();
  }, [updateTrigger]);

  const handleDelete = async (id) => {
    await deleteCard(id);
    setCards(cards.filter((card) => card.id !== id));
  };

  const handleUpdate = () => {
    setUpdateTrigger((prev) => prev + 1);
  };

  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = cards.slice(indexOfFirstCard, indexOfLastCard);

  const totalPages = Math.ceil(cards.length / cardsPerPage);

  const handlePageChange = (e, value) => {
    setCurrentPage(value);
  };

  return (
    <div>
      <h1>Cards List</h1>
      <div>
        {Object.keys(cards[0]).length !== 0 ? (
          <div>
            <CardListStyles>
              {currentCards.map((card) => (
                <div>
                  <Card
                    card={card}
                    handleDelete={handleDelete}
                    handleUpdate={handleUpdate}
                  />
                </div>
              ))}
            </CardListStyles>
            <div>
              <Pagination
                count={totalPages || 1}
                page={currentPage}
                onChange={handlePageChange}
                variant="outlined"
                shape="rounded"
                color="primary"
                sx={{
                  position: "absolute",
                  bottom: "20px",
                  left: "50%",
                  transform: "translateX(-50%)",
                }}
              />
            </div>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default CardsList;

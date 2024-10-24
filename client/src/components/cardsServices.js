import api from "./api";

export const getCards = async () => {
  const response = await api.get("/cards");
  return response.data;
};

export const addCard = async (cardData) => {
  const formData = new FormData();

  formData.append("nickname", cardData.nickname);
  formData.append("catch_phrase", cardData.catch_phrase);
  formData.append("origin_description", cardData.origin_description);
  formData.append("real_name", cardData.real_name);
  formData.append("superpowers", cardData.superpowers);

  cardData.images.forEach((image) => {
    formData.append("images", image);
  });

  const response = await api.post("/cards", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  console.log(response);
};

export const updateCard = async (id, card) => {
  const response = await api.put(`/cards/${id}`, card, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const deleteCard = async (id) => {
  const response = await api.delete(`/cards/${id}`);
  return response.data;
};

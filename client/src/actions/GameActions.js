import axios from "axios";

export const getAllGames = async () => {
  try {
    let res = await axios.get("/games");
    return res.data;
  } catch (error) {
    console.error("An error was found " + error.message);
  }
};

export const getGameById = async (game_id) => {
  try {
    let res = await axios.get(`/games/${game_id}`);
    return res.data;
  } catch (error) {
    console.error("An error was found " + error.message);
  }
};

export const insertNewGame = async (game, image) => {
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
      "x-access-token": localStorage.getItem("token"),
    },
  };
  try {
    let bodyFormData = new FormData();
    console.log(game);
    bodyFormData.append("body", JSON.stringify(game));
    bodyFormData.append("file", image);
    let res = await axios.post("/games/insert", bodyFormData, config);
    return res.data;
  } catch (error) {
    console.error("An error was found " + error.message);
  }
};

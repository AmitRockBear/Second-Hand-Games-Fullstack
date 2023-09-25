import axios from "axios";

export const signUpAction = async (user) => {
  let res = await axios.post("/auth/register", user);
  if (res.data.token !== undefined)
    localStorage.setItem("token", res.data.token);
  return res.data;
};

export const signInAction = async (user) => {
  let res = await axios.post("/auth/login", user);
  if (res.data.token !== undefined)
    localStorage.setItem("token", res.data.token);
  return res.data;
};

export const getUserByToken = async (token) => {
  const config = {
    headers: {
      "x-access-token": token,
    },
  };
  let res = await axios.get("/auth/me", config);
  return res.data; //Returns username + auth
};

export const logOutAction = async () => {
  let res = await axios.get("/auth/logout");
  localStorage.removeItem("token");
  return res.data;
};

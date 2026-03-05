import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8000/api"
});

export const loginUser = (data) => API.post("/login/", data);

export const registerUser = (data) => API.post("/register/", data);

export const getAuctions = () => API.get("/auctions/");

export const createAuction = (data, token) =>
  API.post("/auctions/", data, {
    headers: {
      Authorization: `Token ${token}`
    }
  });
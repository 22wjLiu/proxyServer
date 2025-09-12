import axios from "axios";

const localRequest = axios.create({
  baseURL: "",
});

export { localRequest };

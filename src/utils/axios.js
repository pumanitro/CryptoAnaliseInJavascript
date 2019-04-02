import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:5050",
  headers: {
    "Access-Control-Allow-Origin": "*"
  }
});

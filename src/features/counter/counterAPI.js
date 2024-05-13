import axios from "axios";

export async function fetchCount() {

  const { data } = await axios.get("https://localhost:8080");

  return data;

}

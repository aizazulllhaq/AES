import axios from "axios";

export async function fetchLoggedInUserOrders(userId) {
  const { data } = await axios.get("http://localhost:8000/orders?user.id=" + userId);
  return data;
}

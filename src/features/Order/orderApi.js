import axios from "axios";

export async function addOrder(orderDetail) {
  const response = await axios.post(
    "http://localhost:8000/orders",
    orderDetail,
    {
      "Content-Type": "application/json",
    }
  );

  return response;
}

import axios from "axios";

export async function addToCart(item) {
  const response = await axios.post("http://localhost:8000/cart", item, {
    "Content-Type": "application/json",
  });

  return response;
}

export async function fetchItemsByUserId(userId) {
  const response = await axios.get("http://localhost:8000/cart?user=" + userId);
  return response;
}

export async function updateCartItem(updateItem) {
  const response = await axios.patch(
    "http://localhost:8000/cart/" + updateItem.id,
    updateItem,
    {
      "Content-Type": "application/json",
    }
  );
  return response;
}

export async function deleteCartItem(deleteItemId) {
  try {
    const response = await axios.delete(
      `http://localhost:8000/cart/${deleteItemId}`
    );

    if (response.status === 200 || response.status === 204) {
      return deleteItemId;
    }
  } catch (err) {
    console.log("Error Occurred : ", err.message);
  }
}

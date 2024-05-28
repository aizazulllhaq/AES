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
  const { id, ...data } = updateItem;
  const response = await axios.patch("http://localhost:8000/cart/" + id, data, {
    "Content-Type": "application/json",
  });
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

export async function resetCart(userId) {
  // get all the user items
  const response = await fetchItemsByUserId(userId);
  const items = response.data;

  // delete each items
  for (let item of items) {
    try {
      const id = await deleteCartItem(item.id);
      console.log("cart deleted with this id : ", id);
    } catch (err) {
      console.log(err.message);
    }
  }

  return { status: "success" };
}

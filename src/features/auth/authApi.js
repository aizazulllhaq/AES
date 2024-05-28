import axios from "axios";

export async function createUser(userData) {
  try {
    const response = await axios.post("http://localhost:8000/users", userData, {
      "Content-Type": "application/json",
    });
    return response;
  } catch (error) {
    console.log("Error Occured : ", error.message);
  }
}

export async function checkUser(userLoginData) {
  const email = userLoginData.email;
  const password = userLoginData.password;

  const { data } = await axios.get(
    "http://localhost:8000/users?email=" + email
  );

  if (data.length) {
    if (password === data[0].password) {
      return data[0];
    } else {
      throw new Error("Wrong Credentials");
    }
  } else {
    throw new Error("User not found");
  }
}

export async function updateUser(updateUser) {
  const response = await axios.patch(
    `http://localhost:8000/users/${updateUser.id}`,
    updateUser,
    {
      "Content-Type": "application/json",
    }
  );

  return response;
}

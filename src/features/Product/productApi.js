import axios from "axios";

export async function fetchAllProducts() {

  // TODO : we will not hard-cord server URL here 
  const response = await axios.get("http://localhost:8000/products");
  return response;

}


export async function fetchProductsByFilter(filter, sort, pagination) {
  // NOTE : ["a","b","c"] => length = 3 & indexes = 2
  // filter object : {"category":["laptops","smartphones"]}
  // sort = { _sort : "price" , _order : "desc" }
  // pagination = { _page : page , limit = 10 }

  let queryString = '';
  for (let key in filter) {
    let categoryValues = filter[key]; // categories values ( array )
    if (categoryValues.length > 0) {
      let lastCategoryValue = categoryValues[categoryValues.length - 1];
      queryString += `${key}=${lastCategoryValue}&`
    }
  }
  for (const key in sort) {

    queryString += `${key}=${sort[key]}&`

  }

  for (const key in pagination) {

    queryString += `${key}=${pagination[key]}&`

  }

  // TODO : we will not hard-cord server URL here 
  const response = await axios.get("http://localhost:8000/products?" + queryString);
  // const totalItemsCount = await response.headers["x-total-count"];
  const totalItemsCount = 100;
  const data = { products: response.data, totalItemsCount: totalItemsCount }
  return data;
}


export async function fetchAllCategories() {

  const response = await axios.get("http://localhost:8000/categories");

  return response;

}

export async function fetchAllBrands() {

  const response = await axios.get("http://localhost:8000/brands");

  return response;

}


export async function fetchProductById(id) {

  const response = await axios.get("http://localhost:8000/products/" + id);
  return response;

}
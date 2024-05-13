import { useEffect } from "react";
import { Protected } from "./features/auth/components/Protected";
import CartPage from "./Pages/CartPage";
import Checkout from "./Pages/Checkout";
import Home from "./Pages/Home";
import LoginPage from "./Pages/LoginPage";
import ProductDetailPage from "./Pages/ProductDetailPage";
import SignUpPage from "./Pages/SignUpPage";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { fetchItemsByUserIdAsync } from "./features/Cart/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { selectLoggedInUser } from "./features/auth/authSlice";

const router = createBrowserRouter([
  {
    path: "/",
    element: (<Protected><Home /></Protected>),
  },
  {
    path: "/login",
    element: (<LoginPage />),
  },
  {
    path: "/signup",
    element: (<SignUpPage />),
  },
  {
    path: "/cart",
    element: (<Protected><CartPage /></Protected>),
  },
  {
    path: "/checkout",
    element: (<Protected><Checkout></Checkout></Protected>)
  }, {
    path: "/product-detail/:id",
    element: (<ProductDetailPage />)
  }
]);

function App() {

  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUser);

  useEffect(()=>{
    if(user){
      dispatch(fetchItemsByUserIdAsync(user.id))
    }
  },[dispatch , user])

  return (
    <div className="app">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;

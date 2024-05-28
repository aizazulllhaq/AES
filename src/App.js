import { useEffect } from "react";
import { Protected } from "./features/auth/components/Protected";
import CartPage from "./Pages/CartPage";
import Checkout from "./Pages/Checkout";
import Home from "./Pages/Home";
import LoginPage from "./Pages/LoginPage";
import ProductDetailPage from "./Pages/ProductDetailPage";
import SignUpPage from "./Pages/SignUpPage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { fetchItemsByUserIdAsync } from "./features/Cart/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { selectLoggedInUser } from "./features/auth/authSlice";
import PageNotFound from "./Pages/404";
import OrderSuccessPage from "./Pages/OrderSuccess";
import UserOrderPage from "./Pages/UserOrderPage";
import UserProfilePage from "./Pages/UserProfilePage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/signup",
    element: <SignUpPage />,
  },
  {
    path: "/cart",
    element: (
      <Protected>
        <CartPage />
      </Protected>
    ),
  },
  {
    path: "/checkout",
    element: (
      <Protected>
        <Checkout />
      </Protected>
    ),
  },
  {
    path: "/product-detail/:id",
    element: (
      <Protected>
        <ProductDetailPage />
      </Protected>
    ),
  },
  {
    path: "/order-success/:id",
    element: (
      <Protected>
        <OrderSuccessPage />
      </Protected>
    ),
  },
  {
    path: "/orders",
    element: (
      <Protected>
        <UserOrderPage />
      </Protected>
    ),
  },
  {
    path: "/profile",
    element: (
      <Protected>
        <UserProfilePage />
      </Protected>
    ),
  },
  {
    path: "*",
    element: <PageNotFound />,
  },
]);

function App() {
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUser);

  useEffect(() => {
    if (user) {
      dispatch(fetchItemsByUserIdAsync(user.id));
      console.log("login");
    } else {
      console.log("logout");
    }
  }, [dispatch, user]);

  return (
    <div className="app">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;

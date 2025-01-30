import { createBrowserRouter } from "react-router";
import MainLayout from "./layouts/MainLayout";
import IndexPage, {loader as productsLoader, action as changeAvailabilityProductAction} from "./pages/IndexPage";
import NewProduct, {action as newProductAction} from "./pages/NewProduct";
import EditProduct, {loader as editProductLoader,action as editProductAction} from "./pages/EditProduct";
import { action as deleteProductAction } from "./components/ProductRowDetail";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <IndexPage />,
        loader: productsLoader,
        action: changeAvailabilityProductAction
      },
      {
        path: "productos/nuevo",
        element: <NewProduct />,
        action: newProductAction
      },
      {
        path: "productos/:id/editar", // RDA pattern - Resource-oriented Design pattern
        element: <EditProduct />,
        loader: editProductLoader,
        action: editProductAction
      },
      {
        path: "productos/:id/eliminar",
        action: deleteProductAction
      }
    ]
  },
  {
  }
])

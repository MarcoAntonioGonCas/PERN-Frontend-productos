import React from "react";
import {
  ActionFunctionArgs,
  Form,
  Link,
  LoaderFunctionArgs,
  redirect,
  useActionData,
  useLoaderData,
  useNavigate,
} from "react-router";
import { Product } from "../types/product.types";
import Error from "../components/Error";
import { getProductById, updateProduct } from "../services/ProductService";
import ProductFormCommon from "../components/ProductFormCommon";

export async function loader({ params }: LoaderFunctionArgs) {
  const id = params.id as string;

  if (!id) {
    return redirect("/");
  }

  try {
    const product = await getProductById(+id);
    return product;
  } catch (error) {
    console.error(error);
    redirect("/");
  }
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData.entries());

  if (Object.values(data).includes("")) {
    return {
      error: "Todos los campos son requeridos",
    };
  }

  await updateProduct(data);

  return redirect("/");
}

const availabilityOptions = [
  { name: "Disponible", value: true },
  { name: "No Disponible", value: false },
];

export default function EditProduct() {
  const navigate = useNavigate();
  const actionData = useActionData();
  const product = useLoaderData<Product>();
  const error = actionData?.error;

  if (!product) {
    navigate("/");
  }

  return (
    <>
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold text-slate-500">Editar producto</h1>

        <Link
          className="bg-indigo-500 hover:opacity-75 text-white font-bold px-4 py-2 rounded-md transition duration-300"
          to={"/"}
        >
          Volver a productos
        </Link>
      </div>

      <Form className="mt-10" method="POST">
        {error && <Error>{error}</Error>}
        <input type="hidden" name="id" value={product.id} />

        <ProductFormCommon product={product} />

        <div className="mb-4">
          <label className="text-gray-800" htmlFor="availability">
            Disponibilidad:
          </label>
          <select
            id="availability"
            className="mt-2 block w-full p-3 bg-gray-50"
            name="availability"
            defaultValue={product?.availability.toString()}
          >
            {availabilityOptions.map((option) => (
              <option key={option.name} value={option.value.toString()}>
                {option.name}
              </option>
            ))}
          </select>
        </div>

        <input
          type="submit"
          className="mt-5 w-full bg-indigo-600 p-2 text-white font-bold text-lg cursor-pointer rounded"
          value="Registrar Producto"
        />
      </Form>
    </>
  );
}

import { Link, Form, ActionFunctionArgs, useActionData, redirect } from "react-router";
import Error from "../components/Error";
import { addProduct } from "../services/ProductService";
import ProductFormCommon from "../components/ProductFormCommon";

export async function action({
  request,
}: ActionFunctionArgs) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData.entries());

  if(Object.values(data).includes('')) {
    return {
      error: "Todos los campos son requeridos",
    }  
  }


  await addProduct(data);
  
  return redirect("/");

}


export default function NewProduct() {

  const actionData = useActionData();
  const error = actionData?.error; // Manejo seguro de undefined

  return (
    <>
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold text-slate-500">
          Registrar productos
        </h1>

        <Link
          className="bg-indigo-500 hover:opacity-75 text-white font-bold px-4 py-2 rounded-md transition duration-300"
          to={"/"}
        >
          Volver a productos
        </Link>
      </div>

      <Form className="mt-10" 
        method="POST"
        
        >
        {
          error && <Error>
            {error}
          </Error>
        }
        <ProductFormCommon />
        <input
          type="submit"
          className="mt-5 w-full bg-indigo-600 p-2 text-white font-bold text-lg cursor-pointer rounded"
          value="Registrar Producto"
        />
      </Form>
    </>
  );
}

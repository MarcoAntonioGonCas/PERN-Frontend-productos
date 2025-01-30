import { ActionFunctionArgs, Link, redirect, useLoaderData } from "react-router";
import { getProducts, patchAvailabilityProduct } from "../services/ProductService";
import { Product } from "../types/product.types";
import ProductRowDetail from "../components/ProductRowDetail";
import { safeParse } from "valibot";
import { NumberSchemaConvert } from "../schemas/convert-schemas";
export async function loader() {
  
  try {
    const products = await getProducts();
    return products;
  } catch (error) {
    console.error(error);
  }
}

export async function action({ request}:ActionFunctionArgs) {

  const form = await request.formData();
  const json = Object.fromEntries(form.entries());
  const resultConvert = safeParse(NumberSchemaConvert, json.id);

  if (resultConvert.success) {
    try {
      await patchAvailabilityProduct(resultConvert.output, json);
    } catch (error) {
      console.error(error);
    }
  }else{
    console.error("Error al convertir el id")
  }

  return redirect("/");
}

export default function IndexPage() {
  const products = useLoaderData<Product[]>();


  return (
    <>
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold text-slate-500">Productos</h1>

        <Link
          className="bg-indigo-500 hover:opacity-75 text-white font-bold px-4 py-2 rounded-md transition duration-300"
          to={"/productos/nuevo"}
        >
          Agregar producto
        </Link>
      </div>

      <div className="p-2">
        <table className="w-full mt-5 table-auto">
          <thead className="bg-slate-800 text-white">
            <tr>
              <th className="p-2">Producto</th>
              <th className="p-2">Precio</th>
              <th className="p-2">Disponibilidad</th>
              <th className="p-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {
              products.map((product) => (
                <ProductRowDetail key={product.id} product={product} />
              ))
            }
          </tbody>
        </table>
      </div>
    </>
  );
}

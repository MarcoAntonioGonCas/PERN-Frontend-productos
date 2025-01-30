import { ActionFunctionArgs, Form, redirect, useFetcher, useNavigate } from "react-router";
import { Product } from "../types/product.types";
import { formatCurrency } from "../utils";
import { safeParse } from "valibot";
import { NumberSchemaConvert } from "../schemas/convert-schemas";
import { deleteProduct } from "../services/ProductService";

type ProductRowDetailProps = {
  product: Product;
};

export async function action({ params }: ActionFunctionArgs) {
  const result = safeParse(NumberSchemaConvert, params.id);

  if (result.success) {
    try {
      await deleteProduct(result.output);
    } catch (error) {
      console.error(error);
    }
  }

  return redirect("/");
}

export default function ProductRowDetail({ product }: ProductRowDetailProps) {
  const isAvailable = product.availability;
  const fetcher = useFetcher();
  const navigate = useNavigate();
  const handleClickButtonEdit = () => {
    navigate(`/productos/${product.id}/editar`);
  };


  const handleSubmit = (e : React.FormEvent<HTMLFormElement>) => {
    if(!confirm('¿Estás seguro de eliminar este producto?')) {
        e.preventDefault();
    }
  };

  return (
    <tr className="border-b ">
      <td className="p-3 text-lg text-gray-800">{product.name}</td>
      <td className="p-3 text-lg text-gray-800">
        {formatCurrency(product.price)}
      </td>
      <td className="p-3 text-lg text-gray-800">
        <fetcher.Form method="POST" >
          <input type="hidden" name="id" value={product.id} />
          <button
            type="submit"
            name="availability"
            value={isAvailable ? "false" : "true"}
            className={
              `${ isAvailable ? "text-black" : "text-red-500" } rounded-lg p-2 text-xs uppercase font-bold w-full border-black cursor-pointer shadow`
            }
          >
            {isAvailable ? "Disponible" : "No disponible"}
          </button>
          {
            fetcher.state != "idle" && <div className="text-xs text-gray-500">Cargando...</div>
          }
        </fetcher.Form>
        
      </td>
      <td className="p-3 text-lg text-gray-800 ">
        <div className="flex gap-2 justify-center">
          {/* <Link to={`/productos/${product.id}/editar`} className="bg-indigo-500 hover:bg-indigo-700 rounded-lg w-full py-2 px-3 uppercase text-white font-bold text-xs text-center transition duration-300">
                Editar
              </Link> */}

          <button
            onClick={handleClickButtonEdit}
            className="bg-indigo-500 hover:bg-indigo-700 rounded-lg w-full py-2 px-3 uppercase text-white font-bold text-xs text-center transition duration-300"
          >
            Editar
          </button>

          <Form
            method="DELETE"
            action={`/productos/${product.id}/eliminar`}
            className="w-full"
            onSubmit={handleSubmit}
          >
            <button className="bg-red-500 hover:bg-red-700 rounded-lg w-full py-2 px-3 uppercase text-white font-bold text-xs text-center transition duration-300">
              Eliminar
            </button>
          </Form>
        </div>
      </td>
    </tr>
  );
}

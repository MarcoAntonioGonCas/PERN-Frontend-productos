import { env } from "../config/env"
import { DraftProductSchema, EditProductSchema, ProductListSchemaResponse, ProductSchemaResponse } from "../schemas/products.schema"
import { parse, safeParse } from 'valibot'
import axios from 'axios'
import { BaseResponse } from "../types/response"
import { Product, ProductResponse } from "../types/product.types"
import { BoolSchemaConvert } from "../schemas/convert-schemas"


type FormDataTypeAction = {
  [key: string]: FormDataEntryValue
}

const productsBaseApi = `${env.API_URL}/api/products`;

export const addProduct = async (data:FormDataTypeAction ):Promise<Product> => {
  try{

    const result = parse(DraftProductSchema,{
      ...data,
      price: +data.price
    })

    const getData = await axios.post<BaseResponse<Product>>(productsBaseApi, result)

    const responseParse = safeParse(ProductSchemaResponse, getData.data)

    if(!responseParse.success){
      console.error(responseParse.issues)
      throw new Error()
    }
    const response = responseParse.output

    if(response.data){
      return response.data
    }
    else{
      throw new Error(response.message)
    }
    

  }catch(error){
    console.error(error)
    throw new Error("Error al agregar el producto")
  }
}


export const getProducts = async ():Promise<Product[]> => {
  try{


    const getData = await axios.get<BaseResponse<Product[]>>(productsBaseApi)
    const respose = await parse(ProductListSchemaResponse, getData.data);

    if(respose.statusCode === 200 && respose.data){
      return respose.data
    }else{
      throw new Error(respose.message)
    }

  }catch(error){
    console.error(error)
    throw new Error("Error al obtener los productos")
  }

}

export const getProductById = async (id:Product["id"]):Promise<Product> => {
  try{

    const getData = await axios.get<BaseResponse<Product>>(`${productsBaseApi}/${id}`)
    const response = await parse(ProductSchemaResponse, getData.data)

    if(response.statusCode === 200 && response.data){
      return response.data
    }else{
      throw new Error(response.message)
    }
  }catch(error){
    console.error(error)
    throw new Error("Error al obtener el producto")
  }
}

export const updateProduct = async (data:FormDataTypeAction):Promise<Product> => {

  try{
    const resultProductRequest = parse(EditProductSchema,data)
    const responsePut = await axios.put<ProductResponse>(`${productsBaseApi}/${resultProductRequest.id}`, resultProductRequest)

    const resultParseresponse = parse(ProductSchemaResponse, responsePut.data)

    if(resultParseresponse.statusCode == 200 && resultParseresponse.data){
      return resultParseresponse.data
    }else{
      throw new Error(resultParseresponse.message)
    }

  }catch(error){
    console.error(error)
    throw new Error("Error al actualizar el producto")
  }

}

export const deleteProduct = async (id:Product["id"]):Promise<void> => {
  try{

    const response = await axios.delete<BaseResponse<Product>>(`${productsBaseApi}/${id}`)
    const result = await parse(ProductSchemaResponse, response.data)

    if(result.statusCode === 200){
      return
    }else{
      throw new Error(result.message)
    }

  }catch(error){
    console.error(error)
    throw new Error("Error al eliminar el producto")
  }
}


export const patchAvailabilityProduct = async (id:Product["id"], data:FormDataTypeAction):Promise<void> => {
  try{
    const newAvailability = parse(BoolSchemaConvert, data.availability)

    const response = await axios.patch<BaseResponse<Product>>(`${productsBaseApi}/${id}`, {availability: newAvailability})


    const result = await parse(ProductSchemaResponse, response.data)

    if(result.statusCode === 200){
      console.log("Cambiado")
    }else{
      throw new Error(result.message)
    }

  }catch(error){
    console.error(error)
    throw new Error("Error al cambiar la disponibilidad del producto")
  }

}
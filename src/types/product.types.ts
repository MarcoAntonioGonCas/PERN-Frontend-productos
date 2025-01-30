import { InferOutput } from 'valibot'
import { DraftProductSchema, ProductListSchemaResponse, ProductSchema, ProductSchemaResponse,EditProductSchema } from '../schemas/products.schema'


export type DraftProduct = InferOutput<typeof DraftProductSchema>
export type EditProduct = InferOutput<typeof EditProductSchema>
export type Product = InferOutput<typeof ProductSchema>

export type ProductResponse = InferOutput<typeof ProductSchemaResponse>
export type ProductListResponse = InferOutput<typeof ProductListSchemaResponse>
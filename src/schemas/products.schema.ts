import { string, number, object, array, boolean } from 'valibot'
import { BaseResponseSchema } from './base-response.schema'
import { DateSchema } from './date-schema'
import { BoolSchemaConvert, NumberSchemaConvert } from './convert-schemas'

export const DraftProductSchema = object({
  name: string(),
  price: NumberSchemaConvert,
})

export const EditProductSchema = object({
  id: NumberSchemaConvert,
  name: string(),
  price: NumberSchemaConvert,
  availability: BoolSchemaConvert,
})


export const ProductSchema = object({
  id: number(),
  name: string(),
  price: number(),
  availability: boolean(),
  createdAt: DateSchema,
  updatedAt: DateSchema,
})


export const ProductSchemaResponse = BaseResponseSchema(ProductSchema)
export const ProductListSchemaResponse = BaseResponseSchema(array(ProductSchema))

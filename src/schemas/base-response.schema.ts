import { object, string, array, optional,number, GenericSchema } from "valibot";

export const ErrorSchema = object({
  message: string()
})


export const BaseResponseSchema = <T extends GenericSchema>(dataSchema: T) => {
  return object({
    statusCode: number(),
    message: optional(string()),
    data: optional(dataSchema),
    errors: optional(array(ErrorSchema)),
  });
};

export const PaginatedResponseSchema = <T extends GenericSchema>(dataSchema: T) => {
  return object({
    pageIndex: number(),
    pageSize: number(),
    totalPages: number(),
    totalItems: number(),
    totalFiltered: number(),
    firstPage: number(),
    lastPage: number(),
    items: array(dataSchema),
  });
}
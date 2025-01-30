import { parse } from "valibot";
import { DateSchema } from "../schemas/date-schema";

export const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("es-US", {
    style: "currency",
    currency: "USD",
  }).format(value);
}

export const formatDate = (date: string | Date) => {
  try{
    const resultParse = parse(DateSchema,date);

    return resultParse.toLocaleDateString();
  }catch{
    throw new Error("Invalid date format");
  }
}

export const formatDateTime = (date: string | Date) => {
  try{
    const resultParse = parse(DateSchema,date);

    return new Intl.DateTimeFormat("es-ES",{
      month:"2-digit",
      day:"2-digit",
      weekday:"long",
      hour12:true,
      year:"numeric",
      hour:"2-digit",
      minute:"2-digit",
      second:"2-digit"
    }).format(resultParse);
  }catch{
    throw new Error("Invalid date format");
  }
}
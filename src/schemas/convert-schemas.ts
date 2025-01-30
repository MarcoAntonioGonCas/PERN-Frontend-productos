
import * as v from "valibot";

export const NumberSchemaConvert = v.pipe(
  v.union([
    v.number(),
    v.pipe(
      v.string(),
      v.regex(/^[-+]?\d*(\.\d+)?$/)
    )
  ]), 
  v.transform(Number),
  v.number()
);

const valuesTrue = ["true", "1", "yes", "on", "si"];
const valuesFalse = ["false", "0", "no", "off"];
const permitedBoolValues = [...valuesTrue, ...valuesFalse];

export const BoolSchemaConvert = v.pipe(
  v.union([
    v.boolean(),
    v.pipe(
      v.string(),
      v.check((value) => permitedBoolValues.includes(value.toLowerCase()), "Invalid boolean value")
    )
  ]), 
  v.transform((val)=> {
    if(typeof val === "string"){
      return valuesTrue.includes(val.toLowerCase())
    }
    return val
  }),
  v.boolean()
)
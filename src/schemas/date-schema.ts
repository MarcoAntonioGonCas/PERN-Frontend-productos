import * as v from 'valibot';

export const DateSchema =  v.pipe(
  v.union([
    v.string(),
    v.pipe(
      v.string(),
      v.isoDateTime(),
    ),
    v.number(),
    v.date(),
  ]),
  v.transform((input) => new Date(input))
);

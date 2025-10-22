import { z } from "zod";

export const Pagination = z.object({
  limit: z.number().int().positive().max(100).default(20),
  offset: z.number().int().nonnegative().default(0),
});
export type Pagination = z.infer<typeof Pagination>;

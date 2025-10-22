import { z } from "zod";
import { Pagination } from '/Users/sistalways/f25-cisc474-sistalways/packages/api/src/queries'; 

// =========================
// Reference DTO
// =========================
export const MessageRef = z.object({
  id: z.number(),
  content: z.string(),
});
export type MessageRef = z.infer<typeof MessageRef>;

// =========================
// Output DTO (API responses)
// =========================
export const MessageOut = z.object({
  id: z.number(),
  content: z.string(),
  sentAt: z.coerce.date(),
  status: z.enum(["SENT", "DRAFT", "READ", "UNREAD"]),
  senderId: z.number(),
  receiverId: z.number(),
});
export type MessageOut = z.infer<typeof MessageOut>;

// =========================
// Creation DTO (API request body)
// =========================
export const MessageCreateIn = z.object({
  content: z.string().min(1, "Message content cannot be empty"),
  senderId: z.number(),
  receiverId: z.number(),
});
export type MessageCreateIn = z.infer<typeof MessageCreateIn>;

// =========================
// Update DTO (API request body)
// =========================
export const MessageUpdateIn = z.object({
  content: z.string().optional(),
  status: z.enum(["SENT", "DRAFT", "READ", "UNREAD"]).optional(),
});
export type MessageUpdateIn = z.infer<typeof MessageUpdateIn>;

// =========================
// Query DTO (API query parameters)
// =========================
export const MessagesListFilter = Pagination.extend({
  senderId: z.number().optional(),
  receiverId: z.number().optional(),
  status: z.enum(["SENT", "DRAFT", "READ", "UNREAD"]).optional(),
  contentLike: z.string().optional(),
});
export type MessagesListFilter = z.infer<typeof MessagesListFilter>;

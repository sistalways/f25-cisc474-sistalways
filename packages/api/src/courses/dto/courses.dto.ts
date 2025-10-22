import { z } from "zod";
import { Pagination } from '/Users/sistalways/f25-cisc474-sistalways/packages/api/src/queries'; 

// =========================
// Reference DTO (lightweight relation embed)
// =========================
export const CourseRef = z.object({
  id: z.number(),
  title: z.string(),
});
export type CourseRef = z.infer<typeof CourseRef>;

// =========================
// Output DTO (API responses)
// =========================
export const CourseOut = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string().nullable(),
  instructorId: z.number(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});
export type CourseOut = z.infer<typeof CourseOut>;

// =========================
// Creation DTO (API request body)
// =========================
export const CourseCreateIn = z.object({
  title: z.string().min(1, "Course title is required"),
  description: z.string().optional().nullable(),
  instructorId: z.number(),
});
export type CourseCreateIn = z.infer<typeof CourseCreateIn>;

// =========================
// Update DTO (API request body)
// =========================
export const CourseUpdateIn = z.object({
  title: z.string().min(1).optional(),
  description: z.string().optional().nullable(),
  instructorId: z.number().optional(),
});
export type CourseUpdateIn = z.infer<typeof CourseUpdateIn>;

// =========================
// Query DTO (API query parameters)
// =========================
export const CoursesListFilter = Pagination.extend({
  instructorId: z.number().optional(),
  titleLike: z.string().optional(),
});
export type CoursesListFilter = z.infer<typeof CoursesListFilter>;

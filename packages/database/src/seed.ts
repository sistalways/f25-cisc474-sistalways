import { prisma } from "./client";

import type { User, Course, Enrollment, Assignment, Submission, Grade, Message } from "../generated/client";

// --- Default Data ---
const DEFAULT_USERS: Array<Partial<User>> = [
  { id: "1", name: "Alice Student", email: "alice@example.com" },
  { id: "2", name: "Bob Instructor", email: "bob@example.com" },
];

const DEFAULT_COURSES: Array<Partial<Course>> = [
  { id: 1, title: "Intro to Programming", description: "Learn the basics of coding", instructorId: 2 },
];

const DEFAULT_ENROLLMENTS: Array<Partial<Enrollment>> = [
  { id: 1, userId: 1, courseId: 1 },
];

const DEFAULT_ASSIGNMENTS: Array<Partial<Assignment>> = [
  { id: 1, title: "Homework 1", description: "First assignment", dueDate: new Date("2025-10-01"), courseId: 1 },
];

const DEFAULT_SUBMISSIONS: Array<Partial<Submission>> = [
  { id: 1, content: "My solution", assignmentId: 1, studentId: 1 },
];

const DEFAULT_GRADES: Array<Partial<Grade>> = [
  { id: 1, score: 95, feedback: "Great work!", submissionId: 1, graderId: 2 },
];

const DEFAULT_MESSAGES: Array<Partial<Message>> = [
  { id: 1, content: "Welcome to the course!", senderId: 2, receiverId: 1 },
];

// --- Seed Function ---
(async () => {
  try {
    console.log("🌱 Seeding Users...");
    await Promise.all(
      DEFAULT_USERS.map((user) =>
        prisma.user.upsert({
          where: { email: user.email! }, // unique field
          update: user,
          create: user,
        })
      )
    );

    console.log("🌱 Seeding Courses...");
    await Promise.all(
      DEFAULT_COURSES.map((course) =>
        prisma.course.upsert({
          where: { id: course.id! }, // id is unique
          update: course,
          create: course,
        })
      )
    );

    console.log("🌱 Seeding Enrollments...");
    await Promise.all(
      DEFAULT_ENROLLMENTS.map((enrollment) =>
        prisma.enrollment.upsert({
          where: { userId_courseId: { userId: enrollment.userId!, courseId: enrollment.courseId! } }, // composite unique
          update: {},
          create: enrollment,
        })
      )
    );

    console.log("🌱 Seeding Assignments...");
    await Promise.all(
      DEFAULT_ASSIGNMENTS.map((assignment) =>
        prisma.assignment.upsert({
          where: { id: assignment.id! },
          update: assignment,
          create: assignment,
        })
      )
    );

    console.log("🌱 Seeding Submissions...");
    await Promise.all(
      DEFAULT_SUBMISSIONS.map((submission) =>
        prisma.submission.upsert({
          where: { id: submission.id! },
          update: submission,
          create: submission,
        })
      )
    );

    console.log("🌱 Seeding Grades...");
    await Promise.all(
      DEFAULT_GRADES.map((grade) =>
        prisma.grade.upsert({
          where: { submissionId: grade.submissionId! }, // unique in schema
          update: grade,
          create: grade,
        })
      )
    );

    console.log("🌱 Seeding Messages...");
    await Promise.all(
      DEFAULT_MESSAGES.map((message) =>
        prisma.message.upsert({
          where: { id: message.id! },
          update: message,
          create: message,
        })
      )
    );

    console.log("✅ Database has been seeded successfully!");
  } catch (error) {
    console.error("❌ Error during seeding:", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
})();

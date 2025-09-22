// packages/database/src/seed.ts
import { prisma } from "./client";
import fs from "fs";
import path from "path";
import type { User, Course, Enrollment, Assignment, Submission, Grade, Message } from "../generated/client";

// --- Row counts ---
const NUM_USERS = 10;
const NUM_COURSES = 5;
const NUM_ENROLLMENTS = 15;
const NUM_ASSIGNMENTS = 8;
const NUM_SUBMISSIONS = 12;
const NUM_GRADES = 12;
const NUM_MESSAGES = 10;

// --- Hardcoded Data ---
const DEFAULT_USERS: User[] = Array.from({ length: NUM_USERS }).map((_, i) => ({
  id: i + 1,
  email: `user${i + 1}@example.com`,
  name: `User ${i + 1}`,
  role: i % 3 === 0 ? "INSTRUCTOR" : "STUDENT",
  createdAt: new Date(),
  updatedAt: new Date(),
}));

const DEFAULT_COURSES: Course[] = Array.from({ length: NUM_COURSES }).map((_, i) => ({
  id: i + 1,
  title: `Course ${i + 1}`,
  description: `Description for Course ${i + 1}`,
  createdAt: new Date(),
  updatedAt: new Date(),
  instructorId: (i % NUM_USERS) + 1,
  user: { connect: { id: (i % NUM_USERS) + 1 } },
}));

const DEFAULT_ENROLLMENTS: Enrollment[] = Array.from({ length: NUM_ENROLLMENTS }).map((_, i) => ({
  id: i + 1,
  userId: (i % NUM_USERS) + 1,
  courseId: (i % NUM_COURSES) + 1,
  enrolledAt: new Date(),
}));

const DEFAULT_ASSIGNMENTS: Assignment[] = Array.from({ length: NUM_ASSIGNMENTS }).map((_, i) => ({
  id: i + 1,
  title: `Assignment ${i + 1}`,
  description: `Description for Assignment ${i + 1}`,
  dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  createdAt: new Date(),
  updatedAt: new Date(),
  courseId: (i % NUM_COURSES) + 1,
}));

const DEFAULT_SUBMISSIONS: Submission[] = Array.from({ length: NUM_SUBMISSIONS }).map((_, i) => ({
  id: i + 1,
  content: `Submission content ${i + 1}`,
  submittedAt: new Date(),
  updatedAt: new Date(),
  assignmentId: (i % NUM_ASSIGNMENTS) + 1,
  studentId: (i % NUM_USERS) + 1,
}));

const DEFAULT_GRADES: Grade[] = Array.from({ length: NUM_GRADES }).map((_, i) => ({
  id: i + 1,
  score: 50 + (i % 51),
  feedback: `Feedback for submission ${i + 1}`,
  gradedAt: new Date(),
  submissionId: (i % NUM_SUBMISSIONS) + 1,
  graderId: (i % NUM_USERS) + 1,
}));

const DEFAULT_MESSAGES: Message[] = Array.from({ length: NUM_MESSAGES }).map((_, i) => ({
  id: i + 1,
  content: `Message content ${i + 1}`,
  sentAt: new Date(),
  status: i % 2 === 0 ? "SENT" : "READ",
  senderId: (i % NUM_USERS) + 1,
  receiverId: ((i + 1) % NUM_USERS) + 1,
}));

// --- Seed & Export JSON ---
(async () => {
  try {
    // --- Insert into Supabase ---
    await prisma.user.createMany({ data: DEFAULT_USERS, skipDuplicates: true });
    await prisma.course.createMany({ data: DEFAULT_COURSES, skipDuplicates: true });
    await prisma.enrollment.createMany({ data: DEFAULT_ENROLLMENTS, skipDuplicates: true });
    await prisma.assignment.createMany({ data: DEFAULT_ASSIGNMENTS, skipDuplicates: true });
    await prisma.submission.createMany({ data: DEFAULT_SUBMISSIONS, skipDuplicates: true });
    await prisma.grade.createMany({ data: DEFAULT_GRADES, skipDuplicates: true });
    await prisma.message.createMany({ data: DEFAULT_MESSAGES, skipDuplicates: true });

    console.log("✅ All data seeded successfully!");

    // --- Save JSON files ---
    const jsonDir = path.join(__dirname, "Seeded Data");
    if (!fs.existsSync(jsonDir)) fs.mkdirSync(jsonDir);

    function saveJSON(filename: string, data: any[]) {
      fs.writeFileSync(path.join(jsonDir, filename), JSON.stringify(data, null, 2), "utf-8");
    }

    saveJSON("Users.json", DEFAULT_USERS);
    saveJSON("Courses.json", DEFAULT_COURSES);
    saveJSON("Enrollments.json", DEFAULT_ENROLLMENTS);
    saveJSON("Assignments.json", DEFAULT_ASSIGNMENTS);
    saveJSON("Submissions.json", DEFAULT_SUBMISSIONS);
    saveJSON("Grades.json", DEFAULT_GRADES);
    saveJSON("Messages.json", DEFAULT_MESSAGES);

    console.log("✅ All JSON files saved in /Seeded Data");
  } catch (error) {
    console.error("❌ Error while seeding:", error);
  } finally {
    await prisma.$disconnect();
  }
})();

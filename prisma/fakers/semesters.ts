import { PrismaClient } from "@prisma/client";

const semesters = [
  {
    name: "Spring Semester - 2022",
    startDate: new Date("2022-01-01"),
    endDate: new Date("2022-05-31"),
    active: 0,
  },
  {
    name: "Summer Semester - 2022",
    startDate: new Date("2022-06-01"),
    endDate: new Date("2022-07-31"),
    active: 0,
  },
  {
    name: "Fall Semester - 2022",
    startDate: new Date("2022-08-01"),
    endDate: new Date("2022-12-31"),
    active: 0,
  },
  {
    name: "Spring Semester - 2023",
    startDate: new Date("2023-01-01"),
    endDate: new Date("2023-05-31"),
    active: 0,
  },
  {
    name: "Summer Semester - 2023",
    startDate: new Date("2023-06-01"),
    endDate: new Date("2023-07-31"),
    active: 0,
  },
  {
    name: "Fall Semester - 2023",
    startDate: new Date("2023-08-01"),
    endDate: new Date("2023-12-31"),
    active: 0,
  },
  {
    name: "Spring Semester - 2024",
    startDate: new Date("2024-01-01"),
    endDate: new Date("2024-05-31"),
    active: 1,
  },
  {
    name: "Summer Semester - 2024",
    startDate: new Date("2024-06-01"),
    endDate: new Date("2024-07-31"),
    active: 0,
  },
  {
    name: "Fall Semester - 2024",
    startDate: new Date("2024-08-01"),
    endDate: new Date("2024-12-31"),
    active: 0,
  },
];

export function fakeSemesters() {
  return semesters;
}

export async function fakeStudentSemesters(client: PrismaClient) {
  const semesterStudents = [];
  const semesters = await client.semester.findMany({
    where: {
      startDate: {
        lte: new Date(),
      },
    },
  });
  const students = await client.student.findMany();
  for (const sem of semesters) {
    for (const stu of students) {
      const semStudent = {
        semesterId: sem.id,
        studentId: stu.id,
        active: sem.active,
      };
      semesterStudents.push(semStudent);
    }
  }
  return semesterStudents;
}

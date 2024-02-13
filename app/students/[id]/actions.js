"use server";
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";

export async function getStudent(studentId) {
  const id = Number(studentId);
  if (!id) notFound();
  const student = await prisma.student.findUnique({
    where: {
      id,
    },
  });
  if (!student) notFound();
  const semesters = await prisma.semester.findMany({
    where: {
      students: {
        some: {
          studentId: 1,
        },
      },
    },
  });
  return { student, semesters };
}

export async function getSemesterCourses(stuId, semId) {
  stuId = Number(stuId);
  semId = Number(semId);
  if (!stuId || !semId) return [];
  return await prisma.course.findMany({
    where: {
      students: {
        some: {
          studentId: stuId,
          semesterId: semId,
        },
      },
    },
  });
}

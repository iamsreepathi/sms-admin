"use server";

import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";

export async function getStudentSemesters(studentId) {
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
      endDate: {
        gt: new Date(),
      },
    },
  });
  return { student, semesters };
}

export async function getSemCourses(semId) {
  let courses = [];
  const id = Number(semId);
  if (id) {
    courses = await prisma.course.findMany({
      where: {
        semesters: {
          some: {
            semesterId: id,
          },
        },
      },
    });
  }
  return courses;
}

export async function registerCourses(stuId, semId, courses) {
  let status = 201;
  stuId = Number(stuId);
  semId = Number(semId);
  if (!stuId || !semId) notFound();
  try {
    const data = courses.map((c) => ({
      courseId: c.id,
      semesterId: semId,
      studentId: stuId,
    }));
    const res = await prisma.student_course.createMany({
      data,
      skipDuplicates: true,
    });
    return { status, data: res };
  } catch (error) {
    status = 500;
    let errors = { server: "Something went wrong" };
    if (error?.code === "P2003")
      errors = { server: "Foreign key check failed." };
    return { status, errors };
  }
}

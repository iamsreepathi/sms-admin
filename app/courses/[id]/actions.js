"use server";
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";

export async function getCourse(courseId) {
  const id = Number(courseId);
  if (!id) notFound();
  const course = await prisma.course.findUnique({
    where: {
      id,
    },
    include: {
      teacher: true,
    },
  });
  if (!course) notFound();
  const semesters = await prisma.semester.findMany({
    orderBy: {
      startDate: "desc",
    },
    select: {
      id: true,
      name: true,
      active: true,
    },
    where: {
      courses: {
        some: {
          courseId: course.id,
        },
      },
    },
  });
  return { course, semesters };
}

export async function getCourseSemesters(courseId) {
  const id = Number(courseId);
  if (!id) notFound();
  return await prisma.semester.findMany({
    take: 20,
    orderBy: {
      startDate: "desc",
    },
    select: {
      id: true,
      name: true,
      active: true,
    },
    where: {
      courses: {
        some: {
          courseId,
        },
      },
    },
  });
}

export async function getCourseStudents(courseId, semesterId) {
  courseId = Number(courseId);
  semesterId = Number(semesterId);
  if (!courseId || !semesterId) return [];
  return await prisma.student.findMany({
    where: {
      courses: {
        some: {
          courseId,
          semesterId,
        },
      },
    },
  });
}

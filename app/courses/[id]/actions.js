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
  return course;
}

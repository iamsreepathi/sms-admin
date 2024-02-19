"use server";
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";

export async function getTeacher(teacherId) {
  const id = Number(teacherId);
  if (!id) notFound();
  const teacher = await prisma.teacher.findUnique({
    where: {
      id,
    },
    include: {
      courses: true,
      department: true,
    },
  });
  if (!teacher) notFound();
  return teacher;
}

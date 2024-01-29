"use server";
import prisma from "@/lib/prisma";

export async function getCourses(depId, catId = null) {
  const categories = await prisma.category.findMany({
    where: {
      depId,
    },
  });
  let courses = [];
  if (!catId && categories.length) {
    catId = categories[0].id;
    courses = await prisma.course.findMany({
      take: 15,
      where: {
        catId,
      },
    });
  }
  return { categories, courses, catId };
}

export async function getCoursesByCategory(catId) {
  const courses = await prisma.course.findMany({
    take: 15,
    where: {
      catId,
    },
  });
  return courses;
}

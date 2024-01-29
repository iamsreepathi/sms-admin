"use server";

import prisma from "@/lib/prisma";

export async function getDepartment(id) {
  const data = await prisma.department.findUnique({
    where: {
      id,
    },
    include: {
      categories: true,
    },
  });
  return data;
}

"use server";

import prisma from "@/lib/prisma";

export async function getDepartments() {
  const data = await prisma.department.findMany();
  return data;
}

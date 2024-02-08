"use server";

import prisma from "@/lib/prisma";
import { CategorySchema } from "@/lib/schema";
import { revalidatePath } from "next/cache";
import { ZodError } from "zod";

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

export async function addCategory(depId, payload) {
  let status = 201;
  try {
    const data = CategorySchema.parse(payload);
    const res = await prisma.category.create({
      data: {
        depId: +depId,
        ...data,
      },
    });
    revalidatePath("/departments/[id]");
    return { status, data: res };
  } catch (error) {
    let errors = {};
    if (error instanceof ZodError) {
      status = 422;
      const { issues } = error;
      issues.forEach((issue) => {
        errors = { ...errors, [issue.path[0]]: issue.message };
      });
    } else {
      status = 500;
      errors = { server: error?.message || "Something went wrong" };
    }
    return { status, errors };
  }
}

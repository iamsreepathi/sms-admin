"use server";

import prisma from "@/lib/prisma";
import { DepartmentSchema } from "@/lib/schema";
import { revalidatePath } from "next/cache";
import { ZodError } from "zod";

export async function getDepartments() {
  // await new Promise((resolve) => setTimeout(resolve, 3000));
  const data = await prisma.department.findMany();
  return data;
}

export async function getAvailableHods() {
  // await new Promise((resolve) => setTimeout(resolve, 3000));
  const teachers = await prisma.available_hods.findMany();
  return teachers;
}

export async function addDepartment(payload) {
  let status = 201;
  try {
    const data = DepartmentSchema.parse(payload);
    const res = await prisma.department.create({ data });
    revalidatePath("/departments", "page");
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

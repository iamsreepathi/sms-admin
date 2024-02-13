"use server";

import prisma from "@/lib/prisma";
import { CategorySchema, HodSchema } from "@/lib/schema";
import { revalidatePath } from "next/cache";
import { ZodError } from "zod";

export async function getDepartment(id) {
  const dept = await prisma.department.findUnique({
    where: {
      id,
    },
    include: {
      categories: true,
    },
  });
  const hodId = dept.hodId;
  let hod = null;
  if (hodId) {
    hod = await prisma.teacher.findUnique({
      where: {
        id: hodId,
      },
    });
  }

  return { dept, hod };
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
    revalidatePath("/departments/[id]", "page");
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

export async function updateHod(depId, payload) {
  let status = 201;
  try {
    const data = HodSchema.parse(payload);
    const res = await prisma.department.update({
      where: {
        id: depId,
      },
      data,
    });
    revalidatePath("/departments/[id]", "page");
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

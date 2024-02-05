"use server";
import prisma from "@/lib/prisma";
import { TeacherSchema } from "@/lib/schema";
import { ZodError } from "zod";

export async function getTeachers(key = 0, take = 20) {
  const id = key ? key : 0;
  let input = {
    take,
    orderBy: {
      id: "asc",
    },
    where: {
      id: {
        gt: id,
      },
    },
  };
  let error = null;
  let records = [];
  try {
    records = await prisma.teacher.findMany(input);
  } catch (err) {
    console.error(err);
    error = "Failed to fetch teachers data. Please try again.";
  }
  const data = records.map((r) => ({
    ...r,
    admission: r.admission.toLocaleDateString(),
    dob: r.dob.toLocaleDateString(),
  }));
  const len = data.length;
  key = len ? data[len - 1].id : null;
  return { data, key, error };
}

export async function addTeacher(payload) {
  let status = 201;
  try {
    const data = TeacherSchema.parse(payload);
    const res = await prisma.teacher.create({ data });
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
      errors = { server: "Something went wrong" };
    }
    return { status, errors };
  }
}

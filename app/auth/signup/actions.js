"use server";
import prisma from "@/lib/prisma";
import { SignUpSchema } from "@/lib/schema";
import * as bcrypt from "bcrypt";
import { ZodError } from "zod";

export async function registerUser() {
  let status = 201;
  try {
    const user = SignUpSchema.parse(payload);
    const res = await prisma.user.create({
      data: {
        ...user,
        password: await bcrypt.hash(user.password, 10),
      },
    });
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

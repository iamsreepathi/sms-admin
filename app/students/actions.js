"use server";
import prisma from "@/lib/prisma";

export async function getStudents(key = 0, take = 20) {
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
    records = await prisma.student.findMany(input);
  } catch (err) {
    console.error(err);
    error = "Failed to fetch students data. Please try again.";
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

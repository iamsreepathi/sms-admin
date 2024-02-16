import { Prisma, PrismaClient } from "@prisma/client";

const models = [
  {
    model: "categories",
    table: "category",
    display: 0,
    desc: "Total course categories available in various departments",
    query: Prisma.sql`SELECT count(*) FROM category`,
  },
  {
    model: "courses",
    table: "course",
    display: 1,
    desc: "Total courses offered",
    query: Prisma.sql`SELECT count(*) FROM course`,
  },
  {
    model: "departments",
    table: "department",
    display: 1,
    desc: "Total departments available",
    query: Prisma.sql`SELECT count(*) FROM department`,
  },
  {
    model: "students",
    table: "student",
    display: 1,
    desc: "Total students enrolled in various departments",
    query: Prisma.sql`SELECT count(*) FROM student`,
  },
  {
    model: "teachers",
    table: "teacher",
    display: 1,
    desc: "Total teachers hired by various departments",
    query: Prisma.sql`SELECT count(*) FROM teacher`,
  },
];
export default async function fakeCounter(client: PrismaClient) {
  const counter = [];
  for (const model of models) {
    const res: any[] = await client.$queryRaw(model.query);
    const count = Number(res[0].count.toString());
    counter.push({
      model: model.model,
      count,
      shortDesc: model.desc,
      display: model.display,
    });
  }
  return counter;
}

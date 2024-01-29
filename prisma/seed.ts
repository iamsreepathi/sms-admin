import { PrismaClient } from "@prisma/client";
import { fakeStudents } from "./fakers/students";
import { fakeTeachers } from "./fakers/teachers";
import {
  fakeCategories,
  fakeCourses,
  fakeDepartments,
} from "./fakers/course-catalog";
// import { fakeDepartments } from "./fakers/course-catalog";

const client = new PrismaClient();

async function createStudents() {
  const data = fakeStudents(50);
  const students = await client.student.createMany({
    data,
  });
  console.log(students);
  console.log("students data is seeded");
}

async function createTeachers() {
  const data = fakeTeachers(30);
  const teachers = await client.teacher.createMany({
    data,
  });
  console.log(teachers);
  console.log("teachers data is seeded");
}

async function createDepartments() {
  const data = await fakeDepartments(client);
  const departments = await client.department.createMany({
    data,
  });
  console.log(departments);
  console.log("departments data is seeded");
}

async function createCategories() {
  const data = await fakeCategories(client);
  const categories = await client.category.createMany({
    data,
  });
  console.log(categories);
  console.log("categories data is seeded");
}

async function createCourses() {
  const data = await fakeCourses(client);
  const courses = await client.course.createMany({
    data,
  });
  console.log(courses);
  console.log("course data is seeded");
}

const main = async () => {
  // await createStudents();
  // await createTeachers();
  // await createDepartments();
  // await createCategories();
  // await createCourses();
};

main()
  .then(async () => {
    await client.$disconnect();
  })
  .catch(async (err) => {
    await client.$disconnect();
    console.error(err);
    process.exit(1);
  });

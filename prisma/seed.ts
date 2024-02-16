import { PrismaClient } from "@prisma/client";
import { fakeStudentCourses, fakeStudents } from "./fakers/students";
import { fakeTeachers } from "./fakers/teachers";
import {
  fakeCategories,
  fakeCourses,
  fakeDepartments,
} from "./fakers/course-catalog";
import { fakeSemesters, fakeStudentSemesters } from "./fakers/semesters";
import fakeCounter from "./fakers/counter";
import { fakeEvents } from "./fakers/events";
// import { fakeDepartments } from "./fakers/course-catalog";

const client = new PrismaClient();

async function createEvents() {
  const data = fakeEvents();
  const events = await client.event.createMany({
    data,
  });
  console.log(events);
  console.log("events data is seeded");
}

async function createCounter() {
  const data = await fakeCounter(client);
  const counter = await client.counter.createMany({
    data,
  });
  console.log(counter);
  console.log("counter data is seeded");
}

async function createSemesters() {
  const data = fakeSemesters();
  const semesters = await client.semester.createMany({
    data,
  });
  console.log(semesters);
  console.log("semester data is seeded");
}

async function createStudents() {
  const data = await fakeStudents(client, 10);
  const students = await client.student.createMany({
    data,
  });
  console.log(students);
  console.log("students data is seeded");
}

async function createSemesterStudents() {
  const data = await fakeStudentSemesters(client);
  const semStudents = await client.semester_student.createMany({ data });
  console.log(semStudents);
  console.log("semester students data is seeded");
}

async function createTeachers() {
  const data = await fakeTeachers(client, 10);
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

async function createStudentCourses() {
  const data = await fakeStudentCourses(client);
  const stuCourses = await client.student_course.createMany({ data });
  console.log(stuCourses);
  console.log("student courses data is seeded");
}

const main = async () => {
  // await createDepartments();
  // await createSemesters();
  // await createStudents();
  // await createTeachers();
  // await createCategories();
  await createCourses();
  await createSemesterStudents();
  await createStudentCourses();
  await createCounter();
  await createEvents();
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

import { faker } from "@faker-js/faker";
import { Gender, PrismaClient } from "@prisma/client";

export async function fakeStudents(client: PrismaClient, num = 10) {
  const users = [];
  const deps = await client.department.findMany();
  for (let k = 0; k < deps.length; k++) {
    const dep = deps[k];
    for (let i = 0; i < num; i++) {
      const user = {
        name: faker.person.fullName(),
        email: faker.internet.email(),
        dob: faker.date.past(),
        father: faker.person.fullName({ sex: "male" }),
        mother: faker.person.fullName({ sex: "female" }),
        admission: faker.date.past(),
        gender: faker.helpers.arrayElement([Gender.Male, Gender.Female]),
        depId: dep.id,
      };
      users.push(user);
    }
  }

  return users;
}

export async function fakeStudentCourses(client: PrismaClient) {
  const studentCourses = [];
  const students = await client.student.findMany();
  for (const stu of students) {
    let id = 0;
    const semesters = await client.semester.findMany({
      where: {
        students: {
          some: {
            studentId: stu.id,
          },
        },
      },
    });
    for (const sem of semesters) {
      const courses = await client.course.findMany({
        where: {
          id: {
            gt: id,
          },
        },
        take: 4,
      });
      for (const course of courses) {
        const stuCourse = {
          courseId: course.id,
          studentId: stu.id,
          semesterId: sem.id,
        };
        studentCourses.push(stuCourse);
      }
      id = courses[courses.length - 1].id ?? 0;
    }
  }
  return studentCourses;
}

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
  let stuId = 0;
  const semesters = await client.semester.findMany({
    where: {
      startDate: {
        lt: new Date(),
      },
    },
  });
  for (const sem of semesters) {
    const courses = await client.course.findMany({
      where: {
        semesters: {
          some: {
            semesterId: sem.id,
          },
        },
      },
    });
    for (const course of courses) {
      const students = await client.student.findMany({
        where: {
          id: {
            gt: stuId,
          },
        },
        take: 10,
      });
      for (const stu of students) {
        const stuCourse = {
          courseId: course.id,
          studentId: stu.id,
          semesterId: sem.id,
        };
        studentCourses.push(stuCourse);
      }
      stuId = students.length ? students[students.length - 1].id : 0;
    }
  }
  return studentCourses;
}

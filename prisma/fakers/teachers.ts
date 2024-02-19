import { faker } from "@faker-js/faker";
import { Gender, PrismaClient } from "@prisma/client";

const subjects = [
  "Mathematics",
  "Algebra",
  "Geometry",
  "Science",
  "Geography",
  "History",
  "English",
  "Spanish",
  "German",
  "French",
  "Computer Science",
];

export async function fakeTeachers(client: PrismaClient, num = 10) {
  const teachers = [];
  const deps = await client.department.findMany();
  for (let i = 0; i < deps.length; i++) {
    const dep = deps[0];
    for (let k = 0; k < num; k++) {
      const teacher = {
        name: faker.person.fullName(),
        email: faker.internet.email(),
        dob: faker.date.past(),
        father: faker.person.fullName({ sex: "male" }),
        mother: faker.person.fullName({ sex: "female" }),
        admission: faker.date.past(),
        gender: faker.helpers.arrayElement([Gender.Male, Gender.Female]),
        subject: faker.helpers.arrayElement(subjects),
        depId: dep.id,
      };
      teachers.push(teacher);
    }
  }
  return teachers;
}

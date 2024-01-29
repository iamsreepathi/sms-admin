import { faker } from "@faker-js/faker";
import { Gender, Prisma } from "@prisma/client";

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

export function fakeTeachers(num = 10) {
  const teachers: Prisma.teacherCreateInput[] = [];

  for (let i = 0; i < num; i++) {
    const teacher = {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      dob: faker.date.past(),
      father: faker.person.fullName({ sex: "male" }),
      mother: faker.person.fullName({ sex: "female" }),
      admission: faker.date.past(),
      gender: faker.helpers.arrayElement([Gender.Male, Gender.Female]),
      subject: faker.helpers.arrayElement(subjects),
    };
    teachers.push(teacher);
  }
  return teachers;
}

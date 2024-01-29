import { faker } from "@faker-js/faker";
import { Gender, Prisma } from "@prisma/client";

export function fakeStudents(num = 10) {
  const users: Prisma.studentCreateInput[] = [];

  for (let i = 0; i < num; i++) {
    const user = {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      dob: faker.date.past(),
      father: faker.person.fullName({ sex: "male" }),
      mother: faker.person.fullName({ sex: "female" }),
      admission: faker.date.past(),
      gender: faker.helpers.arrayElement([Gender.Male, Gender.Female]),
    };
    users.push(user);
  }
  return users;
}

import { faker } from "@faker-js/faker";
import { PrismaClient } from "@prisma/client";

const departments = {
  Acounting: [
    "Book Keeping",
    "Compliance",
    "Economics",
    "Investing & Trading",
    "Money Management Tools",
    "Taxes",
  ],
  "Business Administration": [
    "Entrepreneurship",
    "Communication",
    "Management",
    "Sales",
    "Business Strategy",
  ],
  "Computer Science": [
    "Web Development",
    "Data Science",
    "Mobile Development",
    "Programming Languages",
    "Database Design & Development",
    "Sofware Engineering",
    "Software Testing",
  ],
  Finance: ["Financial Modeling & Analysis", "Finance Cert & Exam"],
  Mathematics: ["Math", "Statistics", "Algebra", "Calculus", "Probability"],
  Music: [
    "Instruments",
    "Music Production",
    "Music Fundamentals",
    "Vocal",
    "Music Techniques",
    "Music Software",
  ],
  Physics: [
    "Mechanics",
    "Quantum Mechanics",
    "AP Physics",
    "Quantum Computing",
  ],
};

export async function fakeDepartments(client: PrismaClient) {
  let id = 0;
  const data = [];
  for (const dep in departments) {
    const department = {
      name: dep,
      shortDesc: faker.lorem.paragraph(),
      description: faker.lorem.paragraph(8),
      phone: faker.helpers.fromRegExp(/([1-9]{3}) [0-9]{3}-[0-9]{4}/),
      email: faker.internet.email(),
      line1: faker.location.streetAddress(),
      line2: faker.location.secondaryAddress(),
      city: faker.location.city(),
      region: faker.location.state({ abbreviated: true }),
      postalCode: faker.location.zipCode("#####"),
    };
    data.push(department);
  }
  return data;
}

interface ICat {
  name: string;
  description: string;
  depId: number;
}

export async function fakeCategories(client: PrismaClient) {
  let data: ICat[] = [];
  for (const dep in departments) {
    const depmnt = await client.department.findFirst({
      where: {
        name: {
          equals: dep,
        },
      },
    });
    if (depmnt) {
      const key = dep as keyof typeof departments;
      const categories: ICat[] = departments[key].map((c: string) => ({
        name: c,
        description: faker.lorem.paragraph(),
        depId: depmnt.id,
      }));
      data.push(...categories);
    }
  }
  return data;
}

export async function fakeCourses(client: PrismaClient) {
  let data = [];
  const categories = await client.category.findMany();
  let id = 0;

  for (const cat of categories) {
    const ratings = Number(faker.number.bigInt({ min: 100, max: 10000 }));
    const teacher = await client.teacher.findFirst({
      where: {
        id: {
          gt: id,
        },
      },
    });
    if (teacher) {
      id = teacher.id;
      for (let i = 0; i < 30; i++) {
        const course = {
          name: faker.person.fullName(),
          catId: cat.id,
          description: faker.lorem.paragraph(8),
          ratings,
          overallRating: faker.number.int({
            min: ratings * 3,
            max: ratings * 5,
          }),
          credits: 3,
          capacity: faker.number.int({
            min: 30,
            max: 60,
          }),
          startDate: faker.date.soon(),
          endDate: faker.date.soon({
            days: 10,
            refDate: new Date().toISOString(),
          }),
          location: faker.location.streetAddress(),
          teacherName: teacher.name,
          teacherId: id,
        };
        data.push(course);
      }
    }
  }
  return data;
}

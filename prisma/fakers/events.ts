import { faker } from "@faker-js/faker";

export function fakeEvents(num = 10) {
  const events = [];
  for (let i = 0; i < num; i++) {
    const start = faker.date.future();
    const event = {
      title: faker.commerce.productName(),
      description: faker.lorem.paragraph(3),
      start,
      end: faker.date.future({ refDate: start.toISOString() }),
      location: faker.location.streetAddress(),
      organizer: faker.person.fullName(),
      email: faker.internet.email(),
    };
    events.push(event);
  }
  return events;
}

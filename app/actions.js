import prisma from "@/lib/prisma";

export async function getCardData() {
  return await prisma.counter.findMany({
    where: {
      display: 1,
    },
  });
}

export async function getUpcomingEvents() {
  const start = new Date();
  const events = await prisma.event.findMany({
    where: {
      start: {
        gte: start,
      },
    },
    orderBy: [
      {
        start: "asc",
      },
    ],
  });
  return events.map((e) => ({
    ...e,
    monthDay: e.start.toLocaleString("default", {
      month: "short",
      day: "2-digit",
    }),
  }));
}

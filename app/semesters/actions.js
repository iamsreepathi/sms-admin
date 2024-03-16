import prisma from "@/lib/prisma";

export async function getSemesters() {
  let semesters = await prisma.semester.findMany({
    orderBy: {
      startDate: "asc",
    },
  });
  const activeSem = semesters.find((s) => s.active);
  let futureSems = [];
  if (activeSem)
    futureSems = semesters.filter((s) => s.startDate > activeSem.endDate);
  semesters = semesters.map((r) => ({
    ...r,
    startDate: r.startDate.toLocaleDateString(),
    endDate: r.endDate.toLocaleDateString(),
  }));
  return { semesters, activeSem, futureSems };
}

export async function activateSemester(sem) {
  if (!sem) {
    return {
      status: 500,
      errors: { server: "Invalid semester data provided." },
    };
  }
  await prisma.semester.update({
    where: { active: 1 },
    data: {
      active: 0,
    },
  });

  await prisma.semester.update({
    where: { id: sem.id },
    data: {
      active: 1,
    },
  });
  return {
    status: 201,
    data: {
      message: "Semester activated successfully.",
    },
  };
}

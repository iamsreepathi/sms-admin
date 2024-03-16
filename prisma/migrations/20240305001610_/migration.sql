-- CreateTable
CREATE TABLE "semester_course" (
    "semesterId" INTEGER NOT NULL,
    "courseId" INTEGER NOT NULL,
    "active" SMALLINT NOT NULL,

    CONSTRAINT "semester_course_pkey" PRIMARY KEY ("semesterId","courseId")
);

-- AddForeignKey
ALTER TABLE "semester_course" ADD CONSTRAINT "semester_course_semesterId_fkey" FOREIGN KEY ("semesterId") REFERENCES "semester"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "semester_course" ADD CONSTRAINT "semester_course_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "course"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- CreateTable
CREATE TABLE "student_course" (
    "id" SERIAL NOT NULL,
    "studentId" INTEGER NOT NULL,
    "courseId" INTEGER NOT NULL,
    "semesterId" INTEGER NOT NULL,

    CONSTRAINT "student_course_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "student_course" ADD CONSTRAINT "student_course_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "student"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "student_course" ADD CONSTRAINT "student_course_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "course"("id") ON DELETE CASCADE ON UPDATE CASCADE;

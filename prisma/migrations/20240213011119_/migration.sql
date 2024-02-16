-- CreateTable
CREATE TABLE "counter" (
    "id" SERIAL NOT NULL,
    "model" VARCHAR(100) NOT NULL,
    "count" BIGINT NOT NULL,
    "shortDesc" VARCHAR(255) NOT NULL,
    "display" SMALLINT NOT NULL,

    CONSTRAINT "counter_pkey" PRIMARY KEY ("id")
);

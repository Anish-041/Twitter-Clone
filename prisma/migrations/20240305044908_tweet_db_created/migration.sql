-- CreateTable
CREATE TABLE "tweet" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "tweet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "clerkUserId" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "about" TEXT,
    "image" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("clerkUserId")
);

-- CreateTable
CREATE TABLE "Artist" (
    "userId" TEXT NOT NULL,
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "about" TEXT,
    "image" TEXT,

    CONSTRAINT "Artist_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_clerkUserId_key" ON "User"("clerkUserId");

-- AddForeignKey
ALTER TABLE "Artist" ADD CONSTRAINT "Artist_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("clerkUserId") ON DELETE RESTRICT ON UPDATE CASCADE;

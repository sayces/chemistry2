import { PrismaClient, Prisma } from "../src/app/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import "dotenv/config";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({
  adapter,
});

const userData: Prisma.UserCreateInput[] = [
  {
    fullname: "Arina",
    email: "domanina.2002@mail.ru",
    password: "1234",
  },
  {
    fullname: "Sasha",
    email: "sayces@mail.ru",
    password: "9410",
    slots: {
      create: [
        {
          dateTime: new Date("2024-05-11T19:54:00Z"),
        },
      ],
    },
  },
];

export async function main() {
  for (const u of userData) {
    await prisma.user.create({ data: u });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

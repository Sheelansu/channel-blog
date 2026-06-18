import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";

export const createPrisma = (DATABASE_URL: string) =>
  new PrismaClient({
    datasourceUrl: DATABASE_URL,
  }).$extends(withAccelerate());

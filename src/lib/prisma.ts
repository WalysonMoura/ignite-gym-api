import { PrismaClient } from '@prisma/client';

const prismaClientSingleton = () => {
  return new PrismaClient();
};

declare global {
  var prismaGlobal: undefined | ReturnType<typeof prismaClientSingleton>;
}

// Set prismaGlobal before exporting prisma instance
if (process.env.NODE_ENV !== 'production') {
  globalThis.prismaGlobal = prismaClientSingleton();
}

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

export default prisma;

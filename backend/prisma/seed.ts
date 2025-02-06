import { PrismaClient } from '@prisma/client';
import { Bcrypt } from '../src/utils/bcrypt';

const prisma = new PrismaClient();

async function seeder() {
  const user = await prisma.user.create({
    data: {
      login: 'admin',
      password: await Bcrypt.hash('admin'),
    },
  });

  console.log('First admin created: ', user);
}

seeder()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash('password', 10);
  await prisma.user.upsert({
    where: { email: 'user@example.com' },
    update: {},
    create: {
      name: 'User',
      email: 'user@example.com',
      password: hashedPassword,
      role: 'Student Researcher',
    },
  });

  await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      name: 'Admin',
      email: 'admin@example.com',
      password: await bcrypt.hash('adminpass', 10),
      role: 'Admin',
    },
  });

  // Seed projects and tutorials from mockData
  for (const project of mockData.projects) {
    await prisma.project.upsert({
      where: { id: project.id },
      update: {},
      create: {
        ...project,
        authorId: '1', // User ID
        tags: project.tags, // Array
      },
    });
  }

  for (const tutorial of mockData.tutorials) {
    await prisma.tutorial.upsert({
      where: { id: tutorial.id },
      update: {},
      create: {
        ...tutorial,
        content: '', // Empty JSON
        authorId: '1',
      },
    });
  }
}

main()
  .catch(e => console.error(e))
  .finally(async () => await prisma.$disconnect());

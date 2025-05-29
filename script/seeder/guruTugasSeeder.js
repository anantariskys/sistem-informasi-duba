const { PrismaClient } = require('@prisma/client');
const { faker } = require('@faker-js/faker/locale/id_ID');
const prisma = new PrismaClient();

async function main() {
  try {
    // Create PenanggunJawabGuruTugas first
    const numberOfPJ = 10; // Number of PenanggunJawab
    const pjIds = [];

    for (let i = 0; i < numberOfPJ; i++) {
      const pj = await prisma.penanggunJawabGuruTugas.create({
        data: {
          nama: `${faker.person.firstName()} ${faker.person.lastName()}`,
          alamat: faker.location.streetAddress(true),
          jurusan: faker.helpers.arrayElement([
            'Tahfidz',
            'Dakwah',
            'Bahasa Arab',
            'Fiqih',
            'Hadits',
            'Tafsir',
          ]),
          nomorHp: faker.phone.number('08##########'),
          foto: faker.image.avatar(),
          createdAt: faker.date.past(),
          updatedAt: faker.date.recent(),
        },
      });
      pjIds.push(pj.id);
    }

    // Create GuruTugas with random assignment to PenanggunJawab
    const numberOfGuru = 50; // Number of GuruTugas

    for (let i = 0; i < numberOfGuru; i++) {
      await prisma.guruTugas.create({
        data: {
          nama: `${faker.person.firstName()} ${faker.person.lastName()}`,
          alamat: faker.location.streetAddress(true),
          jurusan: faker.helpers.arrayElement([
            'Tahfidz',
            'Dakwah',
            'Bahasa Arab',
            'Fiqih',
            'Hadits',
            'Tafsir',
          ]),
          nomorHp: faker.phone.number('08##########'),
          foto: faker.image.avatar(),
          createdAt: faker.date.past(),
          updatedAt: faker.date.recent(),
          // Make some GuruTugas without PenanggunJawab (20% chance)
          penanggungJawabId: faker.datatype.boolean(0.8)
            ? faker.helpers.arrayElement(pjIds)
            : null,
        },
      });
    }

    console.log('GuruTugas and PenanggunJawab seeded successfully');
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();

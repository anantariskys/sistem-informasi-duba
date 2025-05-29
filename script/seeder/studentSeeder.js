const { PrismaClient } = require('@prisma/client');
const { faker } = require('@faker-js/faker/locale/id_ID');
const prisma = new PrismaClient();

async function main() {
  try {
    const numberOfStudents = 100; // Jumlah data yang ingin dibuat

    for (let i = 0; i < numberOfStudents; i++) {
      const gender = faker.person.sex();
      const firstName = faker.person.firstName(
        gender === 'male' ? 'male' : 'female'
      );
      const lastName = faker.person.lastName();

      await prisma.student.create({
        data: {
          nik: faker.helpers.replaceSymbols('################'),
          kkNumber: faker.helpers.replaceSymbols('################'),
          nama: `${firstName} ${lastName}`,
          gender: gender === 'male' ? 'male' : 'female',
          birthDate: faker.date.between({
            from: '1990-01-01',
            to: '2005-12-31',
          }),
          birthPlace: faker.location.city(),
          phoneNumber: faker.phone.number('08##########'),
          email: faker.internet.email({ firstName, lastName }).toLowerCase(),
          address: faker.location.streetAddress(true),
          village: faker.location.street(),
          district: faker.location.county(),
          regency: faker.location.city(),
          province: faker.location.state(),
          kodePos: faker.location.zipCode('#####'),
          dormitory: faker.helpers.arrayElement([
            'A1',
            'A2',
            'B1',
            'B2',
            'C1',
            'C2',
          ]),
          educationLevel: faker.helpers.arrayElement([
            'SMP',
            'SMA',
            'SMK',
            'MA',
          ]),
          entryYear: faker.number.int({ min: 2020, max: 2024 }),
          status: faker.datatype.boolean(),
          photo: faker.image.avatar(),
          createdAt: faker.date.past(),
          updatedAt: faker.date.recent(),
        },
      });
    }

    console.log('Students seeded successfully');
  } catch (error) {
    console.error('Error seeding students:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();

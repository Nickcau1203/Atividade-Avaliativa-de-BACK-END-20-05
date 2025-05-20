import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  console.log("Iniciando o seed...");

  // Código opcional para limpar o banco de dados antes de inserir novos dados
  await prisma.card.deleteMany({});
  await prisma.collection.deleteMany({});

  // Criar coleções de diferentes temáticas
  const nbaLegends = await prisma.collection.create({
    data: {
      name: "NBA Legends",
      description: "Jogadores lendários da história do basquete da NBA",
      releaseYear: 2023,
    },
  });

  const rockBands = await prisma.collection.create({
    data: {
      name: "Classic Rock",
      description: "Bandas clássicas do rock mundial",
      releaseYear: 2022,
    },
  });

  const worldMonuments = await prisma.collection.create({
    data: {
      name: "World Monuments",
      description: "Monumentos históricos famosos ao redor do mundo",
      releaseYear: 2021,
    },
  });

  const dinosaurs = await prisma.collection.create({
    data: {
      name: "Prehistoric Giants",
      description: "Dinossauros que habitaram a Terra há milhões de anos",
      releaseYear: 2023,
    },
  });

  const videogameConsoles = await prisma.collection.create({
    data: {
      name: "Gaming History",
      description: "Consoles de videogame que marcaram gerações",
      releaseYear: 2022,
    },
  });

  console.log("Coleções criadas. Inserindo cards...");

  // Cards para NBA Legends
  const nbaCards = await Promise.all([
    prisma.card.create({
      data: {
        name: "Michael Jordan",
        rarity: "Ultra Rare",
        attackPoints: 9800,
        defensePoints: 9200,
        imageUrl: "https://example.com/jordan.jpg",
        collectionId: nbaLegends.id,
      },
    }),
    prisma.card.create({
      data: {
        name: "LeBron James",
        rarity: "Ultra Rare",
        attackPoints: 9700,
        defensePoints: 9500,
        imageUrl: "https://example.com/lebron.jpg",
        collectionId: nbaLegends.id,
      },
    }),
    prisma.card.create({
      data: {
        name: "Kobe Bryant",
        rarity: "Ultra Rare",
        attackPoints: 9600,
        defensePoints: 9300,
        imageUrl: "https://example.com/kobe.jpg",
        collectionId: nbaLegends.id,
      },
    }),
    prisma.card.create({
      data: {
        name: "Magic Johnson",
        rarity: "Super Rare",
        attackPoints: 9400,
        defensePoints: 8700,
        imageUrl: "https://example.com/magic.jpg",
        collectionId: nbaLegends.id,
      },
    }),
    prisma.card.create({
      data: {
        name: "Larry Bird",
        rarity: "Super Rare",
        attackPoints: 9300,
        defensePoints: 8800,
        imageUrl: "https://example.com/bird.jpg",
        collectionId: nbaLegends.id,
      },
    }),
    prisma.card.create({
      data: {
        name: "Shaquille O'Neal",
        rarity: "Super Rare",
        attackPoints: 9500,
        defensePoints: 9400,
        imageUrl: "https://example.com/shaq.jpg",
        collectionId: nbaLegends.id,
      },
    }),
    prisma.card.create({
      data: {
        name: "Stephen Curry",
        rarity: "Rare",
        attackPoints: 9200,
        defensePoints: 8500,
        imageUrl: "https://example.com/curry.jpg",
        collectionId: nbaLegends.id,
      },
    }),
    prisma.card.create({
      data: {
        name: "Kevin Durant",
        rarity: "Rare",
        attackPoints: 9300,
        defensePoints: 8600,
        imageUrl: "https://example.com/durant.jpg",
        collectionId: nbaLegends.id,
      },
    }),
  ]);

  console.log(
    `Seed concluído! Criadas ${await prisma.collection.count()} coleções e ${await prisma.card.count()} cards.`
  );
}

/* main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); */

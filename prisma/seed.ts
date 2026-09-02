import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const tcgs = [
  {
    name: "Pokemon",
    slug: "pokemon",
    description: "Pokemon Trading Card Game",
    categories: ["illustrator", "set", "rarity", "era"],
  },
  {
    name: "Yu-Gi-Oh!",
    slug: "yu-gi-oh",
    description: "Yu-Gi-Oh! Trading Card Game",
    categories: ["illustrator", "set", "rarity", "archetype"],
  },
  {
    name: "Magic: The Gathering",
    slug: "magic-the-gathering",
    description: "Magic: The Gathering",
    categories: ["illustrator", "set", "rarity", "color"],
  },
  {
    name: "One Piece",
    slug: "one-piece",
    description: "One Piece Card Game",
    categories: ["illustrator", "set", "rarity", "crew"],
  },
];

async function main() {
  for (const tcg of tcgs) {
    const tcgRow = await prisma.tcg.upsert({
      where: { slug: tcg.slug },
      update: {
        name: tcg.name,
        description: tcg.description,
      },
      create: {
        name: tcg.name,
        slug: tcg.slug,
        description: tcg.description,
      },
    });

    for (const category of tcg.categories) {
      await prisma.category.upsert({
        where: {
          tcgId_slug: {
            tcgId: tcgRow.id,
            slug: category,
          },
        },
        update: {
          name: category,
          isSystem: true,
        },
        create: {
          tcgId: tcgRow.id,
          name: category,
          slug: category,
          isSystem: true,
        },
      });
    }
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });

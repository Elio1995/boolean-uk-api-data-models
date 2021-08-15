const { PrismaClient } = require("@prisma/client");

const dbClient = new PrismaClient();

const designers = [
  {
    firstName: "Elio",
    lastName: "Mehmeti",
  },
  {
    firstName: "Anas",
    lastName: "Ansari",
  },
  {
    firstName: "Sergio",
    lastName: "Neves",
  },
];

const models = [{ name: "Elio" }, { name: "Anas" }, { name: "Sergio" }];

const events = [
  {
    name: "Spring",
    venue: "London",
    date: "21 August 2021",
  },
  {
    name: "Winter",
    venue: "Liverpool",
    date: "22 September 2021",
  },
  {
    name: "Autumn",
    venue: "Manchester",
    date: "21 July 2021",
  },
];

const guests = [
  {
    firstName: "Elio",
    lastName: "Mehmeti",
    puchases: "Jeans",
    totalSpent: 130,
  },
  {
    firstName: "Anas",
    lastName: "Ansari",
    puchases: "T-Shirt",
    totalSpent: 230,
  },
  {
    firstName: "Sergio",
    lastName: "Neves",
    puchases: "T-Shirt and Jeans",
    totalSpent: 360,
  },
];

const outfits = [
  {
    price: 130,
    season: "Spring",
    Type: "Jeans",
  },
  {
    price: 230,
    season: "Winter",
    Type: "T-Shirt",
  },
  {
    price: 430,
    season: "Autumn",
    Type: "Coat",
  },
];

const getRandomElement = (array) => {
  const number = Math.floor(Math.random() * array.length);
  return array[number];
};

const seed = async () => {
  const designersArray = designers.map(async (designer) => {
    return await dbClient.designer.create({
      data: designer,
    });
  });
  const allDesigners = await Promise.all(designersArray);

  const modelsArray = models.map(async (model) => {
    return await dbClient.model.create({
      data: model,
    });
  });
  const allModels = await Promise.all(modelsArray);

  const guestsArray = guests.map(async (guest) => {
    return await dbClient.guest.create({
      data: guest,
    });
  });
  const allGuests = await Promise.all(guestsArray);

  const designerIds = allDesigners.map(({ id }) => id);
  const guestIds = allGuests.map(({ id }) => id);

  const eventsArray = events.map(async (event) => {
    return await dbClient.event.create({
      data: {
        ...event,
        date: new Date(event.date).toISOString(),
        designer: { connect: { id: parseInt(getRandomElement(designerIds)) } },
        guest: { connect: { id: parseInt(getRandomElement(guestIds)) } },
      },
    });
  });
  const allEvents = await Promise.all(eventsArray);

  const modelIds = allModels.map(({ id }) => id);
  const eventIds = allEvents.map(({ id }) => id);

  const outfitsArray = outfits.map(async (outfit) => {
    return await dbClient.outfit.create({
      data: {
        ...outfit,
        designer: { connect: { id: parseInt(getRandomElement(designerIds)) } },
        model: { connect: { id: parseInt(getRandomElement(modelIds)) } },
        event: { connect: { id: parseInt(getRandomElement(eventIds)) } },
        guest: { connect: { id: parseInt(getRandomElement(guestIds)) } },
      },
    });
  });

  const allOutfits = await Promise.all(outfitsArray);

  console.log("All Designers", allDesigners);
  console.log("All Models", allModels);
  console.log("All Models", allGuests);
  console.log("All Events", allEvents);
  console.log("All Outfits", allOutfits);
};

seed()
  .catch((e) => console.error(e))
  .finally(async () => await dbClient.$disconnect());

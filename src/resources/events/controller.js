const { event } = require("../../../utils/dbClient");

const getAllEvents = async (req, res) => {
  try {
    const allEvents = await event.findMany();
    res.json({ data: allEvents });
  } catch (error) {
    res.json({ error: error.message });
  }
};

const getEventById = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const oneEventById = await event.findUnique({
      where: {
        id: parseInt(id),
      },
    });
    res.json({ data: oneEventById });
  } catch (error) {
    res.json({ error: error.message });
  }
};

const createOneEvent = async (req, res) => {
  const newEvent = req.body;
  try {
    const brandNewEvent = await event.create({ data: newEvent });
    res.json({ data: brandNewEvent });
  } catch (error) {
    res.json({ error });
  }
};

const deleteEventById = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const deletedEvent = await event.delete({ where: { id } });
    res.json({ data: deletedEvent });
  } catch (error) {
    res.json({ error: error.message });
  }
};

const updatedEvent = async (req, res) => {
  const id = parseInt(req.params.id);
  const updatedInfo = req.body;

  try {
    const eventExist = await event.findUnique({ where: { id } });

    if (eventExist) {
      const eventUpdate = await event.update({
        where: { id },
        data: { ...eventExist, ...updatedInfo },
      });
      res.json({ data: eventUpdate });
    }
  } catch (error) {
    res.json({ error: error.message });
  }
};

module.exports = {
  getAllEvents,
  getEventById,
  createOneEvent,
  deleteEventById,
  updatedEvent,
};

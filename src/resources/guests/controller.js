const { guest } = require("../../../utils/dbClient");

const getAllGuests = async (req, res) => {
  try {
    const allGuests = await guest.findMany();
    res.json({ data: allGuests });
  } catch (error) {
    res.json({ msg: error.message });
  }
};

const getGuestById = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const oneGuestById = await guest.findUnique({
      where: {
        id,
      },
    });
    res.json({ data: oneGuestById });
  } catch (error) {
    res.json({ msg: error.message });
  }
};

const createNewGuest = async (req, res) => {
  const newGuest = req.body;
  try {
    const brandNewGuest = await guest.create({ data: newGuest });
    res.json({ data: brandNewGuest });
  } catch (error) {
    res.json({ msg: error.message });
  }
};

const deleteGuestById = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const deleteGuest = await guest.delete({
      where: {
        id,
      },
    });
    res.json({ data: deleteGuest });
  } catch (error) {
    res.json({ msg: error.message });
  }
};

const updatedGuest = async (req, res) => {
  const id = parseInt(req.params.id);
  const updatedInfo = req.body;

  try {
    const guestExist = await guest.findUnique({ where: { id } });

    if (guestExist) {
      const guestUpdate = await guest.update({
        where: { id },
        data: { ...guestExist, ...updatedInfo },
      });
      res.json({ data: guestUpdate });
    }
  } catch (error) {
    res.json({ error: error.message });
  }
};

module.exports = {
  getAllGuests,
  getGuestById,
  createNewGuest,
  deleteGuestById,
  updatedGuest,
};

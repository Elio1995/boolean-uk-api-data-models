const router = require("express").Router();

const {
  getAllGuests,
  getGuestById,
  createNewGuest,
  deleteGuestById,
  updatedGuest,
} = require("./controller");

router.get("/", getAllGuests);
router.get("/:id", getGuestById);
router.post("/", createNewGuest);
router.delete("/:id", deleteGuestById);
router.patch("/:id", updatedGuest);

module.exports = router;

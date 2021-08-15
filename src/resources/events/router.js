const router = require("express").Router();

const {
  getAllEvents,
  getEventById,
  createOneEvent,
  deleteEventById,
  updatedEvent,
} = require("./controller");

router.get("/", getAllEvents);
router.get("/:id", getEventById);
router.post("/", createOneEvent);
router.delete("/:id", deleteEventById);
router.patch("/:id", updatedEvent);

module.exports = router;

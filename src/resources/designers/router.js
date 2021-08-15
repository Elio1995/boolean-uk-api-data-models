const router = require("express").Router();

const {
  getAllDesigners,
  getDesignerById,
  createOneDesigner,
  deleteDesignerById,
  updatedDesigner,
} = require("./controller");

router.get("/", getAllDesigners);
router.get("/:id", getDesignerById);
router.post("/", createOneDesigner);
router.delete("/:id", deleteDesignerById);
router.patch("/:id", updatedDesigner);

module.exports = router;

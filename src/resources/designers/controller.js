const { designer } = require("../../../utils/dbClient");

const getAllDesigners = async (req, res) => {
  try {
    const allDesigners = await designer.findMany();
    res.json({ data: allDesigners });
  } catch (error) {
    res.json({ error: error.message });
  }
};

const getDesignerById = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const oneDesignerById = await designer.findUnique({
      where: {
        id: parseInt(id),
      },
    });
    res.json({ data: oneDesignerById });
  } catch (error) {
    res.json({ error: error.message });
  }
};

const createOneDesigner = async (req, res) => {
  const newDesigner = req.body;
  try {
    const brandNewDesigner = await designer.create({ data: newDesigner });
    res.json({ data: brandNewDesigner });
  } catch (error) {
    res.json({ error });
  }
};

const deleteDesignerById = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const deletedDesigner = await designer.delete({ where: { id } });
    res.json({ data: deletedDesigner });
  } catch (error) {
    res.json({ error: error.message });
  }
};

const updatedDesigner = async (req, res) => {
  const id = parseInt(req.params.id);
  const updatedInfo = req.body;

  try {
    const designerExist = await designer.findUnique({ where: { id } });

    if (designerExist) {
      const designerUpdate = await designer.update({
        where: { id },
        data: { ...designerExist, ...updatedInfo },
      });
      res.json({ data: designerUpdate });
    }
  } catch (error) {
    res.json({ error: error.message });
  }
};

module.exports = {
  getAllDesigners,
  getDesignerById,
  createOneDesigner,
  deleteDesignerById,
  updatedDesigner,
};

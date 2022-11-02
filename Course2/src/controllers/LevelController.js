const database = require('../models')

class LevelController {
  static async findAll(_req, res) {
    try {
      const allLevels = await database.level.findAll()
      res.status(200).json(allLevels);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }

  static async findById(req, res) {
    try {
      const { id } = req.params;
      const levelById = await database.level.findByPk(id)
      res.status(200).json(levelById);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }

  static async createLevel(req, res) {
    try {
      const { desc_level } = req.body;
      const createdLevel = await database.level.create({ desc_level });
      res.status(201).json(createdLevel);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }

  static async deleteLevel(req, res) {
    try {
      const { id } = req.params;
      await database.level.destroy({ where: { id } });
      res.status(200).json({ message: "level successfully deleted" })
    } catch (error) {
      res.status(500).json(error.message);
    }
  }

}

module.exports = LevelController;
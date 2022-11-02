const database = require('../models')

class ClassController {
  static async findAll(_req, res) {
    try {
      const allClass = await database.class.findAll()
      res.status(200).json(allClass);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }

  static async findById(_req, res) {
    try {
      const { id } = req.params;
      const classById = await database.class.findByPk(id)
      res.status(200).json(classById);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }

  static async deleteClass(req, res) {
    try {
      const { id } = req.params;
      await database.class.destroy({ where: { id } });
      res.status(200).json({ message: "class successfully deleted" })
    } catch (error) {
      res.status(500).json(error.message);
    }
  }

}

  
module.exports = ClassController;
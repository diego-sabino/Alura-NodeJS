const database = require('../models');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

class ClassController {
  static async findAll(req, res) {
    const where = {}
    const { start_date, final_date } = req.query;
    start_date || final_date ? where.start_date = {} : null;
    start_date ? where.start_date[Op.gte] = start_date : null;
    final_date ? where.start_date[Op.lte] = final_date : null;
    try {
      const allClass = await database.class.findAll({ where })
      res.status(200).json(allClass);
    } catch (error) {
      console.log(error);
      res.status(500).json(error.message);
    }
  }

  static async findById(req, res) {
    try {
      const { id } = req.params;
      const classById = await database.class.findByPk(id)
      res.status(200).json(classById);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }

  static async restoreClass(req, res) {
    try {
      const { id } = req.params;
      await database.class.restore({ where: { id } });
      res.status(200).json({ message: "class successfully restored" })
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
const database = require('../models');

class PersonController {
  static async findAll(_req, res) {
    try {
      const allPeople = await database.person.findAll()
      res.status(200).json(allPeople);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }

  static async findById(req, res) {
    try {
      const { id } = req.params;
      const personById = await database.person.findByPk(id)
      res.status(200).json(personById);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }

  static async findEnrollmentById(req, res) {
    try {
      const { person, id } = req.params;
      const enrollmentBy = await database.enrollment.findOne({
        where: {
          id: id,
          student_id: person
        }
      })
      if (!enrollmentBy) {
        return res.status(404).json({ message: "enrollment not found"});
      }
      res.status(200).json(enrollmentBy);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }


  static async createEnrollment(req, res) {
    try {
      const { id } = req.params;
      const personById = await database.enrollment.findByPk(id)
      const newEnrollment = { ...req.body, student_id: id }
      const createdEnrollment = await database.enrollment.create(newEnrollment);
      if (!personById) {
        return res.status(404).json({ message: "enrollment not found"});
      }
      res.status(201).json(createdEnrollment);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }

  static async createPerson(req, res) {
    try {
      const { name, active, email, role } = req.body;
      const createdPerson = await database.person.create({ name, active, email, role });
      res.status(201).json(createdPerson);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }

  static async updatePerson(req, res) {
    try {
      const { name, active, email, role } = req.body;
      const { id } = req.params;
      const personById = await database.person.findByPk(id)
      await database.Person.update(
        { name, active, email, role },
        { where: { id } });
      if (!personById) {
        return res.status(404).json({ message: "person not found" })
      }
      res.status(200).json({ message: "person successfully updated" })
    } catch (error) {
      res.status(500).json(error.message);
    }
  }


  static async updateEnrollment(req, res) {
    try {
      const { person, id } = req.params;
      const newInfo = req.body;
      const personById = await database.enrollment.findByPk(id);
      await database.enrollment.update(newInfo,
        { where: { id: id , student_id: person  } });
      if (!personById) {
        return res.status(404).json({ message: "enrollment not found" })
      }
      res.status(200).json({ message: "enrollment successfully updated" })
    } catch (error) {
      res.status(500).json(error.message);
    }
  }

  static async deletePerson(req, res) {
    try {
      const { id } = req.params;
      const personById = await database.enrollment.findByPk(id);
      await database.people.destroy({ where: { id } });
      if (!personById) {
        return res.status(404).json({ message: "person not found" })
      }
      res.status(200).json({ message: "person successfully deleted" })
    } catch (error) {
      res.status(500).json(error.message);
    }
  }

  static async deleteEnrollment(req, res) {
    try {
      const { person, id } = req.params;
      await database.enrollment.destroy({ where: { id: id , student_id: person  } });
      const personById = await database.enrollment.findByPk(id);
      if (!personById) {
        return res.status(404).json({ message: "enrollment not found" })
      }
      res.status(200).json({ message: "enrollment successfully deleted" })
    } catch (error) {
      res.status(500).json(error.message);
    }
  }


}

module.exports = PersonController;
const database = require('../models');
const Sequelize = require('sequelize');

class PersonController {
  
  static async findAll(_req, res) {
    try {
      const allPeople = await database.person.scope('all').findAll()
      res.status(200).json(allPeople);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }

  static async findActivePerson(_req, res) {
    try {
      const allActivePerson = await database.person.findAll()
      res.status(200).json(allActivePerson);
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
        return res.status(404).json({ message: "enrolmment not found" })
      }
      res.status(200).json({ message: "enrolmment successfully updated" })
    } catch (error) {
      res.status(500).json(error.message);
    }
  }

  static async deletePerson(req, res) {
    try {
      const { id } = req.params;
      const personById = await database.enrollment.findByPk(id);
      await database.person.destroy({ where: { id } });
      if (!personById) {
        return res.status(404).json({ message: "person not found" })
      }
      res.status(200).json({ message: "person successfully deleted" })
    } catch (error) {
      res.status(500).json(error.message);
    }
  }


  static async restorePerson(req, res) {
    try {
      const { id } = req.params;
      await database.person.restore({ where: { id } });
      res.status(200).json({ message: "person successfully restored" })
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
        return res.status(404).json({ message: "enrolmment not found" })
      }
      res.status(200).json({ message: "enrollment successfully deleted" })
    } catch (error) {
      res.status(500).json(error.message);
    }
  }

  static async findEnrollment(req, res) {
    try {
      const { studentId } = req.params;
      const person = await database.person.findOne({ where: { id: studentId  } });
      const enrollment = await person.getRegisteredClasses()
      res.status(200).json(enrollment)
    } catch (error) {
      res.status(500).json(error.message);
    }
  }

  static async findEnrollmentByClass(req, res) {
    try {
      const { classId } = req.params;
      const allEnrollment = await database.enrollment.findAndCountAll(
        { where: { class_id: classId, status: 'confirmed' },
        limit: 20,
        order: [['student_id', 'ASC']]
      });
      res.status(200).json(allEnrollment)
    } catch (error) {
      res.status(500).json(error.message);
    }
  }

  static async findCrowdedClasses(_req, res) {
    try {
      const maxEnrollments = 2;
      const crowdedClass = await database.enrollment.findAndCountAll({
        where: { status: 'confirmed' },
        attributes: ['class_id'],
        group: ['class_id'],
        having: Sequelize.literal(`count(class_id) >= ${maxEnrollments}`)
      });
      res.status(200).json(crowdedClass);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }

  static async cancelPerson(req, res) {
    try {
      database.sequelize.transaction(async t => {
        const { studentId  } = req.params;
        await database.person.update(
          { active: false },
          { where: { id: studentId }},
          { transaction: t }
        );
        await database.enrollment.update(
          { status: 'canceled' },
          { where: { student_id: studentId }},
          { transaction: t },
        );
        res.status(200).json({ message: 'enrollment successfully canceled'})
      })
    } catch (error) {
      res.status(500).json(error.message);
    }
  }

}

module.exports = PersonController;
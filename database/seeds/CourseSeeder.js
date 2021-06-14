'use strict'

/*
|--------------------------------------------------------------------------
| CourseSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const Course = use('App/Models/Course')
const CourseType = use('App/Models/CourseType')
class CourseSeeder {
  async run () {

    await CourseType.create({
      course_type: "COURSE OFFERED",
      created_by: 1
    })
    await CourseType.create({
      course_type: "SENIOR HIGH TRACKS OFFERED",
      created_by: 1
    })

    await Course.create({
      course: "BS in COMPUTER ENGINEERING",
      description: "",
      course_type_id: 1,
      created_by: 1
    })

    await Course.create({
      course: "BS in INFORMATION TECHNOLOGY",
      description: "",
      course_type_id: 1,
      created_by: 1
    })

    await Course.create({
      course: "BS in BUSINESS ADMINISTRATION",
      description: "",
      course_type_id: 1,
      created_by: 1
    })

    await Course.create({
      course: "ASSOCIATE in COMPUTER TECHNOLOGY (2 Year Course)",
      description: "",
      course_type_id: 1,
      created_by: 1
    })

    await Course.create({
      course: "STEM (Science Technology, Engineering and Mathematics)",
      description: "",
      course_type_id: 2,
      created_by: 1
    })

    await Course.create({
      course: "ABM (Accountancy, Business and Management)",
      description: "",
      course_type_id: 2,
      created_by: 1
    })

    await Course.create({
      course: "GAS (General Academic Standard)",
      description: "",
      course_type_id: 2,
      created_by: 1
    })

    await Course.create({
      course: "HUMMS (Humanities and Social Sciences)",
      description: "",
      course_type_id: 2,
      created_by: 1
    })

  }
}

module.exports = CourseSeeder

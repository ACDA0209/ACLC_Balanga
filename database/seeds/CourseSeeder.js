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
      course_type: "Bachelor's Degree",
      created_by: 1
    })
    await CourseType.create({
      course_type: "2 Year Courses",
      created_by: 1
    })
    await CourseType.create({
      course_type: "Short Courses",
      created_by: 1
    })  

    await Course.create({
      course: "Bachelor's Degree",
      description: "Sample Course",
      course_type_id: 1,
      created_by: 1
    })
    await Course.create({
      course: "2 Year Courses",
      description: "Sample Course",
      course_type_id: 1,
      created_by: 1
    })
    await Course.create({
      course: "Short Courses",
      description: "Sample Course",
      course_type_id: 1,
      created_by: 1
    })  
  }
}

module.exports = CourseSeeder

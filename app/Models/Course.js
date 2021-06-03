'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')
const Database = use('Database')
const Encryption = use('Encryption')

class Course extends Model {
  static get table () {
    return 'courses'
  } 

  static get createdAtColumn () {
      return null
  }

  static get updatedAtColumn () {
      return null
  }    

  courseType() {
    return this.hasOne('App/Models/CourseType', 'course_type_id', 'id')
  }

  static async addCourse (request, auth) {
    const trx = await Database.beginTransaction()
    try {
      const result =
      await this
        .create({
          course: request.body.course,
          description: request.body.description,
          course_type_id: request.body.course_type_id,
          status: 1,
          created_by: auth.user.id
        }, trx)

      await trx.commit()
      return result
    //   return true
    } catch (err) {
        console.log("error in addCourse")
        console.log(err)
      await trx.rollback()
      return false
    }
  }  

  static async updateCourse (request, auth) {
    const trx = await Database.beginTransaction()
    try {
      const result =
      await this
      .query()
        .where('id', '=', request.body.course_id)
        .update({
          course: request.body.course,
          description: request.body.description,
          course_type_id: request.body.course_type_id,
          status:  request.body.status,
          created_by: auth.user.id
        }, trx)

      await trx.commit()
      return result
    //   return true
    } catch (err) {
        console.log("error in updateCourse")
        console.log(err)
      await trx.rollback()
      return false
    }
  }  
}

module.exports = Course

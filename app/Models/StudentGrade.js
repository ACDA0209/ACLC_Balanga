'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')
const Encryption = use('Encryption')
const Database = use('Database')

class StudentGrade extends Model {
  static get table () {
    return 'student_grades'
  } 
  static get computed () {
    return [
      'encryptedId'
    ]
  }
  static get createdAtColumn () {
      return null
  }

  static get updatedAtColumn () {
      return null
  } 

  getEncryptedId ({ id }) {
    return Encryption.encrypt(id)
  }

  /*Setters*/
  /*Setters*/

  static async addGrade (grade) {
    const trx = await Database.beginTransaction()
    try {
      const result =
      await this
        .create({
          student_id: grade.student_id,
          subject: grade.subject,
          grade: grade.grade,
          school_year: grade.school_year,
          created_by: grade.created_by
        }, trx)

      await trx.commit()
      return result
    //   return true
    } catch (err) {
        console.log("error in addGrade")
        console.log(err)
      await trx.rollback()
      return false
    }
  }   
  
  static async updateGrade (request, auth) {
    const trx = await Database.beginTransaction()
    try {
      const result =
      await this
      .query()
        .where('id', '=', request.body.grade_id)
        .update({
          student_id: request.body.student_id,
          subject: request.body.subject,
          grade: request.body.grade,
          school_year:  request.body.school_year
        }, trx)

      await trx.commit()
      return result
    //   return true
    } catch (err) {
        console.log("error in updateGrade")
        console.log(err)
      await trx.rollback()
      return false
    }
  }   
}

module.exports = StudentGrade

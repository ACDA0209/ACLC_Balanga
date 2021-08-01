'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')
const Database = use('Database')
const Encryption = use('Encryption')
const moment = use('moment')

class Semester extends Model {
  static get table () {
    return 'semesters'
  } 

  static get createdAtColumn () {
      return null
  }

  static get updatedAtColumn () {
      return null
  }  

  static get computed () {
    return [
      'semesterYr',
      'semesterName'
    ]
  }

  getSemesterYr ({ semester, from_year, to_year, active_status }) {
    // var str = `${semester} ${from_year} - ${to_year}` (active_status == 1) ? "[Activated]" : ""
    var str =  `${semester} ${from_year} - ${to_year} ${(active_status == 1) ? "[ Activated ]" : ""}`
    return str
  }
  
  getSemesterName ({ semester, from_year, to_year, active_status }) {
    // var str = `${semester} ${from_year} - ${to_year}` (active_status == 1) ? "[Activated]" : ""
    var str =  `${semester} ${from_year} - ${to_year}`
    return str
  }

  
  static async addSemester (request, auth) {
    console.log(request.body)
    const trx = await Database.beginTransaction()
    try {
      const result =
      await this
        .create({
          semester: request.body.semester,
          from_year: request.body.from_year,
          to_year:  request.body.to_year,
          active_status: false,
          created_by: 1
        }, trx)

      await trx.commit()
      return result
    } catch (err) {
        console.log("error in addSemester")
        console.log(err)
      await trx.rollback()
      return false
    }
  }  

  static async activateSemester (request, auth) {
    const trx = await Database.beginTransaction()
    try {
      const result =
      await this
      .query()
        .update({
          active_status: 0
        }, trx)

      const activate =
      await this
      .query()
        .where('id', '=', request.body.semester_id)
        .update({
          active_status: 1,
          created_by: auth.user.id
        }, trx)

      await trx.commit()
      return result
    //   return true
    } catch (err) {
        console.log("error in updateSemester")
        console.log(err)
      await trx.rollback()
      return false
    }
  }  

  static async updateSemester (request, auth) {
    const trx = await Database.beginTransaction()
    try {
      const result =
      await this
      .query()
        .where('id', '=', request.body.semester_id)
        .update({
          semester: request.body.semester,
          from_year: request.body.from_year,
          to_year: 1,
          created_by: auth.user.id
        }, trx)

      await trx.commit()
      return result
    //   return true
    } catch (err) {
        console.log("error in updateSemester")
        console.log(err)
      await trx.rollback()
      return false
    }
  }  
}

module.exports = Semester

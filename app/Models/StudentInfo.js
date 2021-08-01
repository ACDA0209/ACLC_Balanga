'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')
const Encryption = use('Encryption')
const Database = use('Database')

class StudentInfo extends Model {
  static get table () {
    return 'student_infos'
  } 
  static get computed () {
    return [
      'encryptedId',
      'fullName'
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
  getFullName ({firstname, middlename, lastname, suffix}) {
    var fname = firstname.charAt(0).toUpperCase() + firstname.slice(1)
    var mname = middlename.charAt(0).toUpperCase() 
    var lname = lastname.charAt(0).toUpperCase() + lastname.slice(1)
    var suffix = suffix.charAt(0).toUpperCase() + suffix.slice(1)
    return  `${fname} ${mname} ${lname} ${suffix}`
  }

  setFirstname (firstname) {
      return  firstname.charAt(0).toUpperCase() + firstname.slice(1)
  }

  setMiddlename (middlename) {
    if(!middlename)
    return ""
    return  middlename.charAt(0).toUpperCase() + middlename.slice(1)
  }

  setLastname (lastname) {
      return  lastname.charAt(0).toUpperCase() + lastname.slice(1)
  }

  setLastname (suffix) {
      return  suffix.charAt(0).toUpperCase() + suffix.slice(1)
  }
  /*Setters*/  

  static async addStudentInfo (info) {
    const trx = await Database.beginTransaction()
    try {
      const result =
      await this
        .create({
          student_id : info.student_id,
          firstname : info.firstname,
          middlename : info.middlename,
          lastname : info.lastname,
          suffix : info.suffix,
          birthdate : info.birthdate,
          password : info.password,
          created_by : info.created_by
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

  static async updateStudentInfo (request, auth) {
    const trx = await Database.beginTransaction()
    try {
      const result =
      await this
      .query()
        .where('id', '=', request.body.studentInfo_id)
        .update({
          student_id: request.body.subject,
          firstname: request.body.firstname,
          middlename: request.body.middlename,
          lastname: request.body.lastname,
          suffix: request.body.suffix,
          suffix: request.body.suffix,
          status: request.body.status
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

module.exports = StudentInfo

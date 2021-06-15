'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')
const Database = use('Database')
const Encryption = use('Encryption')

const Parent = use('App/Models/Parent')
const Guardian = use('App/Models/Guardian')


class Student extends Model {
    static get table () {
        return 'students'
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
    /*Setters*/


    parents() {
        return this.hasMany('App/Models/Parent', 'id', 'student_id')
      }
    guardian() {
        return this.hasOne('App/Models/Guardian', 'id', 'student_id')
      }

    admissionStatus() {
        return this.hasOne('App/Models/AdmissionStatus', 'admission_status_id', 'id')
      }

    studentFiles() {
      return this.hasMany('App/Models/StudentFile', 'id', 'student_id')
    }
    static async checkReferenceNo (referenceNo) {
      const result = await this
      .query()
      .where('reference_no','=', referenceNo)
      .first()
      
      return result ? true : false

    }

    static async addStudent (request) {
        console.log("enter addStudent")

        const trx = await Database.beginTransaction()
        try {
          const studentInfo =
          await this
            .create({
              last_school: request.body.last_school,
              firstname: request.body.firstname,
              middlename: request.body.middlename,
              lastname: request.body.lastname,
              suffix: request.body.suffix,
              birthdate: request.body.birthdate,
              birth_place: request.body.birth_place,
              marital_status: request.body.marital_status,
              gender: request.body.gender,
              height: request.body.height,
              weight: request.body.weight,
              citizenship: request.body.citizenship,
              address: request.body.address,
              email: request.body.email,
              contact: request.body.contact,
              enrollment_type_id: request.body.enrollment_type_id,
              course_id: request.body.course_id,
              semester_id: 1,
              admission_status_id: 1
            }, trx)
            const motherInfo =
                await Parent
                .create({
                    fullname    : request.body.m_fullname,
                    occupation  : request.body.m_occupation,
                    birthdate   : request.body.m_birthdate,
                    type        : "mother",
                    student_id  : studentInfo.id
                }, trx)
            const fatherInfo =
                await Parent
                .create({
                    fullname        : request.body.f_fullname,
                    occupation      : request.body.f_occupation,
                    birthdate       : request.body.f_birthdate,
                    type          : "father",
                    student_id    : studentInfo.id
                }, trx)
            const guardianInfo =
                await Guardian
                .create({
                    fullname        : request.body.g_fullname,
                    address         : request.body.g_address,
                    contact         : request.body.g_contact,
                    student_id    : studentInfo.id
                }, trx)
            console.log("student id: " + studentInfo.id)
            console.log("mother id: " + motherInfo.id)
            console.log("father id: " + fatherInfo.id)
            console.log("guardianInfo id: " + guardianInfo.id)
          await trx.commit()
          return studentInfo
        //   return true
        } catch (err) {
            console.log("error in addStudent")
            console.log(err)
          await trx.rollback()
          return false
        }
      }

      static async updateStudent (request, admin_id) {
        console.log("enter updateStudent")

        const trx = await Database.beginTransaction()
        try {
          const studentInfo =
          await this
          .query()
            .where('id', '=', request.body.student_id)
            .update({
              last_school: request.body.last_school,
              firstname: request.body.firstname,
              middlename: request.body.middlename,
              lastname: request.body.lastname,
              suffix: request.body.suffix,
              birthdate: request.body.birthdate,
              birth_place: request.body.birth_place,
              marital_status: request.body.marital_status,
              gender: request.body.gender,
              height: request.body.height,
              weight: request.body.weight,
              citizenship: request.body.citizenship,
              address: request.body.address,
              email: request.body.email,
              contact: request.body.contact,
              enrollment_type_id: request.body.enrollment_type_id,
              course_id: request.body.course_id,
              semester_id: 1,
              admission_status_id: request.body.admission_status_id,
              reference_no: request.body.reference_no,
              note: request.body.note,
              updated_by: admin_id
            }, trx)
          const motherInfo =
          await Parent 
          .query()
            .where('student_id', '=', studentInfo)
            .where('type', '=', "mother")
            .update({
                fullname    : request.body.m_fullname,
                occupation  : request.body.m_occupation,
                birthdate   : request.body.m_birthdate,
                student_id  : studentInfo,
                updated_by  : admin_id
            }, trx)
          const fatherInfo =
          await Parent
          .query()
            .where('student_id', '=', studentInfo)
            .where('type', '=', "father")
            .update({
                fullname    : request.body.f_fullname,
                occupation  : request.body.f_occupation,
                birthdate   : request.body.f_birthdate,
                student_id  : studentInfo,
                updated_by  : admin_id
            }, trx)
          const guardianInfo =
          await Guardian
          .query()
            .where('student_id', '=', studentInfo)
            .update({
                fullname    : request.body.g_fullname,
                address     : request.body.g_address,
                contact     : request.body.g_contact,
                student_id  : studentInfo,
                updated_by  : admin_id
            }, trx)
        console.log("student id: " + studentInfo)
        console.log("mother id: " + motherInfo)
        console.log("father id: " + fatherInfo)
          await trx.commit()
          return studentInfo
        //   return true
        } catch (err) {
            console.log("error in updateStudent")
            console.log(err)
          await trx.rollback()
          return false
        }
      }


      static async rejectApplication (request, admin_id) {

        const trx = await Database.beginTransaction()
        try {
          const studentInfo =
          await this
          .query()
            .where('id', '=', request.body.student_id)
            .update({
              admission_status_id: request.body.admission_status_id,
              note: request.body.note,
              updated_by: admin_id
            }, trx)
       
          await trx.commit()
          return studentInfo
        //   return true
        } catch (err) {
            console.log("error in rejectApplication")
            console.log(err)
          await trx.rollback()
          return false
        }
      }

      static async checkStudentEmail (request) {
        var check = await Student.query()
        .where('id', '!=', request.body.student_id)
        .where('email', '=', request.body.email)
        .first()
        if(check) return true
        return false
      }

      static async getApprovalCount () {
        return {
          pending: await this.query().where('admission_status_id', 1).getCount(),
          approved: await this.query().where('admission_status_id', 2).getCount(),
          rejected: await this.query().where('admission_status_id', 3).getCount(),
        }
      }
}

module.exports = Student

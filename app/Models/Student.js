'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')
const Database = use('Database')
const Encryption = use('Encryption')

const Parent = use('App/Models/Parent')


class Student extends Model {
    static get table () {
        return 'students'
    } 

    static get createdAtColumn () {
        return null
    }
    
    static get updatedAtColumn () {
        return null
    } 

    /*Setters*/
    setFirstname (firstname) {
        return  firstname.charAt(0).toUpperCase() + firstname.slice(1)
    }

    setMiddlename (middlename) {
        return  middlename.charAt(0).toUpperCase() + middlename.slice(1)
    }

    setLastname (lastname) {
        return  lastname.charAt(0).toUpperCase() + lastname.slice(1)
    }
    /*Setters*/


    parents() {
        return this.hasMany('App/Models/Parent', 'id', 'student_id')
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
          const newStudent =
          await this
            .create({
              firstname: request.body.firstname,
              middlename: request.body.middlename,
              lastname: request.body.lastname,
              gender: request.body.gender,
              address: request.body.address,
              birthdate: request.body.birthdate,
              email: request.body.email,
              contact: request.body.contact,
              admission_status_id: 1
            }, trx)
            const motherInfo =
                await Parent
                .create({
                    firstname: request.body.m_firstname,
                    middlename: request.body.m_middlename,
                    lastname: request.body.m_lastname,
                    occupation: request.body.m_occupation,
                    contact: request.body.m_contact,
                    type: "mother",
                    student_id: newStudent.id
                }, trx)
            const fatherInfo =
                await Parent
                .create({
                    firstname: request.body.f_firstname,
                    middlename: request.body.f_middlename,
                    lastname: request.body.f_lastname,
                    occupation: request.body.f_occupation,
                    contact: request.body.f_contact,
                    type: "father",
                    student_id: newStudent.id
                }, trx)
            console.log("new student id: " + newStudent.id)
            console.log("new mother id: " + motherInfo.id)
            console.log("new father id: " + fatherInfo.id)
          await trx.commit()
          return newStudent
        //   return true
        } catch (err) {
            console.log("error in addStudent")
            console.log(err)
          await trx.rollback()
          return false
        }
      }

}

module.exports = Student

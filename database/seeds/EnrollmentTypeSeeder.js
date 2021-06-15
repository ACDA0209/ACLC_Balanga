'use strict'

/*
|--------------------------------------------------------------------------
| EnrollmentTypeSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const EnrollmentType = use('App/Models/EnrollmentType')

class EnrollmentTypeSeeder {
  async run () {
    await EnrollmentType.create({
      enrollment_type: "College Freshman/Incoming First Year (SHS GRADUATE)",
      created_by: 1
    })

    await EnrollmentType.create({
      enrollment_type: "College Freshman/Incoming First Year (ALS GRADUATE)",
      created_by: 1
    })

    await EnrollmentType.create({
      enrollment_type: "Transferee (transferred from other college school)",
      created_by: 1
    })

    await EnrollmentType.create({
      enrollment_type: "Returnee (student who has returned to ACLC following a break of one year or more)",
      created_by: 1
    })
  }
}

module.exports = EnrollmentTypeSeeder

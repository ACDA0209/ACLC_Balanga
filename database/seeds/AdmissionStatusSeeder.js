'use strict'

/*
|--------------------------------------------------------------------------
| AdmissionStatusSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const AdmissionStatus = use('App/Models/AdmissionStatus')

class AdmissionStatusSeeder {
  async run () {
    await AdmissionStatus.create({
      status_name: "Pending",
      created_by: 1
    })
    await AdmissionStatus.create({
      status_name: "Approved",
      created_by: 1
    })
    await AdmissionStatus.create({
      status_name: "Rejected",
      created_by: 1
    })    
  }
}

module.exports = AdmissionStatusSeeder

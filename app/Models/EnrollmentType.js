'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class EnrollmentType extends Model {
  static get table () {
    return 'enrollment_types'
  } 

  static get createdAtColumn () {
      return null
  }

  static get updatedAtColumn () {
      return null
  }   
}

module.exports = EnrollmentType

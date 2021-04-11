'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class StudentFile extends Model {
    static get table () {
        return 'student_files'
    }
    
    static get createdAtColumn () {
        return null
    }
    
    static get updatedAtColumn () {
        return null
    } 


    /*Setters*/
    setFile_type(file_type) {
        return  file_type.charAt(0).toLowerCase()
    }
    /*Setters*/  

}

module.exports = StudentFile

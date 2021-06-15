'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Guardian extends Model {
    static get table() {
        return 'guardians'
    }

    static get createdAtColumn () {
        return null
    }

    static get updatedAtColumn () {
        return null
    } 

    /*Setters*/
    setFirstname (fullname) {
        return  fullname.charAt(0).toUpperCase() + fullname.slice(1)
    }

}

module.exports = Guardian

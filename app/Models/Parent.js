'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Parent extends Model {
    static get table() {
        return 'parents'
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

    setType (type) {
        return type.toLowerCase()
    }
    /*Setters*/
}

module.exports = Parent

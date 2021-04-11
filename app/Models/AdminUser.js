'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')
const Database = use('Database')
const Encryption = use('Encryption')
const moment = require('moment')

class AdminUser extends Model {
    static get table () {
        return 'admin_users'
    } 

    static get createdAtColumn () {
        return null
    }
    
    static get updatedAtColumn () {
        return null
    }    

    /*Setters*/
    setName (name) {
        return  name.charAt(0).toUpperCase() + name.slice(1)
    }
    /*Setters*/
}

module.exports = AdminUser

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
    getEncryptedId ({ id }) {
      return Encryption.encrypt(id)
    }
    /*Setters*/
    setName (name) {
        return  name.charAt(0).toUpperCase() + name.slice(1)
    }
    /*Setters*/

    
    static async addAdmin (request, auth) {
        console.log("enter addAdmin")

        const trx = await Database.beginTransaction()
        try {
          const result =
          await this
            .create({
              name: request.body.fullname,
              username: request.body.username,
              password: request.body.new_password,
              created_by: auth.user.id
            }, trx)

          await trx.commit()
          return result
        //   return true
        } catch (err) {
            console.log("error in addAdmin")
            console.log(err)
          await trx.rollback()
          return false
        }
      }


}

module.exports = AdminUser

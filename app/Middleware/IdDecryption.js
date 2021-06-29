'use strict'
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const Encryption = use('Encryption')

class IdDecryption {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
   async handle ({ request, params}, next) {
    if (request.body.id) {
      request.body.id = Encryption.decrypt(request.body.id)
    }
    if (request.body.student_id) {
      request.body.student_id = Encryption.decrypt(request.body.student_id)
    }
    if(params.id){
      // const mod_enc_id = params.id.replace("---", "/");
      const mod_enc_id = params.id.split("---").join("/");
      params.id = Encryption.decrypt(mod_enc_id)
    }
    
    await next()
  }
}

module.exports = IdDecryption

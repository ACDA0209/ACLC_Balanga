'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')
const Database = use('Database')

const Encryption = use('Encryption')

const Helpers = use('Helpers')
const Drive = use('Drive')

const moment = use('moment')

class Carousel extends Model {
  static get table () {
    return 'carousels'
  } 

  static get createdAtColumn () {
      return null
  }

  static get updatedAtColumn () {
      return null
  } 

  static getDateTimeString() {
    var new_date = "";
    var nd = new Date();
    new_date += nd.getFullYear();
    new_date += nd.getMonth();
    new_date += nd.getDate();
    new_date += nd.getHours();
    new_date += nd.getMinutes();
    new_date += nd.getSeconds();
    new_date += nd.getMilliseconds();
    return (new_date)
  }

  static async addCarouselItem (request, auth) {
    const trx = await Database.beginTransaction()
    try {
        var last =   await this.query().getCount()

        const result =  new Carousel()
        result.title = request.body.title
        result.description = request.body.description
        result.order = last ? (last + 1) :1
        result.created_by =auth.user.id
        await result.save(trx)

        const cover_photo = request.file('cover_photo', {
          types: ['image'],
        })
        let randomString = Math.random().toString(20).substr(2, 6);
        let temp_screenshot = `${result.id}_${this.getDateTimeString()}_${randomString}.${cover_photo.subtype}`;
        console.log(temp_screenshot);

        await cover_photo.move(Helpers.publicPath('carousels'), {
          name: temp_screenshot,
          overwrite: true
        })
        if (!cover_photo.moved()) {
          await trx.rollback()
          return false
        }

        result.cover_photo = temp_screenshot
        await result.save(trx)

      await trx.commit()
      return result
    //   return true
    } catch (err) {
        console.log("error in addCarouselItem")
        console.log(err)
      await trx.rollback()
      return false
    }
  }  

  static async updateCarousel (request, auth) {
    const trx = await Database.beginTransaction()
    try {
      var last =   await this.query().getCount()
      var myOrder = request.body.order > last ? last :request.body.order
      const result = await Carousel.query().where('id', '=', request.body.carousel_id).first()
            result.title = request.body.title
            result.description = request.body.description
            result.order = myOrder
            result.created_by =auth.user.id
            result.date_created = moment().format('YYYY-MM-DD HH:mm:ss')

            const cover_photo = request.file('cover_photo', {
              types: ['image'],
            })

            if(cover_photo){
              let randomString = Math.random().toString(20).substr(2, 6);
              let temp_screenshot = `${request.body.carousel_id}_${this.getDateTimeString()}_${randomString}.${cover_photo.subtype}`;

              await cover_photo.move(Helpers.publicPath('carousels'), {
                name: temp_screenshot,
                overwrite: true
              })
              if (!cover_photo.moved()) {
                await trx.rollback()
                return false
              }
              await Drive.delete(Helpers.publicPath('carousels/' + result.cover_photo))

              result.cover_photo = temp_screenshot
            }
            
            await result.save(trx)

      await trx.commit()
      return result
    //   return true
    } catch (err) {
        console.log("error in updateCarousel")
        console.log(err)
      await trx.rollback()
      return false
    }
  }  
}

module.exports = Carousel

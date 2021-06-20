'use strict'

/*
|--------------------------------------------------------------------------
| CarouselSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const Carousel = use('App/Models/Carousel')

class CarouselSeeder {
  async run () {

    await Carousel.create({
      title: "Mission",
      cover_photo: "slide-2.jpg",
      description: "The global mission of ACLC College is to providea holistic, quality, computer-based education in all levels and disciplines with the objective of producing professionals and leader responsive to the needs of science and the international community for the honor and glory of God Almighty. ",
      order: 1,
      created_by: 1
    })

    await Carousel.create({
      title: "Vision",
      cover_photo: "slide-3.jpg",
      description: "The vision of the ACLC/ACLC College is to become the leader and dominant provider of quality and excellent information technology – based business education and related services in the global market. ",
      order: 2,
      created_by: 1
    })

  }
}

module.exports = CarouselSeeder

'use strict'
const Semester = use('App/Models/Semester')
const Carousel = use('App/Models/Carousel')

class DashboardController {
  async index({view}) {
 
    return view
      .render('admin.dashboard.index', {
      })
  }
  
  async fetchSemesterList ({ request, view }) {
    const semesters =  await Semester.query()
    .orderBy('date_created', 'desc')
    .fetch()
    return view
      .render('admin.dashboard.semester.form-row', {
        semesters: semesters.toJSON()
      })
  }

  async fetchSemesters ({ request, view }) {
    const semesters =  await Semester.query()
    .orderBy('date_created', 'desc')
    .paginate(request.body.page, 5)
    
    return view
      .render('admin.dashboard.semester.table-semesters', {
        result: semesters.toJSON(),
        function_name: "getSemesters"
      })
  }  

  async addSemester({view, request, response, auth}) {
    const result = await Semester.addSemester(request, auth)

    if(!result) {
      return response.json({
        err: '2',
        icon: 'error',
        title: 'Error',
        text: 'Something went wrong!'
      })
    }

    return response.json({
      err: '0',
      icon: 'success',
      title: '',
      text: 'Successfully Added!'
    })
  }

  async activateSemester({request, response, auth}) {
    const result = await Semester.activateSemester(request, auth)

    if(!result) {
      return response.json({
        err: '2',
        icon: 'error',
        title: 'Error',
        text: 'Something went wrong!'
      })
    }

    return response.json({
      err: '0',
      icon: 'success',
      title: '',
      text: 'Successfully Activated!'
    })
  }


  
  async fetchCarousels ({ request, view }) {
    const carousels = await Carousel.query()
    .orderBy('order', 'asc')
    .paginate(request.body.page, 5)
    
    return view
      .render('admin.dashboard.carousel.table-carousel', {
        result: carousels.toJSON(),
        function_name: "getCarousels"
      })
  }
  
  async addCarouselItem({view, request, response, auth}) {
    const result = await Carousel.addCarouselItem(request, auth)

    if(!result) {
      return response.json({
        err: '2',
        icon: 'error',
        title: 'Error',
        text: 'Something went wrong!'
      })
    }

    return response.json({
      err: '0',
      icon: 'success',
      title: '',
      text: 'Successfully Added!'
    })
  }


  async getCarouselDetails ({ request, view, response }) {
    const carousel = await Carousel
    .query()
    .where('id','=', request.body.carousel_id)
    .first()

    return view
    .render('admin.dashboard.carousel.modal-item-details', {
      carousel: carousel.toJSON()
    })
  }

    
  async updateCarousel({request, response, auth}) {
    var result = await Carousel.updateCarousel(request, auth)

    if(!result) {
      return response.json({
        err: '2',
        icon: 'error',
        title: 'Error',
        text: 'Something went wrong!'
      })
    }

    return response.json({
      err: '0',
      icon: 'success',
      title: '',
      text: 'Successfully updated!'
    })
  }
  async deleteCarouselItem({request, response, auth}) {
    const result = await Carousel.find(request.body.id)
    var my_order = result.order

    await result.delete()

    var items = await Carousel.query().where('order','>',my_order).fetch()
    var _items = items.toJSON()
    for (let val of _items) { 
      console.log(val)
      await Carousel.query()
      .where('id', '=', val.id)
      .update({
        order: val.order > 1 ? (val.order -1): 1
      })
    }

    if(!result) {
      return response.json({
        err: '2',
        icon: 'error',
        title: 'Error',
        text: 'Something went wrong!'
      })
    }

    return response.json({
      err: '0',
      icon: 'success',
      title: '',
      text: 'Successfully updated!'
    })
  }

}

module.exports = DashboardController

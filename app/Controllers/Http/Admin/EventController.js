'use strict'
const Event = use('App/Models/Event')
const perPage = 10

class EventController {
  async index({view}){  
    return view.render('admin.events.index')
  }

  async fetchEvents ({ request, view }) {
    const events = await Event
    .query()
    .paginate(request.body.page, perPage)

    return view
      .render('admin.events.table-events', {
        result: events.toJSON(),
        function_name: "getEvents"
      })
  }

  async addEvent({view, request, response, auth}) {
    const result = await Event.addEvent(request, auth)

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

  async getEventDetails ({ request, view, response }) {
    const event = await Event
    .query()
    .where('id','=', request.body.event_id)
    .first()

    return view
    .render('admin.events.modal-event-details', {
      event: event.toJSON()
    })
  }

  
  async updateEvent({request, response, auth}) {
    var result = await Event.updateEvent(request, auth)

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

module.exports = EventController

'use strict'
const Course = use('App/Models/Course')
const CourseType = use('App/Models/CourseType')
const Event = use('App/Models/Event')
const Carousel = use('App/Models/Carousel')
const moment = require('moment')
const Database = use('Database')
const Nodemailer = use('App/Helpers/Nodemailer')
const eventPerPage = 5
class ContentController {

  async mainIndex({view}){
    const course_types = await CourseType.all()
    const courses = await Course
    .query()
    .with('courseType')
    .paginate(1,6)
    const main_event = await Event.query()
    .where('event_date', '>=', moment().format('YYYY-MM-DD HH:mm:ss'))
    .orderBy('event_date', 'asc')
    .first()
    const other_events = await Database
    .table('events')
    .where('event_date', '>=', moment().format('YYYY-MM-DD HH:mm:ss'))
    .orderBy('event_date', 'asc')
    .offset(1)
    .limit(3)
    const carousels = await Carousel
    .query()
    .orderBy('order', 'asc')
    .fetch()
    return view
    .render('Student.home.index', {
        course_types:course_types.toJSON(),
        courses:courses.toJSON().data,
        main_event: main_event,
        other_events: other_events,
        carousels: carousels.toJSON()
    })
  }

  async courseIndex({view}){
    const courses = await Course
    .query()
    .where('status',true)
    .with('courseType')
    .fetch()
    const course_types = await CourseType.all()
    return view
    .render('student.courses.index', {
         courses:courses.toJSON(),
         course_types: course_types.toJSON()
    })
  }

  async eventIndex({view}){
     const events = await Event.query().where('status',1).orderBy('date_created', 'asc').fetch()
    return view
    .render('student.events.index', {
         events:events.toJSON()
    })
  }  

  async fetchEvents ({ request, view, response }) {
    const events = await Event
    .query()
    .where('status',1)
    .where(function () {
      if(request.body.search){
        this.orWhere('title', 'like', `%${request.body.search}%`)
        this.orWhere('description', 'like', `%${request.body.search}%`)
      }
    })
    .orderBy('date_created', 'desc')
    .paginate(request.body.page, eventPerPage)

    const recent_events = await Event
    .query()
    .where('status',1).orderBy('date_created', 'desc')
    .paginate(1, 10)

      return response.json({

        entries: view.render('student.events.entries', {
          result: events.toJSON(),
          function_name: "getEvents"
        }),
        recent_events: view.render('student.events.sidebar', {
          recent_events: recent_events.toJSON().data,
          function_name: "getEvents"
        }),
      })       
  }



}

module.exports = ContentController

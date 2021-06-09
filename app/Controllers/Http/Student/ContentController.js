'use strict'
const Course = use('App/Models/Course')
const Event = use('App/Models/Event')
const moment = require('moment')
const Database = use('Database')
const Nodemailer = use('App/Helpers/Nodemailer')

class ContentController {

  async mainIndex({view}){
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
    return view
    .render('Student.home.index', {
         courses:courses.toJSON().data,
         main_event: main_event,
         other_events: other_events
    })
  }

  async courseIndex({view}){
    const courses = await Course
    .query()
    .where('status',true)
    .with('courseType')
    .fetch()

    return view
    .render('student.courses.index', {
         courses:courses.toJSON()
    })
  }

  async eventIndex({view}){
    const events = await Event.all()
    return view
    .render('student.events.index', {
         events:events.toJSON()
    })
  }  



}

module.exports = ContentController

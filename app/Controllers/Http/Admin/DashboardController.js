'use strict'
const Student = use('App/Models/Student')

class DashboardController {
  async index({view}) {
      
    return view
      .render('admin.dashboard.index', {
        pending: await Student.query().where('admission_status_id', 1).getCount(),
        approved: await Student.query().where('admission_status_id', 2).getCount(),
        rejected: await Student.query().where('admission_status_id', 3).getCount(),
      })
  }
}

module.exports = DashboardController

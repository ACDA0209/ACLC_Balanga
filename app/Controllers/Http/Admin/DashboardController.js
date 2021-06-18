'use strict'
const Semester = use('App/Models/Semester')

class DashboardController {
  async index({view}) {

    return view
      .render('admin.dashboard.index', {
        // semesters: semesters.toJSON()
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
}

module.exports = DashboardController

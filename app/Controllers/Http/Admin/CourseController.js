'use strict'
const Course = use('App/Models/Course')
const CourseType = use('App/Models/CourseType')
const perPage = 10

class CourseController {
  async index({view}){  
    const course_types = await CourseType.all()
    return view
    .render('admin.courses.index', {
      course_types: course_types.toJSON()
    })

    return view.render('admin.courses.index')
  }

  async fetchCourses ({ request, view }) {
    const courses = await Course
    .query()
    .with('courseType')
    .paginate(request.body.page, perPage)

    return view
      .render('admin.courses.table-courses', {
        result: courses.toJSON(),
        function_name: "getCourses"
      })
  }

  async getCourseDetails ({ request, view, response }) {
    const course = await Course
    .query()
    .with('courseType')
    .where('id','=', request.body.course_id)
    .first()

    const course_types = await CourseType.all()
    // return response.json({
    //   course: course.toJSON()
    // })

    return view
    .render('admin.courses.modal-course-details', {
      course: course.toJSON(),
      course_types: course_types.toJSON()
    })
  }

  async addCourse({view, request, response, auth}) {
    const result = await Course.addCourse(request, auth)

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

  async updateCourse({request, response, auth}) {
    var result = await Course.updateCourse(request, auth)

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

module.exports = CourseController

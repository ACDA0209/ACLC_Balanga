'use strict'

class AddCourse {
  get validateAll () {
    return true
  }

  get sanitizationRules () {
    return{
      course            : 'escape|trim',
      description       : 'escape|trim',
      course_type_id    : 'escape|trim'
    }
  }

  get rules () {
    return{
      description       : 'required',
      course            : 'required|unique: courses,course',
      course_type_id    : 'required'
    }
  }

   get messages () {
     return{
       'course.required'        : 'Course must not be empty!',
       'course.unique'          : 'Course already exists!',
       'description.required'   : 'Description must not be empty!',
      'course_type_id.required' : 'Course Type is Required!'
     }
   }

   async fails (error) {
    return this.ctx.response.send({
			validator: error
		})
  }
}

module.exports = AddCourse

'use strict'

class UpdateCourse {
  get validateAll () {
    return true
  }

  get sanitizationRules () {
    return{
      course            : 'escape|trim',
      // description       : 'escape|trim',
      status       : 'escape|trim',
      course_type_id    : 'escape|trim'
    }
  }

  get rules () {
    return{
      // description       : 'required',
      course            : 'required',
      status            : 'required',
      course_type_id    : 'required'
    }
  }

   get messages () {
     return{
       'course.required'        : 'Course must not be empty!',
      //  'description.required'   : 'Description must not be empty!',
       'status.required'   : 'Status must not be empty!',
      'course_type_id.required' : 'Course Type is Required!'
     }
   }

   async fails (error) {
    return this.ctx.response.send({
			validator: error
		})
  }
}

module.exports = UpdateCourse

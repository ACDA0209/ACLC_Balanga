'use strict'

class UpdateGrade {
  get validateAll () {
    return true
  }

  get sanitizationRules () {
    return{
      student_id               : 'escape|trim',
      subject               : 'escape|trim',
      grade                : 'escape|trim',
      school_year               : 'escape|trim'
    }
  }

  get rules () {
    return{
      student_id               : 'required',
      subject               : 'required',
      grade                : 'required',
      school_year               : 'required'
    }
  }

   get messages () {
     return{
       'student_id.required'   : 'Student ID must not be empty!',
       'subject.required'   : 'Subject must not be empty!',
       'grade.required'    : 'Grade must not be empty!',
       'school_year.required'   : 'School Year must not be empty!'
     }
   }

   async fails (error) {
    return this.ctx.response.send({
			validator: error
		})
  }
}

module.exports = UpdateGrade

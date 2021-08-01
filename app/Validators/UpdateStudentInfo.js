'use strict'

class UpdateStudentInfo {
  get validateAll () {
    return true
  }

  get sanitizationRules () {
    return{
      student_id               : 'escape|trim',
      firstname               : 'escape|trim',
      lastname                : 'escape|trim',
      birthdate               : 'to_date',
      status                  : 'escape|trim',
    }
  }

  get rules () {
    return{
      student_id               : 'required',
      firstname               : 'required',
      lastname                : 'required',
      birthdate               : 'required',
      status                  : 'required',
    }
  }

   get messages () {
     return{
       'student_id.required'   : 'Student ID must not be empty!',
       'firstname.required'   : 'Firstname must not be empty!',
       'lastname.required'    : 'Lastname must not be empty!',
       'birthdate.required'   : 'Birthdate must not be empty!',
       'status.required'      : 'Status must not be empty!',
     }
   }

   async fails (error) {
    return this.ctx.response.send({
			validator: error
		})
  }
}

module.exports = UpdateStudentInfo

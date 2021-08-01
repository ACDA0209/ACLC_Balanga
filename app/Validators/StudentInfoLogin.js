'use strict'

class StudentInfoLogin {
  get validateAll () {
    return true
  }

  get sanitizationRules () {
    return{
      student_id               : 'escape|trim',
      password               : 'escape|trim',
     
    }
  }

  get rules () {
    return{
      student_id               : 'required',
      password               : 'required',
     
    }
  }

   get messages () {
     return{
       'student_id.required'   : 'Student ID is required!',
       'password.required'   : 'Password is required!',
       
     }
   }

   async fails (error) {
    return this.ctx.response.send({
			validator: error
		})
  }
}

module.exports = StudentInfoLogin

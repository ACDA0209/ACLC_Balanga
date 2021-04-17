'use strict'

class AddNewAdmin {
  get validateAll () {
    return true
  }

  get sanitizationRules () {
    return{
      fullname: 'escape|trim',
      username: 'escape|trim',
      new_password: 'escape|trim',
      new_password_confirmation: 'escape|trim'
    }
  }

  get rules () {
    return{
      fullname: 'required',
      username: 'required|unique: admin_users,username',
      new_password: 'required|min:5|confirmed',
      new_password_confirmation: 'required|min:5',
    }
  }

   get messages () {
     return{
      'fullname.required'                     : 'Name must not be empty!',
      'username.required'                     : 'Username must not be empty!',
      'username.unique'                       : 'Username not available!',
      'new_password.required'                 : 'required!',
      'new_password.min'                      : 'Atleast 5 letters',
      'new_password.confirmed'                : 'Password not match!',
      'new_password_confirmation.required'    : 'required!',
      'new_password_confirmation.min'         : 'Atleast 5 letters',
     }
   }

   async fails (error) {
    return this.ctx.response.send({
			validator: error
		})
  }
}

module.exports = AddNewAdmin

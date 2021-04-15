'use strict'
const AdminUser = use('App/Models/AdminUser')

class ProfileController {
  
  async index({view, auth}) {

    const admin = await AdminUser.findBy('id', auth.user.id)
    return view
    .render('admin.profile.index', {
      admin: admin.toJSON()
    })
  }

  async update({request, response, auth}){
    const admin = await AdminUser.findBy('id', auth.user.id)

    if(admin.password != request.body.current_password){
      var validator = [{
        message: "Password Invalid",
        field: "current_password",
      }]
      return {validator:validator}
    }

    const result = await AdminUser
     .query()
     .where('id', '=', auth.user.id)
     .update({ name: request.body.fullname, password: request.body.new_password }) 

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

module.exports = ProfileController

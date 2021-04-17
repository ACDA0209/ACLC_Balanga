'use strict'
const AdminUser = use('App/Models/AdminUser')

class UserController {
  
  async myProfile({view, auth}) {
    const admin = await AdminUser.findBy('id', auth.user.id)
    return view
    .render('admin.user.index', {
      admin: admin.toJSON()
    })
  }

  async addNewAdminIndex({view}) {

    return view
    .render('admin.user.add-user')
  }

  async addNewAdmin({view, request, response, auth}) {
    const newAdmin = await AdminUser.addAdmin(request, auth)

    if(!newAdmin) {
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

  async update({request, response, auth}){
    const admin = await AdminUser.findBy('id', auth.user.id)
    const check_username = await AdminUser
        .query()
        .where('username', request.body.username)
        .first()

    if(check_username && (check_username.id != admin.id)){
      var validator = [{
        message: "Username not available!",
        field: "username",
      }]
      return {validator:validator}
    }

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

module.exports = UserController

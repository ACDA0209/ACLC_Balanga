'use strict'
const AdminUser = use('App/Models/AdminUser')
const perPage = 10

class UserController {

  async index({view}){  
    const admins = await AdminUser.all()
    return view
    .render('admin.admins.index', {
      admins: admins.toJSON()
    })

    return view.render('admin.courses.index')
  }

  async fetchAdmins ({ request, view }) {
    const admins = await AdminUser
    .query()
    .paginate(request.body.page, perPage)

    return view
      .render('admin.admins.table-admins', {
        result: admins.toJSON(),
        function_name: "getAdmins"
      })
  }

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

  async updateAdminStatus({view, request, response, auth}) {
    const result = await AdminUser
    .query()
    .where('id', '=', request.body.id)
    .first()
    var new_status = result.status == 1 ?0:1
    result.status = new_status
    result.created_by = auth.user.id
    await result.save()
    if(result)
    return true

    return false
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

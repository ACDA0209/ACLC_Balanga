'use strict'
const AdminUser = use('App/Models/AdminUser')


class LoginController {
  async index({view, auth, response}) {
    return view.render('admin.login.index')
  }

  async onLogin({ auth, request, response }) {
    const username = request.input('username')
    const password = request.input('password')
    const adminUser = await AdminUser
      .query()
      .where('username', '=', username)
      .where('password', '=', password)
      .first()

    if (!adminUser) {
      return response.json({
        result: false,
        message: 'Credentials does not match'
      })
    }  

    await auth.login(adminUser)
    return response.json({
      result: true,
      message: ''
    })
  }

  async onLogout({ auth, response }) {

    // await AdminUser
    //   .updateUserOnline(auth.user.id, null)

    // await Log
    //   .query()
    //   .insert({
    //       moduleId: 6, 
    //       actionId: 9,
    //       createBy: auth.user.id,
    //   })  

    await auth.logout()
    return response.redirect('/login')
    return 'Success'
}

}

module.exports = LoginController

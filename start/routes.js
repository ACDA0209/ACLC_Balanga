'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.on('/').render('Student.home.index')

Route.get('/admission', 'Student/AdmissionController.index')
Route.post('/admission/submission', 'Student/AdmissionController.submission').validator('AdmissionApplication')   

Route.get('/login', 'Admin/LoginController.index').middleware('isAuthenticated')
Route.post('/onLogin', 'Admin/LoginController.onLogin')
Route.get('/onLogout', 'Admin/LoginController.onLogout')

Route.get('/admin/myProfile', 'Admin/ProfileController.index').middleware('isNotAuthenticated')
Route.post('/admin/myProfile/update', 'Admin/ProfileController.update').validator('UpdateProfile')   

Route.get('/admin', 'Admin/DashboardController.index')
     .middleware('isNotAuthenticated')

Route.get('/admin/approval', 'Admin/ApprovalController.index')
     .middleware('isNotAuthenticated')
Route.post('/admin/approval/fetchStudents', 'Admin/ApprovalController.fetchStudents')
Route.post('/admin/approval/getStudentDetails', 'Admin/ApprovalController.getStudentDetails')
Route.post('/admin/approval/updateStudentStatus', 'Admin/ApprovalController.updateStudentStatus')


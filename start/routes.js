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
const Course = use('App/Models/Course')

Route.get('/', async ({ view }) => {
     const courses = await Course
     .query()
     .with('courseType')
     .paginate(1,6)
     return view
     .render('Student.home.index', {
          courses:courses.toJSON().data
     })
})
Route.on('/about/history').render('Student.about.history') 
Route.on('/about/missionvision').render('Student.about.missionvision') 
Route.on('/about/hymn').render('Student.about.hymn') 
Route.on('/about/personnel').render('Student.about.personnel')  

Route.on('/contact').render('Student.contact.index')  

Route.get('/courses', async ({ view }) => {
     const courses = await Course
     .query()
     .where('status',true)
     .with('courseType')
     .fetch()

     return view
     .render('student.courses.index', {
          courses:courses.toJSON()
     })
})

Route.get('/admission', 'Student/AdmissionController.index')
Route.post('/admission/submission', 'Student/AdmissionController.submission').validator('AdmissionApplication')   
Route.get('/admission/confirmation', 'Student/AdmissionController.confirmation')

Route.get('/login', 'Admin/LoginController.index').middleware('isAuthenticated')
Route.post('/onLogin', 'Admin/LoginController.onLogin')
Route.get('/onLogout', 'Admin/LoginController.onLogout')

Route.get('/admin/user/myProfile', 'Admin/UserController.myProfile').middleware('isNotAuthenticated')
Route.post('/admin/user/update', 'Admin/UserController.update').validator('UpdateProfile')   
Route.get('/admin/user/addNewAdmin', 'Admin/UserController.addNewAdminIndex').middleware('isNotAuthenticated')
Route.post('/admin/user/addNewAdmin', 'Admin/UserController.addNewAdmin').validator('AddNewAdmin')   

Route.get('/admin', 'Admin/DashboardController.index')
     .middleware('isNotAuthenticated')

Route.get('/admin/approval', 'Admin/ApprovalController.index')
     .middleware('isNotAuthenticated')
Route.post('/admin/approval/fetchStudents', 'Admin/ApprovalController.fetchStudents')
Route.post('/admin/approval/getStudentDetails', 'Admin/ApprovalController.getStudentDetails')
Route.post('/admin/approval/updateStudentStatus', 'Admin/ApprovalController.updateStudentStatus')


Route.get('/admin/courses', 'Admin/CourseController.index')
     .middleware('isNotAuthenticated')
Route.post('/admin/courses/fetchCourses', 'Admin/CourseController.fetchCourses')
Route.post('/admin/courses/getCourseDetails', 'Admin/CourseController.getCourseDetails')
Route.post('/admin/courses/addCourse', 'Admin/CourseController.addCourse').validator('AddCourse')   
Route.post('/admin/courses/updateCourse', 'Admin/CourseController.updateCourse').validator('UpdateCourse')   


Route.get('/admin/events', 'Admin/EventController.index')
     .middleware('isNotAuthenticated')
Route.post('/admin/events/fetchEvents', 'Admin/EventController.fetchEvents')
Route.post('/admin/events/getEventDetails', 'Admin/EventController.getEventDetails')
Route.post('/admin/events/addEvent', 'Admin/EventController.addEvent')
Route.post('/admin/events/updateEvent', 'Admin/EventController.updateEvent')

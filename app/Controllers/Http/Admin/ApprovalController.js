'use strict'
const Student = use('App/Models/Student')
const AdmissionStatus = use('App/Models/AdmissionStatus')
const StudentFile = use('App/Models/StudentFile')
const EnrollmentType = use('App/Models/EnrollmentType')
const Course = use('App/Models/Course')
const CourseType = use('App/Models/CourseType')
const Nodemailer = use('App/Helpers/Nodemailer')
const perPage = 10
const Encryption = use('Encryption')
const Drive = use('Drive')
const Helpers = use('Helpers')


class ApprovalController {
  async index({view}){
    return view
      .render('admin.approval.index', {
        approvalCount: await Student.getApprovalCount()
      })
    return view.render('admin.approval.index')
  }

  async fetchStudents ({ request, view, response }) {
    const students = await Student
    .query()
    .with('parents')
    .with('admissionStatus')
    .paginate(request.body.page, perPage)

    return response.json({
      approvalCount: await Student.getApprovalCount(),
      students: view.render('admin.approval.table-students', {
        result: students.toJSON(),
        function_name: "getStudents"
      })
    })    

    return view
      .render('admin.approval.table-students', {
        result: students.toJSON(),
        function_name: "getStudents"
      })
  }

  async getStudentDetails ({ request, view, response }) {
    const student = await Student
    .query()
    .with('parents')
    .with('guardian')
    .with('admissionStatus')
    .with('studentFiles')
    .where('id','=', request.body.student_id)
    .first()
    const enrollment_types = await EnrollmentType.query().where('status', 1).fetch()
    const courses = await Course.query().where('status', 1).fetch()
    const course_types = await CourseType.all()

    return response.json({
      student: student.toJSON(),
      options: view.render('admin.approval.approval-options', {
        enrollment_types: enrollment_types.toJSON(),
        courses: courses.toJSON(),
        course_types: course_types.toJSON(),
      })
    })    

    return response.json({
      student: student.toJSON()
    })

    return view
      .render('admin.approval.modal-student-details', {
        student: student.toJSON()
      })
  }

  async updateStudentStatus ({ request, response, auth }) {
    var data = JSON.parse(request.body.data)
    request.body.student_id =Encryption.decrypt(data[0].student_id)
    request.body.status_id = data[1].status_id
    request.body.note = data[2].note
    request.body.uploaded_files = data[3].uploaded_files
    const studentFiles = request.file('file_attachments', {
      types: ['image']
    })
    if(request.body.status_id == 2 || request.body.status_id == 4){
      if(!request.body.uploaded_files.length && !studentFiles){
        return response.json({
          validator:[{
            message: "required!",
            field: "file_attachments",
            validation: "required!"
          }]
        })
      }
    }
    // return response.json({
    //   validator:[{
    //     message: "required",
    //     field: "file_attachments",
    //     validation: "required"
    //   }]
    // })
    // console.log(request.file('file_attachments'))
    if(request.body.status_id == 3){
      if(!request.body.note)
      return false
      var result = await Student.rejectApplication(request, auth.user.id)
      if(!result) return false
      return true
    }

    var email_not_unique = await Student.checkStudentEmail(request)
    if(email_not_unique){
      return response.json({
        err: '2',
        icon: 'warning',
        title: 'Error',
        text: 'Email not available!'
      })
    }

    var check_student_files = await StudentFile
    .query()
    .where('student_id', request.body.student_id)
    .whereNotIn('id', request.body.uploaded_files).fetch()

    let delete_id = []
    for(let data of check_student_files.toJSON()){
      await Drive.delete(Helpers.publicPath('student_files/' + data.filename))
      delete_id.push(data.id)
    }

    await StudentFile.query().whereIn('id', delete_id).delete()

    request.body.admission_status_id = request.body.status_id

    let reference_no = Math.random().toString(20).substr(2, 10).toUpperCase();  
    let check_reference_no = await Student.checkReferenceNo(reference_no)
    
    if(request.body.status_id == 2 || request.body.status_id == 4){
      while(check_reference_no){
        reference_no = Math.random().toString(20).substr(2, 10).toUpperCase();  
        check_reference_no = await Student.checkReferenceNo(reference_no)
      }
    }

    if(request.body.status_id == 4){
      request.body.admission_status_id = 2
      request.body.reference_no = reference_no
      request.body.note = "update and approved"
      var result = await Student.updateStudent(request, auth.user.id)
    }else{

      const uploadFiles = await StudentFile.uploadStudentFiles(studentFiles, request.body.student_id)
      var result = await Student.findBy('id', request.body.student_id) 
      result.admission_status_id = request.body.admission_status_id
      result.updated_by = auth.user.id
      result.note = request.body.note
      result.reference_no = reference_no
      await result.save()
    }

    if(result){
      const student = await Student.findBy('id', request.body.student_id) 
      // let sendTo = 'macamoonlight05@gmail.com'
      let sendTo = student.email
      let title = 'ACLC Admission Application'
      let message = ` <p>Hi ${student.firstname} ${student.lastname}! Your application has been approved.</p>
                      <p>Your reference number is ${student.reference_no}</p>`
      if(student.admission_status_id == 3)
      message = student.note
      const sendEmail =  await Nodemailer.sendEmail(sendTo, title, message)
    }
    return response.json({
      err: '0',
      icon: 'success',
      title: '',
      text: 'Successfully Approved!'
    })
  }
}

module.exports = ApprovalController

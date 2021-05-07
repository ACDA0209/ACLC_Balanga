'use strict'
const Student = use('App/Models/Student')
const AdmissionStatus = use('App/Models/AdmissionStatus')
const StudentFile = use('App/Models/StudentFile')
const Nodemailer = use('App/Helpers/Nodemailer')
const perPage = 10

class ApprovalController {
  async index({view}){
    // const result = await Student.findBy('id', 1) 
    // result.admission_status_id = 3
    // await result.save()
    // const student = await Student
    // .query()
    // .where('id','=','1')
    // .first()

    return view.render('admin.approval.index')
  }

  async fetchStudents ({ request, view }) {
    const students = await Student
    .query()
    .with('parents')
    .with('admissionStatus')
    .paginate(request.body.page, perPage)

    return view
      .render('admin.approval.table-students', {
        result: students.toJSON(),
        function_name: "getStudents"
      })
  }

  async getStudentDetails ({ request, view }) {
    const student = await Student
    .query()
    .with('parents')
    .with('admissionStatus')
    .with('studentFiles')
    .where('id','=', request.body.student_id)
    .first()

    return view
      .render('admin.approval.modal-student-details', {
        student: student.toJSON()
      })
  }

  async updateStudentStatus ({ request, view, auth }) {
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
    return result
  }
}

module.exports = ApprovalController

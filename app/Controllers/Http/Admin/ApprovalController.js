'use strict'
const Student = use('App/Models/Student')
const AdmissionStatus = use('App/Models/AdmissionStatus')
const StudentFile = use('App/Models/StudentFile')

const perPage = 10


class ApprovalController {
  async index({view}){
    const student = await Student
    .query()
    .where('id','=','1')
    .first()

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
      const result = await Student.updateStudent(request)
      return result
    }

    const result = await Student
      .query()
      .where('id', '=',request.body.student_id)
      .update({ 
        admission_status_id: request.body.admission_status_id, 
        updated_by: auth.user.id,
        reference_no:reference_no })   

    return result
  }
}

module.exports = ApprovalController

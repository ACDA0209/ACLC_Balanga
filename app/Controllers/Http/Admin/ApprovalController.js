'use strict'
const Student = use('App/Models/Student')
const AdmissionStatus = use('App/Models/AdmissionStatus')
const StudentFile = use('App/Models/StudentFile')

const perPage = 100


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
        students: students.toJSON().data
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

  async updateStudentStatus ({ request, view }) {
    let reference_no = Math.random().toString(20).substr(2, 10).toUpperCase();  
    let check_reference_no = await Student.checkReferenceNo(reference_no)
    while(check_reference_no){
      reference_no = Math.random().toString(20).substr(2, 10).toUpperCase();  
      check_reference_no = await Student.checkReferenceNo(reference_no)
    }

    const result = await Student
    .query()
    .where('id', '=',request.body.student_id)
    .update({ admission_status_id: request.body.status_id, updated_by: 1,reference_no:reference_no })           

    return result
  }
}

module.exports = ApprovalController

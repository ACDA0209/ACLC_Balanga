'use strict'
const Student = use('App/Models/Student')
const StudentFile = use('App/Models/StudentFile')
const EnrollmentType = use('App/Models/EnrollmentType')
const Course = use('App/Models/Course')
const Semester = use('App/Models/Semester')
const CourseType = use('App/Models/CourseType')
const Nodemailer = use('App/Helpers/Nodemailer')
const Encryption = use('Encryption')
class AdmissionController {
    async index({view}){
        // return view.render('student.admission.index')
        const enrollment_types = await EnrollmentType.query().where('status', 1).fetch()
        const courses = await Course.query().where('status', 1).fetch()
        const course_types = await CourseType.all()
        const semester = await Semester.query().where('active_status', 1).first()
        return view
        .render('student.admission.index', {
            enrollment_types: enrollment_types.toJSON(),
            courses: courses.toJSON(),
            course_types: course_types.toJSON(),
            semester: semester
        })
    }

    async confirmation({view, params}){
        const student = await Student.findBy('id',params.id)
        return view
        .render('student.admission.confirmation-message', {
          student: student
        })
    }

    async submission({request, response}){
        console.log(request.file('file_attachment'))
        console.log("-------------")
        console.log(request.body)

        const checkEmail = await Student
                                .query()
                                .where('email', request.body.email)
                                .first()
        if(checkEmail){
            return response.json({
                err: '1',
                icon: 'warning',
                title: 'Warning',
                text: 'Email already exists!'
              })
        }
        const newStudent = await Student.addStudent(request)

        if(newStudent){
            
            const studentFiles = request.file('file_attachments', {
                types: ['image']
            })

            const uploadFiles = await StudentFile.uploadStudentFiles(studentFiles, newStudent.id)

            // let sendTo = 'macamoonlight05@gmail.com'
            let sendTo = newStudent.email
            let title = 'ACLC Admission Application'
            let message = `<p>Hi ${newStudent.firstname} ${newStudent.lastname}! 
                            Your application was successfully submitted. </p>
                            <p>Please wait for the confirmation result.</p>`
            const sendEmail =  await Nodemailer.sendEmail(sendTo, title, message)
            const enc_id = Encryption.encrypt(newStudent.id)
            const mod_enc_id = enc_id.replace("/", "---");
            return response.json({
                err: '0',
                icon: 'success',
                title: '',
                text: 'Successfully submitted!',
                encrypted_id: mod_enc_id
              })
        }

        return response.json({
            err: '2',
            icon: 'error',
            title: 'Error',
            text: 'Something went wrong!'
          })

    }
}

module.exports = AdmissionController

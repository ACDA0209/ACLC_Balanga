'use strict'
const Student = use('App/Models/Student')
const StudentFile = use('App/Models/StudentFile')
const Nodemailer = use('App/Helpers/Nodemailer')

class AdmissionController {
    async index({view}){
        return view.render('student.admission.index')
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

            return response.json({
                err: '0',
                icon: 'success',
                title: '',
                text: 'Successfully submitted!'
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

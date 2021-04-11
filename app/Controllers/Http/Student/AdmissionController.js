'use strict'
const Student = use('App/Models/Student')


class AdmissionController {
    async index({view}){
        return view.render('student.admission.index')
    }

    async submission({request, response}){
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

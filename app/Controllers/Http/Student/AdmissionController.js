'use strict'
const Student = use('App/Models/Student')


class AdmissionController {
    async index({view}){
        return view.render('student.admission.index')
    }

    async submission({request}){
        console.log(request.body)
        return request.body
    }
}

module.exports = AdmissionController

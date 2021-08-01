'use strict'
const StudentInfo = use('App/Models/StudentInfo')
const StudentGrade = use('App/Models/StudentGrade')
const perPage = 10
const Helpers = use('Helpers')
const XLSX = use('xlsx')
const fs = use('fs')

class StudentInfoController {
  async index({view}){  
    return view.render('admin.studentInfo.index')
  }

  async studentLogin({view}){  
    // return await StudentGrade.query().where('student_id', '2021-0001')
    // .orderBy('school_year', 'desc').fetch();
    return view.render('student.login.index')
  }

  setValidator(message, field, validation) {
    return {
      validator:[{
        message: message,
        field: field,
        validation: validation
      }]
    }
  }

  async studentGetGrades({view, request, response}){  
    console.log(request.body)
    const student =  await StudentInfo.query()
    .where('student_id', request.body.student_id)
    .where('password', request.body.password)
    .first();
    
    if(!student)
    return response.json(this.setValidator("No record found", "login", "required"));

    const grades =  await StudentGrade.query().where('student_id', request.body.student_id)
    .orderBy('school_year', 'desc').fetch();
    return view
    .render('student.login.my-grade', {
      result: grades.toJSON(),
      student: student.toJSON(),
      function_name: "getStudentInfo"
    })
  }

  async fetchStudentInfo ({ request, view }) {
    const students = await StudentInfo
    .query()
    .paginate(request.body.page, perPage)

    return view
      .render('admin.studentInfo.table-studentInfo', {
        result: students.toJSON(),
        function_name: "getStudentInfo"
      })
  }  

  async uploadStudentInfo({view, request, response, auth}) {
    const file = request.file('student_info', {
      types: ['application'],
      extnames: ['xlsx', 'xls', 'csv']
    })

    if (file != null) {
      await file.move(Helpers.publicPath('student_info'), {
        name: auth.user.id + '_' +file.clientName,
        overwrite: true
      })

      if (!file.moved()) {
        console.log('error upload?')
        return response.json({
          err: '2',
          msg: 'Upload failed'
        })
      }
      try {
        var excel_file_loc = Helpers.publicPath('student_info') +'\\'+ auth.user.id + '_' +file.clientName
        const workbook = XLSX.readFile(excel_file_loc)
        const sheet_name_list = workbook.SheetNames
        const work_sheet = workbook.Sheets[sheet_name_list[0]]

        const range = XLSX.utils.decode_range(work_sheet['!ref']);
        const col_letter = String.fromCharCode(range.e.c + 65)
        const num_rows = range.e.r;
        
        const header_arr = XLSX.utils.sheet_to_json(work_sheet, {header:1, range: `A1:${col_letter}1` })
        
        const per_batch = 2500
        var loops = Math.ceil(num_rows/per_batch)
        console.log(`${auth.user.id} - Number of batch ${loops}`)
        for(let x = 0 ; x < loops; x++) {
          var start = (x * per_batch) + 2
          var end = ((x+1) * per_batch) + 2
          var str_range = `A${start}:${col_letter}${end}` 

          var data = await XLSX.utils.sheet_to_json(work_sheet, 
            {header:header_arr[0], range: str_range, raw: false })

          let i = 0;
          for (let cell of data) {
            i++;
            // console.log(i)
            var student_id = cell.student_id || null
            var check_student = await StudentInfo.query().where('student_id', student_id).first()
            if(check_student){
              check_student.firstname = cell.firstname
              check_student.middlename = cell.middlename
              check_student.lastname = cell.lastname
              check_student.suffix = cell.suffix
              check_student.birthdate = cell.birthdate
              await check_student.save()
            }else{
              var info = {
                student_id : cell.student_id || null,
                firstname : cell.firstname || null,
                middlename : cell.middlename || null,
                lastname : cell.lastname || null,
                suffix : cell.suffix || null,
                birthdate : cell.birthdate || null,
                password : cell.birthdate || null,
                created_by : auth.user.id,
              }
              console.log(info)
              const result = await StudentInfo.addStudentInfo(info)
            }
            // console.log(`${auth.user.id} - Batch ${(x+1)} of ${loops} Complete`)
          }

        fs.unlinkSync(excel_file_loc)

        return response.json({
          err: '0',
          icon: 'success',
          title: '',
          text: 'Successfully Added!'
        })
      }
      } catch (error) {
        console.log(error)
      }
    }
    return response.json({
      err: '2',
      icon: 'error',
      title: 'Error',
      text: 'Something went wrong!'
    })    
  }
  sanitizer(input){
    return input != undefined ? (sanitize({input: input.toString()}, {input: 'strip_tags'}).input.toString()).trim() : undefined
  }
  removeWhiteSpace(input){
      return (input.toString()).replace(/\s/g,'')
  }  

  async getStudentInfoDetails ({ request, view, response }) {
    console.log("getStudentInfoDetails")
    const student = await StudentInfo
    .query()
    .where('id','=', request.body.student_id)
    .first()
  
    return view
    .render('admin.studentInfo.modal-studentInfo-details', {
      student: student
    })
  }
  setValidator(message, field, validation) {
    return {
      validator:[{
        message: message,
        field: field,
        validation: validation
      }]
    }
  }
  async updateStudentInfo({request, response, auth}) {
    var check = await StudentInfo.query()
                .where('id','!=', request.body.studentInfo_id)
                .where('student_id','=', request.body.student_id)
                .first()
    if(check){
      return response.json(this.setValidator("Student ID Already Exists!", "student_id", "required"))
    }
    var result = await StudentInfo.updateStudentInfo(request, auth)

    if(!result) {
      return response.json({
        err: '2',
        icon: 'error',
        title: 'Error',
        text: 'Something went wrong!'
      })
    }

    return response.json({
      err: '0',
      icon: 'success',
      title: '',
      text: 'Successfully updated!'
    })
  }   
}
module.exports = StudentInfoController

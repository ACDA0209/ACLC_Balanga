'use strict'
const StudentGrade = use('App/Models/StudentGrade')
const perPage = 10
const Helpers = use('Helpers')
const XLSX = use('xlsx')
const fs = use('fs')

class GradeController {
  async index({view}){  
    // const course_types = await CourseType.all()
    // return view
    // .render('admin.grades.index', {
    //   course_types: course_types.toJSON()
    // })

    return view.render('admin.grades.index')
  }

  async fetchGrades ({ request, view }) {
    const grades = await StudentGrade
    .query()
    .paginate(request.body.page, perPage)

    return view
      .render('admin.grades.table-grades', {
        result: grades.toJSON(),
        function_name: "getGrades"
      })
  }  

  async uploadGrades({view, request, response, auth}) {
    const file = request.file('student_grades', {
      types: ['application'],
      extnames: ['xlsx', 'xls', 'csv']
    })

    if (file != null) {
      await file.move(Helpers.publicPath('student_grades'), {
        name: auth.user.id + '_' +file.clientName,
        overwrite: true
      })

      if (!file.moved()) {
        console.log('error upload?')
        return response.json({
          err: '2',
          icon: 'error',
          title: 'Error',
          text: 'File Upload Failed!'
        }) 
      }
      try {
        var excel_file_loc = Helpers.publicPath('student_grades') +'\\'+ auth.user.id + '_' +file.clientName
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
            {header:header_arr[0], range: str_range })

          let i = 0;
          for (let cell of data) {
            i++;
            // console.log(i)
            var grade = {
              student_id : cell.student_id || null,
              subject : cell.subject || null,
              grade : cell.grade || null,
              school_year : cell.school_year || null,
              created_by : auth.user.id,
            }
            console.log(grade)
            const result = await StudentGrade.addGrade(grade)
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

  async getGradeDetails ({ request, view, response }) {
    const grade = await StudentGrade
    .query()
    .where('id','=', request.body.grade_id)
    .first()
  
    return view
    .render('admin.grades.modal-grade-details', {
      grade: grade
    })
  }

  async updateGrade({request, response, auth}) {
    var result = await StudentGrade.updateGrade(request, auth)

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

  async deleteGrade({request, response, auth}) {
    const result = await StudentGrade.find(request.body.id)
    await result.delete()

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

module.exports = GradeController

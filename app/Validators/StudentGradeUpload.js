'use strict'

class StudentGradeUpload {
  get rules () {
    return {
      // validation rules
      student_grades: 'required|file|file_ext:xlsx,xls,csv|file_types:application'
    }
  }

  
  get messages () {
    return {
      'student_grades.required': 'No file chosen.',
      // 'file_upload.file': 'Invalid File.',
      'student_grades.file_ext': 'Invalid File.',
      'student_grades.file_types': 'Invalid File.',
    }
  }

  async fails(error) {
		this.ctx.session.withErrors(error).flashAll()
		
		return this.ctx.response.send({
			validator: error
		})
	}
}

module.exports = StudentGradeUpload

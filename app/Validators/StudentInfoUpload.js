'use strict'

class StudentInfoUpload {
  get rules () {
    return {
      // validation rules
      student_info: 'required|file|file_ext:xlsx,xls,csv|file_types:application'
    }
  }

  
  get messages () {
    return {
      'student_info.required': 'No file chosen.',
      // 'file_upload.file': 'Invalid File.',
      'student_info.file_ext': 'Invalid File.',
      'student_info.file_types': 'Invalid File.',
    }
  }

  async fails(error) {
		this.ctx.session.withErrors(error).flashAll()
		
		return this.ctx.response.send({
			validator: error
		})
	}
}

module.exports = StudentInfoUpload

'use strict'

class AdmissionApplication {
  get validateAll () {
    return true
  }

  get sanitizationRules () {
    return {
      enrollment_type_id    : 'escape|trim',
      course_id             : 'escape|trim',
      last_school           : 'escape|trim',
      firstname             : 'escape|trim',
      middlename            : 'escape|trim',
      lastname              : 'escape|trim',
      suffix                : 'escape|trim',
      birthdate             : 'to_date',
      birth_place           : 'escape|trim',
      marital_status        : 'escape|trim',
      gender                : 'escape|trim',
      height                : 'escape|trim|to_int',
      weight                : 'escape|trim|to_int',
      citizenship           : 'escape|trim',
      address               : 'escape|trim',
      email                 : 'normalize_email',
      contact               : 'escape|trim',

      f_fullname            : 'escape|trim',
      f_birthdate           : 'to_date',
      f_occupation          : 'escape|trim',

      m_fullname            : 'escape|trim',
      m_birthdate           : 'to_date',
      m_occupation          : 'escape|trim',

      g_fullname            : 'escape|trim',
      g_address             : 'escape|trim',
      g_contact             : 'escape|trim',

    }
  }

  get rules () {
    return {
      enrollment_type_id    : 'required',
      course_id             : 'required',
      last_school           : 'required',
      firstname             : 'required',
      lastname              : 'required',
      birthdate             : 'required',
      birth_place           : 'required',
      marital_status        : 'required',
      gender                : 'required',
      height                : 'required|number',
      weight                : 'required',
      citizenship           : 'required',
      gender                : 'required',
      address               : 'required',
      // email                 : 'required|email|unique: students,email',
      email                 : 'required|email',
      contact               : 'required',

      f_fullname   : 'required',
      f_birthdate  : 'required',
      f_occupation : 'required',


      m_fullname   : 'required',
      m_birthdate  : 'required',
      m_occupation : 'required',

      g_fullname    : 'required',
      g_address     : 'required',
      g_contact     : 'required',
      
      "file_attachments": 'required',
      "file_attachments.*": 'required|file_ext:jpg,jpeg,png',
    }
  }

  get messages () {
    return {
      'enrollment_type_id.required'   : 'Enrollment Type is required!',
      'course_id.required'            : 'Academic Program is required!',
      'last_school.required'          : 'Last School Attended is required!',
      'firstname.required'            : 'Firstname is required!',
      'lastname.required'             : 'Lastname is required!',
      'birthdate.required'            : 'Date of Birth is required!',
      'birth_place.required'          : 'Birth Place is required!',
      'marital_status.required'       : 'Marital Status is required!',
      'gender.required'               : 'Gender is required!',
      'height.required'               : 'Height is required!',
      'weight.required'               : 'Weight is required!',
      'citizenship.required'          : 'Citizenship is required!',
      'address.required'              : 'Address is required!',
      'email.required'                : 'Email is required!',
      'email.email'                   : 'Email is invalid!',
      // 'email.unique'            : 'Email already exists!',
      'contact.required'              : 'Contact Number is required!',

      'f_fullname.required'           : 'Name of Father is required!',
      'f_birthdate.required'          : 'Father\'s Date of Birth is required!',
      'f_occupation.required'         : 'Father\'s Occupation is required!',

      'm_fullname.required'           : 'Name of Mother is required!',
      'm_birthdate.required'          : 'Mother\'s Date of Birth is required!',
      'm_occupation.required'         : 'Mother\'s Occupation is required!',

      'g_fullname.required'           : 'Name of Guardian is required!',
      'g_address.required'            : 'Guardian\'s Address is required!',
      'g_contact.required'            : 'Guardian\'s Contact is required!',

      'file_attachments.required'     : 'File Requirements must not be empty!',
    }
  }

  async fails (error) {
    return this.ctx.response.send({
			validator: error
		})
  }
}

module.exports = AdmissionApplication

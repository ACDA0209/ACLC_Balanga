'use strict'

class Approval {
  get validateAll () {
    return true
  }

  get sanitizationRules () {
    return {
      semester_id       : 'escape|trim',
      last_school       : 'escape|trim',
      firstname         : 'escape|trim',
      middlename        : 'escape|trim',
      lastname          : 'escape|trim',
      suffix            : 'escape|trim',
      birthdate         : 'to_date',
      birth_place       : 'escape|trim',
      marital_status    : 'escape|trim',
      gender            : 'escape|trim',
      height            : 'escape|trim|to_int',
      weight            : 'escape|trim|to_int',
      citizenship       : 'escape|trim',
      address           : 'escape|trim',
      email             : 'normalize_email',
      contact           : 'escape|trim',

      f_fullname        : 'escape|trim',
      f_birthdate       : 'to_date',
      f_occupation      : 'escape|trim',

      m_fullname        : 'escape|trim',
      m_birthdate       : 'to_date',
      m_occupation      : 'escape|trim',

      g_fullname        : 'escape|trim',
      g_address         : 'escape|trim',
      g_contact         : 'escape|trim',

    }
  }

  get rules () {
    return {
      semester_id           : 'required',
      last_school           : 'required_when:admission_status_id,2,4',
      firstname             : 'required_when:admission_status_id,2,4',
      lastname              : 'required_when:admission_status_id,2,4',
      birthdate             : 'required_when:admission_status_id,2,4',
      birth_place           : 'required_when:admission_status_id,2,4',
      marital_status        : 'required_when:admission_status_id,2,4',
      gender                : 'required_when:admission_status_id,2,4',
      height                : 'required_when:admission_status_id,2,4',
      weight                : 'required_when:admission_status_id,2,4',
      citizenship           : 'required_when:admission_status_id,2,4',
      address               : 'required_when:admission_status_id,2,4',
      email                 : 'required|email',
      contact               : 'required_when:admission_status_id,2,4',

      f_fullname            : 'required_when:admission_status_id,2,4',
      f_birthdate           : 'required_when:admission_status_id,2,4',
      f_occupation          : 'required_when:admission_status_id,2,4',

      m_fullname            : 'required_when:admission_status_id,2,4',
      m_birthdate           : 'required_when:admission_status_id,2,4',
      m_occupation          : 'required_when:admission_status_id,2,4',
      
      g_fullname            : 'required_when:admission_status_id,2,4',
      g_address             : 'required_when:admission_status_id,2,4',
      g_contact             : 'required_when:admission_status_id,2,4',

      // "file_attachments"    : 'required_when:admission_status_id,2,4',
      "file_attachments.*": 'file_ext:jpg,jpeg,png',
    }
  }

  get messages () {
    return {
      'semester_id.required'            : 'Semester Yr is required!!',
      'last_school.required_when'       : 'Last School Attended is required!',
      'firstname.required_when'         : 'Firstname is required!',
      'lastname.required_when'          : 'Lastname is required!',
      'birthdate.required_when'         : 'Date of Birth is required!',
      'birth_place.required_when'       : 'Birth Place is required!',
      'marital_status.required_when'    : 'Marital Status is required!',
      'gender.required_when'            : 'Gender is required!',
      'height.required_when'            : 'Height is required!',
      'weight.required_when'            : 'Weight is required!',
      'citizenship.required_when'       : 'Citizenship is required!',
      'address.required_when'           : 'Address is required!',
      'email.required'                  : 'Email is required!',
      'email.email'                     : 'Email is invalid!',
      'contact.required_when'           : 'Contact Number is required!',

      'f_fullname.required_when'        : 'Name of Father is required!',
      'f_birthdate.required_when'       : 'Father\'s Date of Birth is required!',
      'f_occupation.required_when'      : 'Father\'s Occupation is required!',

      'm_fullname.required_when'        : 'Name of Mother is required!',
      'm_birthdate.required_when'       : 'Mother\'s Date of Birth is required!',
      'm_occupation.required_when'      : 'Mother\'s Occupation is required!',

      'g_fullname.required_when'        : 'Name of Guardian is required!',
      'g_address.required_when'         : 'Guardian\'s Address is required!',
      'g_contact.required_when'         : 'Guardian\'s Contact is required!',

      // 'file_attachments.required_when'    : 'required!',
    }
  }

  async fails (error) {
    return this.ctx.response.send({
			validator: error
		})
  }
}

module.exports = Approval

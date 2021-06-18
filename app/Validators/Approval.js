'use strict'

class Approval {
  get validateAll () {
    return true
  }

  get sanitizationRules () {
    return {
      semester_id     : 'escape|trim',
      last_school     : 'escape|trim',
      firstname         : 'escape|trim',
      middlename        : 'escape|trim',
      lastname          : 'escape|trim',
      suffix            : 'escape|trim',
      birthdate         : 'to_date',
      birth_place       : 'escape|trim',
      marital_status    : 'escape|trim',
      gender            : 'escape|trim',
      height            : 'escape|trim',
      weight            : 'escape|trim',
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
      'semester_id.required'            : 'required!',
      'last_school.required_when'       : 'required!',
      'firstname.required_when'         : 'required!',
      'lastname.required_when'          : 'required!',
      'birthdate.required_when'         : 'required!',
      'birth_place.required_when'       : 'required!',
      'marital_status.required_when'    : 'required!',
      'gender.required_when'            : 'required!',
      'height.required_when'            : 'required!',
      'weight.required_when'            : 'required!',
      'citizenship.required_when'       : 'required!',
      'address.required_when'           : 'required!',
      'email.required'                  : 'required!',
      'email.email'                     : 'Email is invalid!',
      'contact.required_when'           : 'required.',

      'f_fullname.required_when'        : 'required!',
      'f_birthdate.required_when'       : 'required!',
      'f_occupation.required_when'      : 'required!',

      'm_fullname.required_when'        : 'required!',
      'm_birthdate.required_when'       : 'required!',
      'm_occupation.required_when'      : 'required!',

      'g_fullname.required_when'        : 'required!',
      'g_address.required_when'         : 'required!',
      'g_contact.required_when'         : 'required!',

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

'use strict'

class Approval {
  get validateAll () {
    return true
  }

  get sanitizationRules () {
    return {
      firstname       : 'escape|trim',
      middlename      : 'escape|trim',
      lastname        : 'escape|trim',
      gender          : 'escape|trim',
      address         : 'escape|trim',
      birthdate       : 'to_date',
      birth_place     : 'escape|trim',
      email           : 'normalize_email',
      contact         : 'escape|trim',

      f_firstname     : 'escape|trim',
      f_middlename    : 'escape|trim',
      f_lastname      : 'escape|trim',
      f_contact       : 'escape|trim',
      f_occupation    : 'escape|trim',

      m_firstname     : 'escape|trim',
      m_middlename    : 'escape|trim',
      m_lastname      : 'escape|trim',
      m_contact       : 'escape|trim',
      m_occupation    : 'escape|trim',

    }
  }

  get rules () {
    return {
      firstname             : 'required_when:admission_status_id,2,4',
      lastname              : 'required_when:admission_status_id,2,4',
      gender                : 'required_when:admission_status_id,2,4',
      address               : 'required_when:admission_status_id,2,4',
      birthdate             : 'required_when:admission_status_id,2,4',
      birth_place           : 'required_when:admission_status_id,2,4',
      email                 : 'required_when:admission_status_id,2,4|email',
      contact               : 'required_when:admission_status_id,2,4',

      f_firstname           : 'required_when:admission_status_id,2,4',
      f_lastname            : 'required_when:admission_status_id,2,4',
      f_contact             : 'required_when:admission_status_id,2,4',
      f_occupation          : 'required_when:admission_status_id,2,4',


      m_firstname           : 'required_when:admission_status_id,2,4',
      m_lastname            : 'required_when:admission_status_id,2,4',
      m_contact             : 'required_when:admission_status_id,2,4',
      m_occupation          : 'required_when:admission_status_id,2,4',
      
      "file_attachments"    : 'required_when:admission_status_id,2,4',
      "file_attachments.*": 'file_ext:jpg,jpeg,png',
    }
  }

  get messages () {
    return {
      'firstname.required_when'           : 'required!',
      'lastname.required_when'            : 'required!',
      'gender.required_when'              : 'required!',
      'address.required_when'             : 'required!',
      'birthdate.required_when'           : 'required!',
      'birth_place.required_when'         : 'required!',
      'email.required_when'               : 'required!',
      'email.email'                       : 'Email is invalid!',
      'contact.required_when'             : 'required.',

      'f_firstname.required_when'         : 'required!',
      'f_lastname.required_when'          : 'required!',
      'f_contact.required_when'           : 'required!',
      'f_occupation.required_when'        : 'required!',

      'm_firstname.required_when'         : 'required!',
      'm_lastname.required_when'          : 'required!',
      'm_contact.required_when'           : 'required!',
      'm_occupation.required_when'        : 'required!',

      'file_attachments.required_when'    : 'required!',
    }
  }

  async fails (error) {
    return this.ctx.response.send({
			validator: error
		})
  }
}

module.exports = Approval

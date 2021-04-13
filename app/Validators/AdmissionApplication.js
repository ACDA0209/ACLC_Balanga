'use strict'

class AdmissionApplication {
  get validateAll () {
    return true
  }

  get sanitizationRules () {
    return {
      firstname: 'escape|trim',
      middlename: 'escape|trim',
      lastname: 'escape|trim',
      gender: 'escape|trim',
      address: 'escape|trim',
      birthdate: 'to_date',
      birth_place: 'escape|trim',
      email: 'normalize_email',
      contact: 'escape|trim',

      f_firstname: 'escape|trim',
      f_middlename: 'escape|trim',
      f_lastname: 'escape|trim',
      f_contact: 'escape|trim',
      f_occupation: 'escape|trim',

      m_firstname: 'escape|trim',
      m_middlename: 'escape|trim',
      m_lastname: 'escape|trim',
      m_contact: 'escape|trim',
      m_occupation: 'escape|trim',

    }
  }

  get rules () {
    return {
      firstname: 'required',
      lastname: 'required',
      gender: 'required',
      address: 'required',
      birthdate: 'required',
      birth_place: 'required',
      email: 'required|email|unique: students,email',
      contact: 'required',

      f_firstname: 'required',
      f_lastname: 'required',
      f_contact: 'required',
      f_occupation: 'required',


      m_firstname: 'required',
      m_lastname: 'required',
      m_contact: 'required',
      m_occupation: 'required',
      
      file_attachments: 'required',
    }
  }

  get messages () {
    return {
      'firstname.required'    : 'required!',
      'lastname.required'     : 'required!',
      'gender.required'       : 'required!',
      'address.required'      : 'required!',
      'birthdate.required'    : 'required!',
      'birth_place.required'  : 'required!',
      'email.required'        : 'required!',
      'email.email'           : 'Email is invalid!',
      'email.unique'          : 'Email already exists!',
      'contact.required'      : 'required.',

      'f_firstname.required'  : 'required!',
      'f_lastname.required'   : 'required!',
      'f_contact.required'    : 'required!',
      'f_occupation.required' : 'required!',

      'm_firstname.required'  : 'required!',
      'm_lastname.required'   : 'required!',
      'm_contact.required'    : 'required!',
      'm_occupation.required' : 'required!',

      'file_attachments.required' : 'required!',
    }
  }

  async fails (error) {
    return this.ctx.response.send({
			validator: error
		})
  }
}

module.exports = AdmissionApplication

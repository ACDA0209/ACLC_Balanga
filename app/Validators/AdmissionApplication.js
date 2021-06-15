'use strict'

class AdmissionApplication {
  get validateAll () {
    return true
  }

  get sanitizationRules () {
    return {
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
      last_school       : 'required',
      firstname         : 'required',
      lastname          : 'required',
      birthdate         : 'required',
      birth_place       : 'required',
      marital_status    : 'required',
      gender            : 'required',
      height            : 'required',
      weight            : 'required',
      citizenship       : 'required',
      gender            : 'required',
      address           : 'required',
      email             : 'required|email|unique: students,email',
      contact           : 'required',

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
      'last_school.required'    : 'required!',
      'firstname.required'      : 'required!',
      'lastname.required'       : 'required!',
      'birthdate.required'      : 'required!',
      'birth_place.required'    : 'required!',
      'marital_status.required' : 'required!',
      'gender.required'         : 'required!',
      'height.required'         : 'required!',
      'weight.required'         : 'required!',
      'citizenship.required'    : 'required!',
      'address.required'        : 'required!',
      'email.required'          : 'required!',
      'email.email'             : 'Email is invalid!',
      'email.unique'            : 'Email already exists!',
      'contact.required'        : 'required.',

      'f_fullname.required'   : 'required!',
      'f_birthdate.required'  : 'required!',
      'f_occupation.required' : 'required!',

      'm_fullname.required'   : 'required!',
      'm_birthdate.required'  : 'required!',
      'm_occupation.required' : 'required!',

      'g_fullname.required'   : 'required!',
      'g_address.required'    : 'required!',
      'g_contact.required'    : 'required!',

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

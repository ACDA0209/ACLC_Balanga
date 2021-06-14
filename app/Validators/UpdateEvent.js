'use strict'

class UpdateEvent {
  get validateAll () {
    return true
  }

  get sanitizationRules () {
    return{
      title         : 'escape|trim',
      description   : 'escape|trim',
      status   : 'escape|trim',
      // event_date    : 'escape|trim'
    }
  }

  get rules () {
    return{
      title         : 'required',
      description   : 'required',
      cover_photo   : 'file_ext:jpg,jpeg,png',
      status   : 'required',
      // event_date    : 'required|date'
    }
  }

   get messages () {
     return{
       'title.required'         : 'Title must not be empty!',
       'description.required'   : 'Description must not be empty!',
      //  'event_date.required'    : 'Event Date must not be empty!',
       'status.required'   : 'Status must not be empty!',
      //  'event_date.date'        : 'Event Date must be date',
     }
   }

   async fails (error) {
    return this.ctx.response.send({
			validator: error
		})
  }
}

module.exports = UpdateEvent

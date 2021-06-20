'use strict'

class AddCarousel {
  get validateAll () {
    return true
  }

  get sanitizationRules () {
    return{
      title         : 'escape|trim',
      description   : 'escape|trim',
    }
  }

  get rules () {
    return{
      title         : 'required',
      cover_photo   : 'required|file_ext:jpg,jpeg,png',
    }
  }

   get messages () {
     return{
       'title.required'         : 'Title must not be empty!',
       'cover_photo.required'   : 'Cover Photo must not be empty!',
     }
   }

   async fails (error) {
    return this.ctx.response.send({
			validator: error
		})
  }
}

module.exports = AddCarousel

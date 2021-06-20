'use strict'

class UpdateCarousel {
  get validateAll () {
    return true
  }

  get sanitizationRules () {
    return{
      title         : 'escape|trim',
      description   : 'escape|trim',
      order   : 'escape|trim',
    }
  }

  get rules () {
    return{
      title         : 'required',
      order         : 'required',
      cover_photo   : 'file_ext:jpg,jpeg,png',
    }
  }

   get messages () {
     return{
       'title.required'         : 'Title must not be empty!',
       'order.required'         : 'Order is required!',
      //  'cover_photo.required'   : 'Cover Photo must not be empty!',
     }
   }

   async fails (error) {
    return this.ctx.response.send({
			validator: error
		})
  }
}

module.exports = UpdateCarousel

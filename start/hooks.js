const { hooks } = require('@adonisjs/ignitor')

hooks.after.providersBooted(() => {
  const moment = require('moment')
  const View = use('View')
  View.global('moment', moment)
})
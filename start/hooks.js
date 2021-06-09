const { hooks } = require('@adonisjs/ignitor')

hooks.after.providersBooted(() => {
  const moment = require('moment')
  const View = use('View')
  const Env = use('Env')
  View.global('moment', moment)
  View.global('Env', Env)
})
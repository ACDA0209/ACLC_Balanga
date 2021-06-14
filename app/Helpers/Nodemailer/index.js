'use strict'
const nodemailer = require("nodemailer");
const Env = use('Env')

class NodeMailer{
  static sendEmail(sendTo, title, message) {
    console.log("enter sendEmail")
    //step 1
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
          user:Env.get('GMAIL_USERNAME'),
          pass:Env.get('GMAIL_PASSWORD')
      }
    })
    sendTo = 'macamoonlight05@gmail.com'
    //step 2
    let mailOptions = {
      from: Env.get('GMAIL_USERNAME'),
      to: sendTo,
      subject: title,
      html: message
    }

    transporter.sendMail(mailOptions, function(err,data){
      if(err){
        console.log('error occurs!', err)
      } else {
        console.log('Email sent!')
      }
    })

    return Env.get('GMAIL_USERNAME')
  }


}

module.exports = NodeMailer
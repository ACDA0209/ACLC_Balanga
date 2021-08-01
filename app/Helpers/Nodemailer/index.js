'use strict'
const nodemailer = require("nodemailer");
const Env = use('Env')
const moment = use('moment')
const Helpers = use('Helpers')

class NodeMailer{
  static sendEmail(sendTo, title, message, attachments) {
    console.log("enter sendEmail")
    console.log("attachments: " + attachments)
    //step 1
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
          user:Env.get('GMAIL_USERNAME'),
          pass:Env.get('GMAIL_PASSWORD')
      }
    })
    // sendTo = 'macamoonlight05@gmail.com'
    //step 2
    let mailOptions = {
      from: Env.get('GMAIL_USERNAME'),
      to: sendTo,
      subject: title,
      html: message,
      attachments: attachments,
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
  static setAttachment(student_files) {
    var attachments = []
    for(let data of student_files) {
      attachments.push({   
        filename: data.filename,
        path: Helpers.publicPath('student_files/' + data.filename),
        cid: data.filename 
    })
    }
    return attachments
  }
  static setEmail(details) {
    var mother, father;
    if(details.toJSON().parents[0].type == "mother"){
      mother = details.toJSON().parents[0]
      father = details.toJSON().parents[1]
    }else{
      mother = details.toJSON().parents[1]
      father = details.toJSON().parents[0]
    }
    var guardian = details.toJSON().guardian
    var semester = details.toJSON().semester
    var enrollment = details.toJSON().enrollment
    var course = details.toJSON().course
    var html =
    `<br>
    <div style="width:90%;
                margin: auto;
                font-family: open sans;
                box-shadow: 0 0 30px rgba(214, 215, 216, 0.6); 
                padding: 10px;">

      <div style="background-color: #2d3090;
                font-family: -apple-system, BlinkMacSystemFont, 
                              'Segoe UI', Roboto, Oxygen, Ubuntu, 
                              Cantarell, 'Open Sans', 'Helvetica Neue', 
                              sans-serif;
                box-shadow: 0 0 30px rgba(214, 215, 216, 0.6);
                padding: 10px; 
                margin-bottom: 5px;">
        <h1 style="margin:2px; color: #fff;">ACLC COLLEGE OF BALANGA ONLINE APPLICATION</h1>
        <h3 style="margin:2px; color: #fff;">${semester.semesterName || ''}</h3>
      </div>

      <div style="background-color: #fafafa">
        <table style="width:100%; margin-left: 5px;">
          <tr style="text-align: left;">
            <td>
              <span><b> Enrollment Type: </b></span> 
              <span> ${enrollment.enrollment_type || ''} </span>
            </td>
          </tr>
          <tr style="text-align: left;">
            <td>
              <span><b> Academic Program: </b></span> 
              <span> ${course.course || ''} </span>
            </td>
          </tr>
        </table>  
      
        <br>
        
        <h3 style="margin: 2px 5px; color: #2d3090;">Personal Info</h3>
        <table style="width:100%; margin-left: 5px;">
          <tr style="text-align: left;">
            <td>
              <span><b> Firstname: </b></span> 
              <span> ${details.firstname || ''} </span>
            </td>
            <td>
              <span><b> Middlename: </b></span> 
              <span> ${details.middlename || ''} </span>
            </td>
            <td>
              <span><b> Lastname: </b></span> 
              <span> ${details.lastname || ''} </span>
            </td>
            <td>
              <span><b> Suffix: </b></span> 
              <span> ${details.suffix || ''} </span>
            </td>
          </tr>
          <tr style="text-align: left;">
            <td>
              <span><b> Height: </b></span> 
              <span> ${(details.height +'cm') || ''} </span>
            </td>
            <td>
              <span><b> Weight: </b></span> 
              <span> ${(details.weight +'kg') || ''} </span>
            </td>
            <td>
              <span><b> Gender: </b></span> 
              <span> ${details.gender || ''} </span>
            </td>
            <td>
              <span><b> Marital Status: </b></span> 
              <span> ${details.marital_status || ''} </span>
            </td>
          </tr>
          <tr style="text-align: left;">
            <td>
              <span><b> Date of Birth: </b></span> 
              <span> ${moment(details.birthdate).format('MMMM DD, YYYY') || ''} </span>
            </td>
            <td>
              <span><b> Place of Birth: </b></span> 
              <span> ${details.birth_place || ''} </span>
            </td>
          </tr>
          <tr style="text-align: left;">
            <td>
              <span><b> Citizenship: </b></span> 
              <span> ${details.citizenship || ''} </span>
            </td>
            <td>
              <span><b> Complete Address: </b></span> 
              <span> ${details.address || ''} </span>
            </td>
          </tr>
          <tr style="text-align: left;">
            <td>
              <span><b> Last School Attended: </b></span> 
              <span> ${details.last_school || ''} </span>
            </td>
          </tr>
        </table> 
        
        <br>
      
        <h3 style="margin: 2px 5px; color: #2d3090;">Father's Info</h3>
        <table style="width:100%; margin-left: 5px;">
          <tr style="text-align: left;">
            <td>
              <span><b> Name: </b></span> 
              <span> ${father.fullname || ''} </span>
            </td>
          </tr>
          <tr style="text-align: left;">
            <td>
              <span><b> Occupation: </b></span> 
              <span> ${father.occupation || ''} </span>
            </td>
            <td>
              <span><b> Date of Birth: </b></span>  
              <span> ${moment(father.birthdate).format("MMMM DD, yyyy")} </|| ''} </span>
            </td>
          </tr>
        </table> 
      
        <br>
      
        <h3 style="margin: 2px 5px; color: #2d3090;">Mother's Info</h3>
        <table style="width:100%; margin-left: 5px;">
          <tr style="text-align: left;">
            <td>
              <span><b> Name: </b></span> 
              <span> ${mother.fullname || ''} </span>
            </td>
          </tr>
          <tr style="text-align: left;">
            <td>
              <span><b> Occupation: </b></span> 
              <span> ${mother.occupation || ''} </span>
            </td>
            <td>
              <span><b> Date of Birth: </b></span>  
              <span> ${moment(mother.birthdate).format("MMMM DD, yyyy")} </|| ''} </span>
            </td>
          </tr>
        </table> 
      
        <br>
      
        <h3 style="margin: 2px 5px; color: #2d3090;">Name of Guardian (Person to contact in case of emergency): </h3>
        <table style="width:100%; margin-left: 5px;">
          <tr style="text-align: left;">
            <td>
            <span> ${guardian.fullname || ''} </span>
            </td>
          </tr>
          <tr style="text-align: left;">
            <td>
              <span><b> Address: </b></span> 
              <span> ${guardian.address || ''} </span>
            </td>
            <td>
              <span><b> Contact: </b></span>  
              <span> ${guardian.contact || ''} </span>
            </td>
          </tr>
        </table>             
      </div>

    </div>

    `    
    return html
  }


}

module.exports = NodeMailer
const URL = `${APP_URL}/admin/approval`
var currentPage = 1;


$("#page_title").text("Student Approval")
$("#breadcrumb_item").text("Student Approval")

$(() => {
  getStudents(1)

})

function getStudents(page) {
  if (page) {
    showOverlay()
    currentPage = page
    ajaxRequest(`${URL}/fetchStudents`, {
      page: page
    })
      .then(res => {
        currentPage = page
        $('#table_students').html(res.students)
        updateApprovalCount(res.approvalCount);
        hideOverlay()
      })
      .catch(err => {
        console.log(err)
      })
  }
  $('[data-toggle="tooltip"]').tooltip()

}
function updateApprovalCount(approvalCount){
  $("#approval_pending").text(approvalCount.pending)
  $("#approval_approved").text(approvalCount.approved)
  $("#approval_rejected").text(approvalCount.rejected)
}
function getStudentDetails(student_id) {

  hideStatusButtons();

  if (student_id) {
    showOverlay()
    ajaxRequest(`${URL}/getStudentDetails`, {
      student_id: student_id
    })
      .then(res => {
        var form_approval = $("#form_approval");
        mapStudentInfo(form_approval, res);
        if(res.student.parents[0].type == "father"){
          mapFatherInfo(form_approval, res.student.parents[0]);
          mapMotherInfo(form_approval, res.student.parents[1]);
        }else{
          mapFatherInfo(form_approval, res.student.parents[1]);
          mapMotherInfo(form_approval, res.student.parents[0]);
        }
        mapStudentFiles(res);

        showAdmissionStatus(res.student.admission_status_id, res.student.encryptedId, res.student.reference_no);      

        // $('#student_details').html(res)
        $.fn.modal.Constructor.prototype._enforceFocus = function() {};
        $("#student_details").modal("show")
        // $('#table-students').html(res)
        // hideOverlay()

        // $('#student_details').on('hidden.bs.modal', function (e) {
        //   $el4.fileinput('reset');
        // })
      })
      .catch(err => {
        console.log(err)
      })
  }
}

function hideStatusButtons(){
  $("#reference-area").hide();
  $("#btn-reject").attr("onClick", "");
  $("#btn-reject").hide();
  $("#btn-approve").attr("onClick", "");
  $("#btn-approve").hide();
  $("#btn-update-approve").attr("onClick", "");
  $("#btn-update-approve").hide();
}

function showAdmissionStatus(status, student_id, reference_no){
  switch (status) {
    
    case 1:
      $("#btn-reject").attr("onClick", "reasonOfRejection('"+student_id+"', 3)");
      $("#btn-approve").attr("onClick", "updateStudentStatus('"+student_id+"', 2)");
      $("#btn-reject").show();
      $("#btn-approve").show();
      break;
      case 2:
      $("#reference-area").show();
      $("#reference-area").find("span").text(reference_no);
      break;
    case 3:
      $("#btn-update-approve").attr("onClick", "updateStudentStatus('"+student_id+"', 4)");
      $("#btn-update-approve").show();
      break;
    default:
      hideStatusButtons();
      break;
  }

}

function mapStudentInfo(form_approval, res){
  var bdate = new Date(res.student.birthdate).toISOString().split('T')[0];
  form_approval.find("input[name=firstname]").val(res.student.firstname);
  form_approval.find("input[name=middlename]").val(res.student.middlename);
  form_approval.find("input[name=lastname]").val(res.student.lastname);
  form_approval.find("select[name=gender]").val(res.student.gender);
  form_approval.find("input[name=address]").val(res.student.address);
  form_approval.find("input[name=birthdate]").val(bdate);
  form_approval.find("input[name=birth_place]").val(res.student.birth_place);
  form_approval.find("input[name=email]").val(res.student.email);
  form_approval.find("input[name=contact]").val(res.student.contact);
}

function mapFatherInfo(form_approval, father){
  form_approval.find("input[name=f_firstname]").val(father.firstname);
  form_approval.find("input[name=f_middlename]").val(father.middlename);
  form_approval.find("input[name=f_lastname]").val(father.lastname);
  form_approval.find("select[name=f_occupation]").val(father.occupation);
  form_approval.find("input[name=f_contact]").val(father.contact);
}

function mapMotherInfo(form_approval, mother){
  form_approval.find("input[name=m_firstname]").val(mother.firstname);
  form_approval.find("input[name=m_middlename]").val(mother.middlename);
  form_approval.find("input[name=m_lastname]").val(mother.lastname);
  form_approval.find("select[name=m_occupation]").val(mother.occupation);
  form_approval.find("input[name=m_contact]").val(mother.contact);
}

function mapStudentFiles(res){
  var studentFiles = res.student.studentFiles
  var initialPreviews = []
  Object.keys(studentFiles).forEach(function (item) {
    console.log(studentFiles[item].id); // value
    initialPreviews.push(`<img class='kv-preview-data file-preview-image' 
                          src='/student_files/${studentFiles[item].filename}'
                          name='uploaded_files[]'
                          data-id='${studentFiles[item].id}'
                          >`)
    // initialPreviews.push("http://localhost:3333/student_files/"+studentFiles[item].filename)
  });

  initPlugin(initialPreviews);
}


function updateStudentStatus(student_id, status_id, note = null) {
  if (student_id) {
    showOverlay()

    // var formData = $("#form_approval").serializeArray();
    // formData.push({name: "student_id", value: student_id});
    // formData.push({name: "status_id", value: status_id});
    // formData.push({name: "note", value: note});

    // ajaxRequest(`${URL}/updateStudentStatus`, formData)
    // .then(res => {
    //     $("#student_details").modal("hide")
    //     Swal.fire({
    //       position: 'top-end',
    //       icon: 'success',
    //       title: 'Successfully Updated!',
    //       showConfirmButton: false,
    //       timer: 1500
    //     })
    //     getStudents(currentPage)
    //   })
    //   .catch(err => {
    //     console.log(err)
    //   })
    var data = [
      {student_id: student_id},
      {status_id: status_id},
      {note: note},
      {uploaded_files: uploaded_files()},

    ]
      $("#form_approval").find("input[name=admission_status_id]").val(status_id);
      // ajaxRequestForm(`${URL}/updateStudentStatus`, $('#form_approval'))
      ajaxFormRequestWithData(`${URL}/updateStudentStatus`, $('#form_approval'), data)
      .then(response => {
        if (response.validator) {
          validatorMessages(response.validator, $('#add-validator'))
          $(".validate").css("color", "#EC1C24")
        }else{
          if(response.err == 0){
            $("#student_details").modal("hide")
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'Successfully Updated!',
              showConfirmButton: false,
              timer: 1500
            })
            getStudents(currentPage)
          }else if(response.err == 2){
            $(`#validate-email`).text(" "+response.text).show()
            $(".validate").css("color", "#EC1C24")
          }
        }

        })
        .catch(err => {
          console.log(err)
        })


  }
}

function uploaded_files(){
  let unique = []
  var tn_array = $("img[name='uploaded_files[]']").map(function() {
    return $(this).attr("data-id");
  });
  unique = [...new Set(tn_array)];
  return unique;
}


function reasonOfRejection(student_id, status_id){

  Swal.fire({
    title: 'Reason of Rejection',
    input: 'textarea',
    inputAttributes: {
      autocapitalize: 'off'
    },
    showCancelButton: true,
    confirmButtonText: 'Send Email',
    showLoaderOnConfirm: true,
    preConfirm: (note) => {
      
      // var formData = $("#form_approval").serializeArray();
      // formData.push({name: "student_id", value: student_id});
      // formData.push({name: "status_id", value: status_id});
      // formData.push({name: "note", value: note});

      // return  ajaxRequest(`${URL}/updateStudentStatus`, formData)
      //   .then(response => {
      //     $("#student_details").modal("hide")
      //     getStudents(currentPage)
      //     return response

      //   })
      //   .catch(error => {
      //     console.log(err)
      //     // Swal.showValidationMessage(
      //     //   `Request failed: ${error}`
      //     // )
      //   })

      var data = [
        {student_id: student_id},
        {status_id: status_id},
        {note: note},
        {uploaded_files: uploaded_files()},
  
      ]
        $("#form_approval").find("input[name=admission_status_id]").val(status_id);
  
        // ajaxRequestForm(`${URL}/updateStudentStatus`, $('#form_approval'))
        ajaxFormRequestWithData(`${URL}/updateStudentStatus`, $('#form_approval'), data)
        .then(response => {
          console.log(response)
          if(!response){
            return false;
          }
          getStudents(currentPage)
          return true
          })
          .catch(err => {
            console.log(err)
             Swal.showValidationMessage(
              `Request failed: ${error}`
            )
          })

    },
    allowOutsideClick: () => !Swal.isLoading()
  }).then((result) => {
    
    if (result.isConfirmed) {
      if(result.value){
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Email successfully sent!',
          showConfirmButton: false,
          timer: 1500
        })
        $("#student_details").modal("hide")
      }else{
        Swal.fire({
          icon: 'warning',
          title: 'Please leave some note',
          showConfirmButton: false,
          timer: 1500
        })
      }

    }
  })
}


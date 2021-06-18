const URL = `${APP_URL}/admin/approval`
var currentPage = 1;


$("#page_title").text("Student Approval")
$("#breadcrumb_item").text("Student Approval")

$(() => {
  getStudents(1)
  // $(".modal").on("hidden.bs.modal", function () {
  // });
  $(document).on("hidden.bs.modal",".modal",function() {
    $("body").css("overflow-y", "auto");
  });
  
  $(document).on("click",".kv-file-zoom",function() {
    updateBFIicons()
  });
})

function fixModalFreeze(){
  $(".modal").css("overflow-y", "auto");
  $("body").css("overflow-y", "hidden");
}

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
      .then(response => {
        $('#approval_options').html(response.options)
        hideStatusButtons();
        var form_approval = $("#form_approval");
        mapStudentInfo(form_approval, response);
        if(response.student.parents[0].type == "father"){
          mapFatherInfo(form_approval, response.student.parents[0]);
          mapMotherInfo(form_approval, response.student.parents[1]);
        }else{
          mapFatherInfo(form_approval, response.student.parents[1]);
          mapMotherInfo(form_approval, response.student.parents[0]);
        }
        mapGuardianInfo(form_approval, response.student.guardian)
        mapStudentFiles(response);
        showAdmissionStatus(response.student.admission_status_id, response.student.encryptedId, response.student.reference_no);      

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
  form_approval.find("select[name=semester_id]").val(res.student.semester_id);
  form_approval.find("select[name=enrollment_type_id]").val(res.student.enrollment_type_id);
  form_approval.find("select[name=course_id]").val(res.student.course_id);
  form_approval.find("input[name=firstname]").val(res.student.firstname);
  form_approval.find("input[name=middlename]").val(res.student.middlename);
  form_approval.find("input[name=lastname]").val(res.student.lastname);
  form_approval.find("input[name=suffix]").val(res.student.suffix);
  form_approval.find("input[name=birthdate]").val(bdate);
  form_approval.find("input[name=birth_place]").val(res.student.birth_place);
  // form_approval.find("radio[name=marital_status]").val(res.student.marital_status);
  // form_approval.find("radio[name=gender]").val(res.student.gender);
  form_approval.find('input[name=marital_status][value="' + res.student.marital_status + '"]').prop('checked', true);
  form_approval.find('input[name=gender][value="' + res.student.gender + '"]').prop('checked', true);
  form_approval.find("input[name=height]").val(res.student.height);
  form_approval.find("input[name=weight]").val(res.student.weight);
  form_approval.find("input[name=citizenship]").val(res.student.citizenship);
  form_approval.find("input[name=address]").val(res.student.address);
  form_approval.find("input[name=email]").val(res.student.email);
  form_approval.find("input[name=contact]").val(res.student.contact);
  form_approval.find("input[name=last_school]").val(res.student.contact);
}

function mapFatherInfo(form_approval, father){
  var f_bdate = new Date(father.birthdate).toISOString().split('T')[0];
  form_approval.find("input[name=f_fullname]").val(father.fullname);
  form_approval.find("input[name=f_occupation]").val(father.occupation);
  form_approval.find("input[name=f_birthdate]").val(f_bdate);
}

function mapMotherInfo(form_approval, mother){
  var m_bdate = new Date(mother.birthdate).toISOString().split('T')[0];
  form_approval.find("input[name=m_fullname]").val(mother.fullname);
  form_approval.find("input[name=m_occupation]").val(mother.occupation);
  form_approval.find("input[name=m_birthdate]").val(m_bdate);
}
function mapGuardianInfo(form_approval, guardian){
  form_approval.find("input[name=g_fullname]").val(guardian.fullname);
  form_approval.find("input[name=g_address]").val(guardian.address);
  form_approval.find("input[name=g_contact]").val(guardian.contact);
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
  updateBFIicons();
}
function modalflow(){
  $(".modal").css('overflow-y', 'auto')
  $("body.modal-open").css('overflow-y', 'hidden')
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
          }else{
            console.log("response.err != 0")
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
          timer: 1500,
          onClose: () => {
            fixModalFreeze();
          }
        })
      }

    }
  })
}


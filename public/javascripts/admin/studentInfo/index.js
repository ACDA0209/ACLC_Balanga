const URL = `${APP_URL}/admin/studentinfo`
var currentPage = 1;


$("#page_title").text("Student Info")
$("#breadcrumb_item").text("Student Info")

$(() => {
  clearAddForm()
  getStudentInfo(1)
  $('[data-toggle="tooltip"]').tooltip(); 
})

function getStudentInfo(page) {
  if (page) {
    showOverlay()
    currentPage = page
    ajaxRequest(`${URL}/fetchStudentInfo`, {
      page: page
    })
      .then(res => {
        currentPage = page
        $('#table_studentInfo').html(res);
        $('[data-toggle="tooltip"]').tooltip(); 
        hideOverlay()
      })
      .catch(err => {
        console.log(err)
      })
  }
  $('[data-toggle="tooltip"]').tooltip()

}

function getStudentInfoDetails(student_id) {
  if (student_id) {
    showOverlay()
    ajaxRequest(`${URL}/getStudentInfoDetails`, {
      student_id: 1
    })
      .then(res => {
        $('#studentInfo_details').html(res)
        // $.fn.modal.Constructor.prototype._enforceFocus = function() {};
        $("#studentInfo_details").modal("show")
        // $('#table-students').html(res)
        hideOverlay();
        // $('#student_details').on('hidden.bs.modal', function (e) {
        //   $el4.fileinput('reset');
        // })
      })
      .catch(err => {
        console.log(err)
      })
  }
}


function uploadStudentInfo() {
  showOverlay();
  $(".validate").text("")
  ajaxRequestForm(`${URL}/uploadStudentInfo`, $('#form_upload_student_info'))
  .then(response => {
      hideOverlay()
      if (response.validator) {
        validatorMessages(response.validator, $('#add-validator'))
        $(".validate").css("color", "#EC1C24")
      }else{
        Swal.fire({
          icon: response.icon,
          title: response.title,
          text: response.text,
        })
        getStudentInfo(1);
      }

  })
  .catch(err => {
      Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!',
      })
    console.log(err)
  })
}

function clearAddForm(){
  $('#form_add_course').find("input[name=course]").val("");
  $('#form_add_course').find("textarea[name=description]").val("");
  $('#form_add_course').find("select[name=course_type_id]").val("");
}

function updateStudentInfo() {
  showOverlay();
  $(".validate").text("")
  ajaxRequestForm(`${URL}/updateStudentInfo`, $('#form_update_studentInfo'))
  .then(response => {
      hideOverlay()
      
      if (response.validator) {
        validatorMessagesUpdate(response.validator, $('#add-validator'))
        $(".validate").css("color", "#EC1C24")
      }else{
        Swal.fire({
          icon: response.icon,
          title: response.title,
          text: response.text,
        })
        $("#studentInfo_details").modal("hide")
        getStudentInfo(currentPage);
      }

  })
  .catch(err => {
      Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!',
      })
    console.log(err)
  })
}
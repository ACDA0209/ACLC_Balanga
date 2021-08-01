const URL = `${APP_URL}/admin/grades`
var currentPage = 1;


$("#page_title").text("Student Grades")
$("#breadcrumb_item").text("Student Grades")

$(() => {
  clearAddForm()
  getGrades(1)
  $('[data-toggle="tooltip"]').tooltip(); 
})

function getGrades(page) {
  if (page) {
    showOverlay()
    currentPage = page
    ajaxRequest(`${URL}/fetchGrades`, {
      page: page
    })
      .then(res => {
        currentPage = page
        $('#table_grades').html(res);
        $('[data-toggle="tooltip"]').tooltip(); 
        hideOverlay()
      })
      .catch(err => {
        console.log(err)
      })
  }
  $('[data-toggle="tooltip"]').tooltip()

}


function getGradeDetails(grade_id) {
  if (grade_id) {
    showOverlay()
    ajaxRequest(`${URL}/getGradeDetails`, {
      grade_id: grade_id
    })
      .then(res => {
        $('#grade_details').html(res)
        // $.fn.modal.Constructor.prototype._enforceFocus = function() {};
        $("#grade_details").modal("show")
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

function uploadGrades() {
  showOverlay();
  $(".validate").text("")
  ajaxRequestForm(`${URL}/uploadGrades`, $('#form_upload_grades'))
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
        getGrades(1);
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

function updateGrade() {
  showOverlay();
  $(".validate").text("")
  ajaxRequestForm(`${URL}/updateGrade`, $('#form_update_grade'))
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
        $("#grade_details").modal("hide")
        getGrades(currentPage);
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


function deleteGrade(id){
  if(id){

    Swal.fire({
      title: 'Do you want to delete this grade?',
      showDenyButton: true,
      confirmButtonText: `Yes`,
      denyButtonText: `No`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
          ajaxRequest(`${URL}/deleteGrade`, {
            id: id
            })
          .then(response => {
            getGrades(currentPage);
              Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Grade successfully deleted.',
                showConfirmButton: false,
                timer: 1500
              })
          })
          .catch(err => {
            Swal.fire({
              position: 'top-end',
              icon: 'warning',
              title: 'Something went wrong.',
              showConfirmButton: false,
              timer: 1500
            })
            })
          }
          })
  }
}
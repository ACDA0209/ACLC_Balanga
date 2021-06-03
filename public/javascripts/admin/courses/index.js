const URL = `${APP_URL}/admin/courses`
var currentPage = 1;


$("#page_title").text("Courses")
$("#breadcrumb_item").text("Courses")

$(() => {
  clearAddForm()
  getCourses(1)
})

function getCourses(page) {
  if (page) {
    showOverlay()
    currentPage = page
    ajaxRequest(`${URL}/fetchCourses`, {
      page: page
    })
      .then(res => {
        currentPage = page
        $('#table_courses').html(res)
        hideOverlay()
      })
      .catch(err => {
        console.log(err)
      })
  }
  $('[data-toggle="tooltip"]').tooltip()

}


function getCourseDetails(course_id) {
  if (course_id) {
    showOverlay()
    ajaxRequest(`${URL}/getCourseDetails`, {
      course_id: course_id
    })
      .then(res => {
        $('#course_details').html(res)
        // $.fn.modal.Constructor.prototype._enforceFocus = function() {};
        $("#course_details").modal("show")
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

function addCourse() {
  showOverlay();
  $(".validate").text("")
  ajaxRequestForm(`${URL}/addCourse`, $('#form_add_course'))
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
        $("#modal_add_course").modal("hide")
        $('.modal-backdrop').remove();
        clearAddForm();
        getCourses(1);
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

function updateCourse() {
  showOverlay();
  $(".validate").text("")
  ajaxRequestForm(`${URL}/updateCourse`, $('#form_course'))
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
        $("#course_details").modal("hide")
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
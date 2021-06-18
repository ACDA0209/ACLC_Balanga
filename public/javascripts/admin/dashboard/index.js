const URL = `${APP_URL}/admin`
var currentPage = 1;

$("#page_title").text("Home")
$("#breadcrumb_item").text("Main")

$(() => {
  getSemesterList()
  $(document).on("change","#semester_select",function() {
    updateSemesterStatus();
  });
})

function getSemesterList() {
    showOverlay()
    ajaxRequest(`${URL}/fetchSemesterList`, {
    })
      .then(res => {
        $('#semester-list').html(res)
        hideOverlay()
        updateSemesterStatus()
      })
      .catch(err => {
        console.log(err)
      })
}

function activateSemester() {
  showOverlay()
  ajaxRequest(`${URL}/activateSemester`, {
    semester_id:  $('#form_semester_year').find("select[name=id]").find(':selected').val() || 0
  })
    .then(res => {
      getSemesterList()
    })
    .catch(err => {
      console.log(err)
    })
}

function updateSemesterStatus(){
  var data_status = $('#form_semester_year').find("select[name=id]").find(':selected').attr('data-status');
  $("#semester_active_stat").text((data_status == 1) ? "Activated" : "Inactive");
  console.log(data_status)
}

function getSemesters(page, getList = false) {
  if (page) {
    showOverlay()
    currentPage = page
    ajaxRequest(`${URL}/fetchSemesters`, {
      page: page  
    })
      .then(res => {
        currentPage = page
        $('#table_semesters').html(res)
        hideOverlay();
        if(getList)
        getSemesterList();

      })
      .catch(err => {
        console.log(err)
      })
  }
  $('[data-toggle="tooltip"]').tooltip()

}

function addSemester() {
  showOverlay();
  $(".validate").text("")
  ajaxRequestForm(`${URL}/addSemester`, $('#form_add_semester'))
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
        getSemesters(1, true);
        $('#form_add_semester').find("input").val("")
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


function updateCourse() {
  showOverlay();
  $(".validate").text("")
  ajaxRequestForm(`${URL}/updateCourse`, $('#form_course'))
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
        $("#course_details").modal("hide")
        getCourses(currentPage);
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
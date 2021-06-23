const URL = `${APP_URL}/admin/users`
var currentPage = 1;


$("#page_title").text("Admin Users")
$("#breadcrumb_item").text("Admin Users")

$(() => {
  // clearAddForm()
  getAdmins(1)
})

function getAdmins(page) {
  if (page) {
    showOverlay()
    currentPage = page
    ajaxRequest(`${URL}/fetchAdmins`, {
      page: page
    })
      .then(res => {
        currentPage = page
        $('#table_admins').html(res)
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

function addAdminUser() {
  showOverlay();
  $(".validate").text("")
  ajaxRequestForm(`${URL}/addNewAdmin`, $('#form_add_admin'))
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
        $("#modal_add_admin").modal("hide")
        $('.modal-backdrop').remove();
        clearAddForm();
        getAdmins(1)

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
  $('#form_add_admin').find("input").val("");
}

function updateAdminUser(id, status) {
  var conf_msg = status == 1 ?
    "Are you sure you want to disable this user?" :
    "Are you sure you want to enable this user?" ;
  var btn_msg = status == 1 ?
    "Yes, disable it" :
    "Yes, enable it" ;

  Swal.fire({
    title: 'Warning',
    text: conf_msg,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: btn_msg
  }).then((result) => {
    if (result.isConfirmed) {
      if(updateAdminStatus(id)){
        Swal.fire(
          'Disabled!',
          'Successfully Updated',
          'success'
          )
        }
    }
  })
}


function updateAdminStatus(id){
  if (id) {
    showOverlay()
    ajaxRequest(`${URL}/updateAdminStatus`, {
      id: id
    })
      .then(res => {
        getAdmins(currentPage)
        return res
      })
      .catch(err => {
        console.log(err)
      })
  }
}
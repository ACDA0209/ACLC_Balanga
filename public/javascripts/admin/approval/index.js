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
        $('#table_students').html(res)
        hideOverlay()
      })
      .catch(err => {
        console.log(err)
      })
  }
  $('[data-toggle="tooltip"]').tooltip()

}

function getStudentDetails(student_id) {
  if (student_id) {
    showOverlay()
    ajaxRequest(`${URL}/getStudentDetails`, {
      student_id: student_id
    })
      .then(res => {
        $('#student_details').html(res)
        $.fn.modal.Constructor.prototype._enforceFocus = function() {};
        $("#student_details").modal("show")
        // $('#table-students').html(res)
        // hideOverlay()
      })
      .catch(err => {
        console.log(err)
      })
  }
}


function updateStudentStatus(student_id, status_id, note = null) {
  if (student_id) {
    showOverlay()

    var formData = $("#form_approval").serializeArray();
    formData.push({name: "student_id", value: student_id});
    formData.push({name: "status_id", value: status_id});
    formData.push({name: "note", value: note});

    ajaxRequest(`${URL}/updateStudentStatus`, formData)
    .then(res => {
        $("#student_details").modal("hide")
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Successfully Updated!',
          showConfirmButton: false,
          timer: 1500
        })
        getStudents(currentPage)
      })
      .catch(err => {
        console.log(err)
      })
  }
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
      
      var formData = $("#form_approval").serializeArray();
      formData.push({name: "student_id", value: student_id});
      formData.push({name: "status_id", value: status_id});
      formData.push({name: "note", value: note});

      return  ajaxRequest(`${URL}/updateStudentStatus`, formData)
        .then(response => {
          $("#student_details").modal("hide")
          getStudents(currentPage)
          return response

        })
        .catch(error => {
          console.log(err)
          // Swal.showValidationMessage(
          //   `Request failed: ${error}`
          // )
        })
    },
    allowOutsideClick: () => !Swal.isLoading()
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Email successfully sent!',
        showConfirmButton: false,
        timer: 1500
      })
    }
  })
}


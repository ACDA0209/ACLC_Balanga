const URL = `${APP_URL}/admin/approval`
var currentPage = 1;


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

        $("#student_details").modal("show")
        // $('#table-students').html(res)
        // hideOverlay()
      })
      .catch(err => {
        console.log(err)
      })
  }
}


function updateStudentStatus(student_id, status_id) {
  if (student_id) {
    showOverlay()
    ajaxRequest(`${URL}/updateStudentStatus`, {
      student_id: student_id,
      status_id: status_id
    })
      .then(res => {

        $("#student_details").modal("hide")
        getStudents(1)

      })
      .catch(err => {
        console.log(err)
      })
  }
}
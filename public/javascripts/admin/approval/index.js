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

    var formData = $("#form_approval").serializeArray();
    formData.push({name: "student_id", value: student_id});
    formData.push({name: "status_id", value: status_id});

    ajaxRequest(`${URL}/updateStudentStatus`, formData)
    .then(res => {
        $("#student_details").modal("hide")
        if(status_id == 3)
        alert('Status of student will be rejected and email will be sent to the student')
        getStudents(1)

      })
      .catch(err => {
        console.log(err)
      })
  }
}
const URL = `${APP_URL}/admin/myProfile`
var currentPage = 1;


$("#page_title").text("My Profile")
$("#breadcrumb_item").text("My Profile")

$(() => {
})


function updateMyProfile(admin_id) {
  showOverlay();
  $(".validate").text("")
  ajaxRequestForm(`${URL}/update`, $('#form_profile'))
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
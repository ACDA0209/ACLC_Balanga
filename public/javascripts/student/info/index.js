const URL = `${APP_URL}/info`
var currentPage = 1;

$(() => {
 
  $(document).on('click', '#btn_submit', () => {
    login()
})
})

function login() {
  showOverlay();
  $(".validate").text("")
  ajaxRequestForm(`${URL}/login`, $('#form_login'))
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
        $('#contact').html(response)
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
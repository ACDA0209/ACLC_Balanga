const URL = `${APP_URL}/admission`
var currentPage = 1;


$(() => {

    $(document).on('click', '#btn_submit', () => {
        storeUser()
      })
})

function storeUser() {
    showOverlay();
    ajaxRequestForm(`${URL}/submission`, $('#form_admission'))
    .then(response => {
        hideOverlay()
        
        Swal.fire({
            icon: response.icon,
            title: response.title,
            text: response.text,
          })

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
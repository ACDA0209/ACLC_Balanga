const URL = `${APP_URL}/admission`
var currentPage = 1;


$(() => {
    console.log("connected to admission js")
    $(document).on('click', '#btn_submit', () => {
        storeUser()
      })
})

function storeUser() {
    showOverlay();
    ajaxRequestForm(`${URL}/submission`, $('#form_admission'))
    .then(response => {
        hideOverlay()
     
    })
    .catch(err => {
      console.log(err)
    })
  }
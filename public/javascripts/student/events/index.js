const URL = `${APP_URL}/events`
var currentPage = 1;

$(() => {
  getEvents(1);
})

function getEvents(page) {
  if (page) {
    showOverlay()
    currentPage = page
    ajaxRequest(`${URL}/fetchEvents`, {
      page: page
    })
      .then(res => {
        currentPage = page
        $('#entries').html(res.entries)
        $('#recent_events').html(res.recent_events)
        hideOverlay()
      })
      .catch(err => {
        console.log(err)
      })
  }
  $('[data-toggle="tooltip"]').tooltip()

}


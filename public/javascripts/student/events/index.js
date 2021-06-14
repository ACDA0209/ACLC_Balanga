const URL = `${APP_URL}/events`
var currentPage = 1;

$(() => {
  $("#search").val("");
  getEvents(1);
  $("#search_form").submit(function(e) {
    getEvents(1)
    e.preventDefault();
})
})

function getEvents(page) {
  var search = $("#search").val()
  if (page) {
    showOverlay()
    currentPage = page
    ajaxRequest(`${URL}/fetchEvents`, {
      page: page,
      search: search || ""
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


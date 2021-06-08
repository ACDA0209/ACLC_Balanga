const URL = `${APP_URL}/admin/events`
var currentPage = 1;
var cover_photo_src = ""

$("#page_title").text("Events")
$("#breadcrumb_item").text("Events")

$(() => {
  clearAddForm()
  getEvents(1)

  var imgInp = $("#cover_photo")
  $(document).on('change', imgInp, function() {
    var file = $("#cover_photo").get(0).files[0];
    if(file){
        var reader = new FileReader();
        reader.onload = function(){
            $("#cover_photo_prev").attr("src", reader.result);
        }
        reader.readAsDataURL(file);
      }
  });
  $(document).on('click', $("#btn-reset-cover-photo"), function() {
    $("#cover_photo_prev").attr("src", cover_photo_src);
  });

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
        $('#table_events').html(res)
        hideOverlay()
      })
      .catch(err => {
        console.log(err)
      })
  }
  $('[data-toggle="tooltip"]').tooltip()

}


function getEventDetails(event_id) {
  if (event_id) {
    showOverlay()
    ajaxRequest(`${URL}/getEventDetails`, {
      event_id: event_id
    })
      .then(res => {
        $('#event_details').html(res)
        // $.fn.modal.Constructor.prototype._enforceFocus = function() {};
        $("#event_details").modal("show")
        cover_photo_src = $("#cover_photo_prev").attr("src");
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

function addEvent() {
  showOverlay();
  $(".validate").text("")
  ajaxRequestForm(`${URL}/addEvent`, $('#form_add_event'))
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
        $("#modal_add_event").modal("hide")
        $('.modal-backdrop').remove();
        clearAddForm();
        getEvents(1);
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
  $('#form_add_event').find("input[name=title]").val("");
  $('#form_add_event').find("textarea[name=description]").val("");
  $('#form_add_event').find("input[name=event_date]").val("");
  $('#form_add_event').find("file[name=cover_photo]").val("");
}

function updateEvent() {
  showOverlay();
  $(".validate").text("")
  ajaxRequestForm(`${URL}/updateEvent`, $('#form_event'))
  .then(response => {
      hideOverlay()
      
      if (response.validator) {
        validatorMessagesUpdate(response.validator, $('#add-validator'))
        $(".validate").css("color", "#EC1C24")
      }else{
        Swal.fire({
          icon: response.icon,
          title: response.title,
          text: response.text,
        })
        $("#event_details").modal("hide")
        getEvents(currentPage);
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

var APP_URL = 'http://localhost:3333'
var wsConnId = ''
var ajax_var_request;

function ajaxRequest(url, data) {
  if (ajax_var_request && ajax_var_request.readyState != 4)
  {
  ajax_var_request.abort();
  }
    ajax_var_request = $.ajax({
      headers: {
        'X-CSRF-Token': $('meta[name="csrf_token"]').attr('content')
      },
      url: url,
      method: 'POST',
      data: data
    })

    return ajax_var_request

}

function ajaxRequestForm(url, form) {
  return $.ajax({
    headers: {
        'X-CSRF-Token': $('meta[name="csrf_token"]').attr('content')
    },
    url: url,
    method: 'POST',
    data: new FormData(form[0]),
    contentType: false,
    cache: false,
    processData: false,
  })
}

function ajaxFormRequestWithData(url, form, data, id) {

  var newFormData = new FormData(form[0]);
  // for (var i = 0, valuePair; valuePair = data[i]; i++)
  //     for (var j in valuePair) newFormData.append(j, valuePair[j]);
  newFormData.append('data',JSON.stringify(data));
  return $.ajax({
      type: 'POST',
      url: url,
      headers: {
          'X-CSRF-Token': $('meta[name="csrf_token"]').attr('content')
      },
      data: newFormData,
      contentType: false,
      cache: false,
      processData: false,
  });

}

function validatorMessages(validator, elem) {
  // elem.html('')
  $(".validate").hide()
  $.each(validator, (key, value) => {
    $(`#validate-${value["field"]}`).text(value['message']).show()
    if(value["field"] == "file_attachments.0"){
      $(`#validate-file_attachments_arr`).text(value['message']).show()
    }
    // elem.append(value['message'] + '<br>')
  })

}

function validatorMessagesUpdate(validator, elem) {
  // elem.html('')
  $(".validate").hide()
  $.each(validator, (key, value) => {
    $(`#validate-update-${value["field"]}`).text(value['message']).show()
    // elem.append(value['message'] + '<br>')
  })

}

function clearHtmlElement(keyword) {
  $('[id^="' + keyword + '"]').each((index, elem) => {
    $(elem).val('')
  })
  $('[id="' + keyword + 'validator"]').html('')
}

function hideModal(modalId) {
  $(`#${modalId}`).modal('hide')
}

function showOverlay() {
  $('#overlay').attr('class', 'loading')
}

function hideOverlay() {
  $('#overlay').attr('class', '')
}

//connect to websocket
function startWebSocket(){
  ws = adonis.Ws().connect()

  ws.on('open', (res) => {
    console.log('connected to ws server')
    wsConnId = res.connId
  })

  ws.on('error', () => {
    console.log('not connected to ws server')
  })
}

function updateBFIicons(){
  $(".btn-fullscreen").html(`<i class="fa fa-fw fa-expand-arrows-alt"></i>`)
  $(".btn-toggleheader").hide()
  $(".btn-borderless").html(`<i class="fa fa-fw fa-arrows-alt"></i>`)
  $(".btn-close").html(`<i class="fa fa-fw fa-window-close"></i>`)
}


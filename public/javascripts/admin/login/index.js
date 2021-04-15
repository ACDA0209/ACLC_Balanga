
function onLogin(){
  ajaxRequest(APP_URL + '/onLogin', {
    username: $("#username").val(),
    password: $("#password").val()
  })
    .then(res => {
      console.log(res)
      if (res === 'Success') {
        window.location.reload()
      }
    })
    .catch(err => {
      console.log(err)
    })
}


function signOut() {
  ajaxRequest(APP_URL + '/logout', {})
    .then(res => {
      console.log(res)
      if (res === 'Success') {
        window.location.reload()
      }
    })
    .catch(err => {
      console.log(err)
    })

}


const URL = `${APP_URL}/admin`
var currentPage = 1;
var cover_photo_src = ""
$("#page_title").text("Home")
$("#breadcrumb_item").text("Main")

$(() => {
  $.ajax({
    beforeSend  : function () {getSemesterList()},
    success : function () {getCarousels(1)}
  });

  // getSemesterList()
  // getCarousels(1)
  $(document).on("change","#semester_select",function() {
    updateSemesterStatus();
  });


  var imgInp = $("#cover_photo");
  $(document).on('change', "#cover_photo", function() {
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
    $("#cover_photo").val("");
  });
  $('[data-toggle="tooltip"]').tooltip(); 
})

function getCarousels(page) {
  if (page) {
    showOverlay()
    currentPage = page
    ajaxRequest(`${URL}/fetchCarousels`, {
      page: page  
    })
      .then(res => {
        currentPage = page
        $('#table_carousel').html(res);
        $('[data-toggle="tooltip"]').tooltip(); 
        hideOverlay();
      })
      .catch(err => {
        console.log(err)
      })
  }
  $('[data-toggle="tooltip"]').tooltip()
}

function addCarouselItem() {
  showOverlay();
  $(".validate").text("")
  var this_form = $('#form_add_carousel');
  ajaxRequestForm(`${URL}/addCarouselItem`, this_form)
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
        $("#modal_add_item").modal("hide")
        $('.modal-backdrop').remove();
        clearAddCarouselItemForm();
        getCarousels(1);
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

function clearAddCarouselItemForm(){
  $('#form_add_carousel').find("input[name=title]").val("");
  $('#form_add_carousel').find("textarea[name=description]").val("");
  $('#form_add_carousel').find("file[name=cover_photo]").val("");
}

function getCarouselDetails(carousel_id) {
  if (carousel_id) {
    showOverlay()
    ajaxRequest(`${URL}/getCarouselDetails`, {
      carousel_id: carousel_id
    })
      .then(res => {
        $('#item_details').html(res)
        $("#item_details").modal("show")
        cover_photo_src = $("#cover_photo_prev").attr("src");
        hideOverlay()
      })
      .catch(err => {
        console.log(err)
      })
  }
}


function updateCarousel() {
  showOverlay();
  $(".validate").text("")
  var this_form = $('#form_update_carousel');
  ajaxRequestForm(`${URL}/updateCarousel`, this_form)
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
        $("#item_details").modal("hide")
        getCarousels(currentPage);
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

function deleteCarouselItem(id){
  if(id){

    Swal.fire({
      title: 'Do you want to delete this item?',
      showDenyButton: true,
      confirmButtonText: `Yes`,
      denyButtonText: `No`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
          ajaxRequest(`${URL}/deleteCarouselItem`, {
            id: id
            })
          .then(response => {
            getCarousels(currentPage);
              Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Item successfully deleted.',
                showConfirmButton: false,
                timer: 1500
              })
          })
          .catch(err => {
            Swal.fire({
              position: 'top-end',
              icon: 'warning',
              title: 'Something went wrong.',
              showConfirmButton: false,
              timer: 1500
            })
            })
          }
          })
  }
}

function getSemesterList() {
    showOverlay()
    ajaxRequest(`${URL}/fetchSemesterList`, {
    })
      .then(res => {
        $('#semester-list').html(res)
        hideOverlay()
        updateSemesterStatus()
      })
      .catch(err => {
        console.log(err)
      })
}

function activateSemester() {
  // showOverlay()
  // ajaxRequest(`${URL}/activateSemester`, {
  //   semester_id:  $('#form_semester_year').find("select[name=id]").find(':selected').val() || 0
  // })
  //   .then(res => {
  //     hideOverlay()
  //     getSemesterList()
  //   })
  //   .catch(err => {
  //     console.log(err)
  //   })

    Swal.fire({
      title: 'Are you sure you want to activate this semester?',
      showDenyButton: true,
      confirmButtonText: `Yes, Activate`,
      denyButtonText: `No`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        ajaxRequest(`${URL}/activateSemester`, {
          semester_id:  $('#form_semester_year').find("select[name=id]").find(':selected').val() || 0
        })
          .then(res => {
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'Successfully Activated!',
              showConfirmButton: false,
              timer: 1500
            })
            getSemesterList()
          })
          .catch(err => {
            console.log(err)
          })
      }
    })
}

function updateSemesterStatus(){
  var data_status = $('#form_semester_year').find("select[name=id]").find(':selected').attr('data-status');
  $("#semester_active_stat").text((data_status == 1) ? "Activated" : "Inactive");
  console.log(data_status)
}

function getSemesters(page, getList = false) {
  if (page) {
    showOverlay()
    currentPage = page
    ajaxRequest(`${URL}/fetchSemesters`, {
      page: page  
    })
      .then(res => {
        currentPage = page
        $('#table_semesters').html(res)
        hideOverlay();
        if(getList)
        getSemesterList();

      })
      .catch(err => {
        console.log(err)
      })
  }
  $('[data-toggle="tooltip"]').tooltip()

}

function addSemester() {
  showOverlay();
  $(".validate").text("")
  ajaxRequestForm(`${URL}/addSemester`, $('#form_add_semester'))
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
        getSemesters(1, true);
        $('#form_add_semester').find("input").val("")
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


function updateCourse() {
  showOverlay();
  $(".validate").text("")
  ajaxRequestForm(`${URL}/updateCourse`, $('#form_course'))
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
        $("#course_details").modal("hide")
        getCourses(currentPage);
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
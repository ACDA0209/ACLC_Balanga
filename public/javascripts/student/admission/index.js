const URL = `${APP_URL}/admission`
var currentPage = 1;


$(() => {

    $(document).on('click', '#btn_submit', () => {
        storeUser()
    })

    $(document).on("click",".kv-file-zoom",function() {
      updateBFIicons()
    });

    $(document).on("click",".btn-req",function() {
      console.log($(this).data("target"))
      var id = $(this).data("target");
      $(id).collapse('toggle')
    });
    inputSanitation();
})

$("#file_attachments").fileinput({
  theme: "fa",
  uploadUrl: "/file-upload-batch/1",
  uploadAsync: false,
  showUpload: false,
  showDownload: false,
  showZoom: false,
  minFileCount: 2,
  maxFileCount: 5,
  overwriteInitial: true,
  initialPreview: [
      
  ],
  initialPreviewAsData: false, // allows you to set a raw markup
  initialPreviewFileType: 'image', // image is the default and can be overridden in config below
  initialPreviewDownloadUrl: 'https://picsum.photos/id/{key}/1920/1080', // includes the dynamic key tag to be replaced for each config
  initialPreviewConfig: [
      
  ],
  uploadExtraData: {
      img_key: "1000",
      img_keywords: "happy, nature"
  }, 
  fileActionSettings: {
  showDrag: false,
  showZoom: true,
  showDownload: false,
  showUpload: false,
  showDelete: true,
  }
}).on('filesorted', function(e, params) {
  console.log('File sorted params', params);
  
}).on('fileuploaded', function(e, params) {
  console.log('File uploaded params', params);
});


function storeUser() {
    // showOverlay();
    ajaxRequestForm(`${URL}/submission`, $('#form_admission'))
    .then(response => {
        // hideOverlay()
        
        if (response.validator) {
          validatorMessages(response.validator, $('#add-validator'))
          var warning_list = "<ul>";
          response.validator.forEach(element => {
            warning_list += `<li>${element.message}</li>`;
          });
          warning_list += "</ul>";
          $("#compile_validator_submission").removeClass("d-none");
          $("#compile_validator_submission").find('p').html(warning_list);
        }else{
          // Swal.fire({
          //   icon: response.icon,
          //   title: response.title,
          //   text: response.text,
          // })
          location.href = "/admission/confirmation/"+response.encrypted_id
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


  function inputSanitation(){
    var inp_number = 
    `#form_admission [name='contact'],
     #form_admission [name='g_contact']
    `;
    $(document).on("keyup",
    inp_number,function() {
      var val = $(this).val();
      if(isNaN(val)){
           val = val.replace(/[^0-9]/g,'');
      }
      $(this).val(val); 
    });


    var inp_decimal = 
    `#form_admission [name='height'], 
     #form_admission [name='weight']
    `;
    $(document).on("keyup",
    inp_decimal,function() {
      var val = $(this).val();
      if(isNaN(val)){
           val = val.replace(/[^0-9\.]/g,'');
           if(val.split('.').length>2) 
               val =val.replace(/\.+$/,"");
      }
      $(this).val(val); 
    });
  }
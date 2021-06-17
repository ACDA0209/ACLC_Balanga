const URL = `${APP_URL}/admission`
var currentPage = 1;


$(() => {

    $(document).on('click', '#btn_submit', () => {
        storeUser()
    })

    $(document).on("click",".kv-file-zoom",function() {
      updateBFIicons()
    });
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
    showOverlay();
    ajaxRequestForm(`${URL}/submission`, $('#form_admission'))
    .then(response => {
        hideOverlay()
        
        if (response.validator) {
          validatorMessages(response.validator, $('#add-validator'))
        
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
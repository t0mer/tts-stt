$(document).on('change', '.btn-file :file', function () {
    var input = $(this),
        label = input.val().replace(/\\/g, '/').replace(/.*\//, '');
    input.trigger('fileselect', [label]);
});


$('.btn-file :file').on('fileselect', function (event, label) {
    var input = $(this).parents('.input-group').find(':text'),
        log = label;
    if (input.length) {
        input.val(log);
    } else {
        if (log) alert(log);
    }
});


function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            $('#img-upload').attr('src', e.target.result);
        }
        reader.readAsDataURL(input.files[0]);
    }
}


$(document).ready(function () {

    $("#imgInp").change(function () {
        readURL(this);
    });

    $('#teach').click(function () {
        var form_data = new FormData($('#dsform')[0]);
        $.ajax({
            type: 'POST',
            url: '/convert',
            data: form_data,
            contentType: false,
            cache: false,
            processData: false,
            success: function (data) {
                try {
                   $('#trsnscript').val(data)
                    
                  }
                  catch(err) {
                   alert(err);
                  }
                  if (data.hasOwnProperty('error')) {
                    alert(data.error)
                }
            },
        });
    });

});


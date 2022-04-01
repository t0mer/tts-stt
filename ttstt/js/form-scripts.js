voices = '';


$(document).ready(function () {


    $('#submit').click(function () {
        var text = $("#text").val();
        $.ajax({
            type: "POST",
            url: "detect",
            data: text,
            dataType: "json",
            success: function (data) {
                data = $.parseJSON(data);
                if (data.success == "1") {
                    formSuccess(data.name);
                    getVOices(data.lang)
                    var listItems = "";
                } else {
                    formError();
                    submitMSG(false, text);
                }
            }
        });
    });


    $('#transciptBtn').click(function () {
        var form_data = new FormData($('#sttform')[0]);
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
                catch (err) {
                    alert(err);
                }
                if (data.hasOwnProperty('error')) {
                    alert(data.error)
                }
            },
        });
    });

    $('#play').click(function () {
        var text = $('#text').val();
        var voice = $('#voices').val();
        var pitch = document.getElementById("pitch_val").innerHTML;
        var audio = new Audio("/play?text=" + text + "&voice=" + voice + "&pitch=" + pitch);
        audio.play();

    });

    getLanguages();
});

//Get list of optional voices for the requeated language
function getVOices(language) {
    $.ajax({
        type: "POST",
        url: "voices",
        data: language,
        dataType: "json",
        success: function (data) {
            // data = $.parseJSON(data);
            listItems = '';
            voices = data.voices;
            $.each(data.voices, function (i, item) {
                listItems += "<option value='" + item + "'>" + item + "</option>";

            });
            $("#voices").html(listItems);
        }
    });
}

///Get list of supported SST Languages
function getLanguages() {
    $.ajax({
        type: "get",
        url: "languages",
        dataType: "json",
        success: function (data) {
            // data = $.parseJSON(data);
            listItems = '';
            voices = data;
            $.each(data, function (i, item) {
                listItems += "<option value='" + item.code + "'>" + item.name + "</option>";

            });
            $("#languages").html(listItems);
        }
    });
}





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



function formSuccess(data) {
    submitMSG(true, data)
}

function formError() {
    $("#contactForm").val("Un supported language");

}

function submitMSG(valid, msg) {
    if (valid) {
        var msgClasses = "h3 text-center tada animated text-success";
    } else {
        var msgClasses = "h3 text-center text-danger";
    }
    $("#lang").val(msg);
}



var slider = document.getElementById("pitch");
var output = document.getElementById("pitch_val");
output.innerHTML = slider.value;

slider.oninput = function () {
    output.innerHTML = this.value;
}
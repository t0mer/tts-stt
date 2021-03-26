voices='';
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
                    formSuccess(data.lang);
                    getVOices(data.lang)
                    var listItems = "";
                    //    for (var i = 0; i < jsonData.voices.length; i++){
                    //      listItems+= "<option value='" + jsonData.voices[i].voice + "'>" + jsonData.voices[i].voice + "</option>";
                    //    }
                    //    $("#voices").html(listItems);




                } else {
                    formError();
                    submitMSG(false, text);
                }
            }
        });
    });

    $('#play').click(function(){
        var text = $('#text').val();
        var voice = $('#voices').val();
        var pitch = document.getElementById("pitch_val").innerHTML;
        var audio = new Audio("/play?text=" + text + "&voice=" + voice + "&pitch=" + pitch);
        audio.play();

    });
});


function getVOices(language) {
$.ajax({
    type: "POST",
    url: "voices",
    data: language,
    dataType: "json",
    success: function (data) {
        // data = $.parseJSON(data);
        listItems='';
        voices=data.voices;
        $.each(data.voices, function (i, item) {
            listItems+= "<option value='" + item + "'>" + item + "</option>";
           
       });
       $("#voices").html(listItems);
    }
});


}


function formSuccess(data) {
    submitMSG(true, data)
}

function formError() {
    $("#contactForm").removeClass().addClass('shake animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
        $(this).removeClass();
    });
}

function submitMSG(valid, msg) {
    if (valid) {
        var msgClasses = "h3 text-center tada animated text-success";
    } else {
        var msgClasses = "h3 text-center text-danger";
    }
    $("#lang").removeClass().addClass(msgClasses).val(msg);
}



var slider = document.getElementById("pitch");
var output = document.getElementById("pitch_val");
output.innerHTML = slider.value;

slider.oninput = function() {
  output.innerHTML = this.value;
}
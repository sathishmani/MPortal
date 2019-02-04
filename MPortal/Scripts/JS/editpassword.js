$(function() { //initial fn starts here

    $(".loadericon").hide();

    //enter click fn signup/login starts here
    $(".ipclkcpwd").keyup(function(event) {
        if (event.keyCode == 13) {
            $(".etrclkcpwd").click();
        }
    });


    // $("#loder_changepass").hide();

    // $("#oldpwd,#newpwd,#renewpass").focusin(function() {
    //     $('.cperr').hide();
    // });

    //strong password validation starts here
    //  $('#newpwd').keyup(function() {

    //     var pswd = $('#newpwd').val();
    //     $('#newpwd').removeClass("iserror");
    //     // keyup code here
    //     if (pswd.length < 8) {
    //         $('#length').removeClass('valid').addClass('invalid');
    //     } else {
    //         $('#length').removeClass('invalid').addClass('valid');
    //     }
    //     //validate letter
    //     if (pswd.match(/[A-z]/)) {
    //         $('#letter').removeClass('invalid').addClass('valid');
    //     } else {
    //         $('#letter').removeClass('valid').addClass('invalid');
    //     }

    //     //validate capital letter
    //     if (pswd.match(/[A-Z]/)) {
    //         $('#capital').removeClass('invalid').addClass('valid');
    //     } else {
    //         $('#capital').removeClass('valid').addClass('invalid');
    //     }

    //     //validate number
    //     if (pswd.match(/\d/)) {
    //         $('#number').removeClass('invalid').addClass('valid');
    //     } else {
    //         $('#number').removeClass('valid').addClass('invalid');
    //     }

    //     if ($("#letter").hasClass('valid') && $("#capital").hasClass('valid') && $("#number").hasClass('valid') && $("#length").hasClass('valid')) {
    //         $('#pswd_info').hide();
    //     } else {
    //         $('#pswd_info').show();
    //     }

    // }).focus(function() {
    //     $('#pswd_info').show();
    // }).blur(function() {
    //     $('#pswd_info').hide();
    // });
    // strong password validation ends here

    $("#oldpwd").keyup(function() {
        if ($("#oldpwd").val() == "")
            $("#oldpwd").css({
                "border": "1px solid red"
            });
        else
            $("#oldpwd").css({
                "border": ""
            });
    });
    $("#newpwd").keyup(function() {
        if ($("#newpwd").val() == "")
            $("#newpwd").css({
                "border": "1px solid red"
            });
        else
            $("#newpwd").css({
                "border": ""
            });
    });
    $("#renewpass").keyup(function() {
        if ($("#renewpass").val() == "")
            $("#renewpass").css({
                "border": "1px solid red"
            });
        else
            $("#renewpass").css({
                "border": ""
            });
    });

}); //initial fn ends here


//change password fn starts here
function changepassword() {

    if ($('#oldpwd').val().trim() == '') {
        $("#oldpwd").css({
            "border": "1px solid red"
        });
        $("#snackbarerror").text("Old Password is Required");
        showiperrtoast();
        event.stopPropagation();
        return;
    }
    if ($('#newpwd').val().trim() == '') {
        $("#newpwd").css({
            "border": "1px solid red"
        });
        $("#snackbarerror").text("New Password is Required");
        showiperrtoast();
        event.stopPropagation();
        return;
    }
    if ($('#oldpwd').val() == $('#newpwd').val()) {
        $("#snackbarerror").text("Old Password & New Password should not be same!");
        showiperrtoast();
        event.stopPropagation();
        return;
    }

    // if ($('#newpwd').val().length < 6) {
    //     $("#newpwd").css({
    //         "border": "1px solid red"
    //     });
    //     $("#snackbarerror").text("Min 6 Characters is Required for New Password!");
    //     showiperrtoast();
    //     event.stopPropagation();
    //     return;
    // }

    //strong pwd validation
    //   if ($("#letter").hasClass('valid') && $("#capital").hasClass('valid') && $("#number").hasClass('valid') && $("#length").hasClass('valid')) {
    //     $('#pswd_info').hide();
    // } else {
    //      $("#newpwd").css({
    //          "border": "1px solid red"
    //      });
    //      $("#snackbarerror").text("Enter a strong password");
    //      showiperrtoast();
    //     event.stopPropagation();
    //     return;
    // }
    // if ($('#renewpass').val().length < 6) {
    //     $("#renewpass").css({
    //         "border": "1px solid red"
    //     });
    //     $("#snackbarerror").text("Min 6 Characters is Required for Retype-Password!");
    //     showiperrtoast();
    //     event.stopPropagation();
    //     return;
    // }

    if ($('#renewpass').val().trim() == '') {
        $("#renewpass").css({
            "border": "1px solid red"
        });
        $("#snackbarerror").text("Re-enter New Password is Required");
        showiperrtoast();
        event.stopPropagation();
        return;
    }

    if ($('#renewpass').val() != $('#newpwd').val()) {
        $("#snackbarerror").text("Passwords Do Not Match!");
        $("#renewpass").css({
            "border": "1px solid red"
        });
        showiperrtoast();
        event.stopPropagation();
        return;
    }
    
    $(".loadericon").show();
    $(".changepassBtn").attr("disabled", true);

    var postdata = JSON.stringify({
        "current_password": $("#oldpwd").val(),
        "password": $("#newpwd").val()
    });

    $.ajax({
        url: changepassword_api,
        type: 'post',
        data: postdata,
        headers: {
            "content-type": 'application/json'
        },
        beforeSend: function(xhr) {
            xhr.setRequestHeader("Authorization", "Token " + localStorage.wutkn)
        },
        success: function(data) {

            $(".loadericon").hide();
            $(".changepassBtn").html('Submit');
            $(".changepassBtn").attr("disabled", false);

        },
        error: function(data) {

            console.log(data);
            $(".loadericon").hide();
            $(".changepassBtn").html('Submit');
            $(".changepassBtn").attr("disabled", false);

            var errtext = '';
            for (var key in JSON.parse(data.responseText)) {
                errtext = JSON.parse(data.responseText)[key];
            }
            $("#snackbarerror").text(errtext);
            showerrtoast();

        }
    }).done(function(dataJson) {
        $(".closechangepass").click();
        $("#oldpwd,#newpwd,#renewpass").val("");
        $("#snackbarsuccs").text("Password Changed Sucessfully!");
        showsuccesstoast();
        setTimeout(function() {
            window.location.href = "dashboard.html";
        }, 3000)

    });

} //change password fn ends here
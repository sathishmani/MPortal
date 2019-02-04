var countryone, statesone, cityone, casteone, subcasteone, educationone, occupationone, currencyone;
var aboutthem = [];
var aboutthierhobbies = [];
var dohsamchoices = [];
$(function () {

    if (localStorage.registerphase1data == undefined) {
        getregphase1data();
    } else {
        var currentdate = new Date().getDate();
        if (currentdate != localStorage.datastoreddate_rp1) {
            localStorage.removeItem("registerphase1data");
            getregphase1data();
        } else {
            getregp1datafromlocal(1); //this fn can happen 
        }
    }

    if (localStorage.profilefor != "Myself") {
        $(".aboutusname").text("About My " + localStorage.profilefor)
    }

    $(".loadericon").hide();



}); //initiative fn ends here

//get register phase 1 data from server
function getregphase1data() {

    $.ajax({
        url: getregp1data_api + (localStorage.useracccred ? "?religion=" + JSON.parse(localStorage.useracccred).religion : ""),
        type: 'get',
        success: function (data) {
            localStorage.registerphase1data = JSON.stringify(data);
            localStorage.datastoreddate_rp1 = new Date().getDate();

            getregp1datafromlocal(0); //this fn is common for all
        },
        error: function (edata) {
            $("#snackbarerror").text("OOPS something Went wrong. Please wait 2 Min");
            showiperrtoast();
            event.stopPropagation();
        }
    });

} //get register phase 1 data from server

//get phaseone details from local
function getregp1datafromlocal(type) {

    var data = JSON.parse(localStorage.registerphase1data);

    //country dyn append
    for (var i = 0; i < data.country.length; i++) {
        if (data.country[i].name == "India") {
            countryone += "<option selected='' value='" + data.country[i].id + "'>" + data.country[i].name + "</option>";
            localStorage.selectedcountrycode = data.country[i].id;
        } else {
            countryone += "<option value='" + data.country[i].id + "'>" + data.country[i].name + "</option>";
        }
    }
    $('#rp1_country').empty().append(countryone);
    getstateslist(0);
    //caste dyn append
    for (var i = 0; i < data.caste.length; i++) {
        if (i == 0) {
            casteone += "<option selected='' value='null'>Select Your Caste</option>";
            // localStorage.selectedcastecode = data.caste[i].id;
        } else {
            casteone += "<option value='" + data.caste[i].id + "'>" + data.caste[i].name + "</option>";
        }
    }
    $('#rp1_caste').empty().append(casteone);
    // getsubcastelist(0);
    //dosham yes dyn append
    for (var i = 0; i < data.dosham.length; i++) {
        if (i == 0) {
            $(".dynamicdoshamyes").append("<label class='control control--checkbox displayinline doshacheckbox'>" + data.dosham[i].name + "<input type='checkbox' name='dosham' checked='' attrval='" + data.dosham[i].id + "' /><div class='control__indicator'></div></label>");

        } else {
            $(".dynamicdoshamyes").append("<label class='control control--checkbox displayinline doshacheckbox'>" + data.dosham[i].name + "<input type='checkbox' name='dosham' attrval='" + data.dosham[i].id + "' /><div class='control__indicator'></div></label>")
        }
    }

    // Load Mother tonge language
    $("#rp6_mothertongue").empty();
    data.languages.forEach(element => {
        $("#rp6_mothertongue").append("<option value='" + element.id + "'>" + element.name + "</option>");
    });


    //highest education dyn append
    $('#rp1_education').empty().append('<option value="null">Select Your Heighest Education</option>');
    for (var i = 0; i < data.education.length; i++) {
        $('#rp1_education').append("<optgroup class='a educationsubmenu" + data.education[i].id + "' label='" + data.education[i].name + "'></optgroup>");
        for (var j = 0; j < data.education[i].branch.length; j++) {
            $(".educationsubmenu" + data.education[i].id).append("<option value='" + data.education[i].branch[j].id + "'>" + data.education[i].branch[j].name + "</option>");
        }
    }
    //occupation dyn append
    $('#rp1_occupation').empty().append('<option value="null">Select Your Occupation</option>');
    for (var i = 0; i < data.occupation_sector.length; i++) {
        $('#rp1_occupation').append("<optgroup class='a occupationsubmenu" + data.occupation_sector[i].id + "' label='" + data.occupation_sector[i].name + "'></optgroup>");
        for (var j = 0; j < data.occupation_sector[i].occupation.length; j++) {
            $(".occupationsubmenu" + data.occupation_sector[i].id).append("<option value='" + data.occupation_sector[i].occupation[j].id + "'>" + data.occupation_sector[i].occupation[j].name + "</option>");
        }
    }
    //currency dyn append
    for (var i = 0; i < data.currency.length; i++) {
        if (i == 0) {
            currencyone += "<option value='null'>Select Your Currency</option>";
        } else {
            currencyone += "<option value='" + data.currency[i].id + "'>" + data.currency[i].name + "</option>";
        }

    }
    $('#rp1_currency').empty().append(currencyone);
    $('#rp1_currency option[value="98"]').attr("selected", true);

} //get phaseone details from local ends here

$("#rp1_country").change(function () {
    localStorage.selectedcountrycode = $("#rp1_country").val();
    getstateslist(1);
});

$("#rp1_state").change(function () {
    localStorage.selectedstatecode = $("#rp1_state").val();
    getcitieslist(1);
});

$("#rp1_caste").change(function () {

    if ($("#rp1_caste").val() == "null") {
        $('#rp1_subcaste').empty().append('<option value="null">Select Your Subcaste</option>');
    } else {
        localStorage.selectedcastecode = $("#rp1_caste").val();
        getsubcastelist(1);
    }

});

//get states list fn starts here
function getstateslist(type) {
    $.ajax({
        url: getregp1statesdata_api + localStorage.selectedcountrycode + '/',
        type: 'get',
        success: function (data) {
            //states dyn append
            statesone = "";
            if (data.length != 0) {
                for (var i = 0; i < data.length; i++) {
                    if (type == 0) {
                        if (data[i].name == "Tamil Nadu") {
                            statesone += "<option selected='' value='" + data[i].id + "'>" + data[i].name + "</option>";
                            localStorage.selectedstatecode = data[i].id;
                        } else {
                            statesone += "<option value='" + data[i].id + "'>" + data[i].name + "</option>";
                        }
                    } else {
                        statesone += "<option value='" + data[i].id + "'>" + data[i].name + "</option>";
                    }
                }
                if (type == 0) {
                    getcitieslist(0);
                } else {
                    getcitieslist(1);
                }

                $('#rp1_city').empty().append("<option value='null' selected>Select City</option>");

            } else {
                statesone += "<option value='null' selected>No States Found</option>";
                $('#rp1_city').empty().append("<option value='null' selected>No Cities Found</option>");
            }
            $('#rp1_state').empty().append(statesone);

        },
        error: function (edata) {
            $("#snackbarerror").text("OOPS something Went wrong. Please wait 2 Min");
            showiperrtoast();
            event.stopPropagation();
        }
    });
} //get states list fn ends here

//get cities list fn starts here
function getcitieslist(type) {
    $.ajax({
        url: getregp1citiesdata_api + localStorage.selectedstatecode + '/',
        type: 'get',
        success: function (data) {
            //states dyn append
            cityone = "";
            if (data.length != 0) {

                for (var i = 0; i < data.length; i++) {
                    if (type == 0) {
                        if (data[i].name == "Chennai") {
                            cityone += "<option selected='' value='" + data[i].id + "'>" + data[i].name + "</option>";
                        } else {
                            cityone += "<option value='" + data[i].id + "'>" + data[i].name + "</option>";
                        }
                    } else {
                        cityone += "<option value='" + data[i].id + "'>" + data[i].name + "</option>";
                    }
                }
            } else {
                cityone += "<option value='null' selected>No Cities Found</option>";
            }

            $('#rp1_city').empty().append(cityone);
        },
        error: function (edata) {
            $("#snackbarerror").text("OOPS something Went wrong. Please wait 2 Min");
            showiperrtoast();
            event.stopPropagation();
        }
    });
} //get cities list fn ends here

//get sucastes list fn starts here
function getsubcastelist(type) {
    $.ajax({
        url: getregp1subcastedata_api + localStorage.selectedcastecode + '/',
        type: 'get',
        success: function (data) {
            //states dyn append
            subcasteone = "<option value='' selected>Select Your Sub Caste</option>";
            if (data.length != 0) {
                for (var i = 0; i < data.length; i++) {
                    subcasteone += "<option value='" + data[i].id + "'>" + data[i].name + "</option>";

                }
            } else {
                subcasteone += "<option value='null' selected>No Subcaste Found</option>";
            }
            $('#rp1_subcaste').empty().append(subcasteone);
        },
        error: function (edata) {
            $("#snackbarerror").text("OOPS something Went wrong. Please wait 2 Min");
            showiperrtoast();
            event.stopPropagation();
        }
    });
} //get sucastes list fn ends here

//form click fn to hide errors
$(".registerphasebox").click(function () {
    $("input,select,textarea").removeClass("iserror");
    $(".select2-selection__rendered").removeClass("iserror");
});

$("#rp1_aboutus").keyup(function () {
    $(".totalcharacters").text($("#rp1_aboutus").val().length);
});

//Help me write this phase starts here

$(".helpmemodal").click(function () {
    aboutthem = [];
    aboutthierhobbies = [];
    aboutthem.push($(".aboutthemlist .active").text());
    aboutthierhobbies.push($(".aboutthierhobbieslist .active").text());
});

$(".aboutthem").click(function () {

    $(this).find(".descr").toggleClass("active");
    if ($(".aboutthemlist .active").length < 1) {
        $(this).find(".descr").toggleClass("active");
    }
    if ($(".aboutthemlist .active").length > 5) {
        $(this).find(".descr").removeClass("active");
    }

    aboutthem = [];
    for (var i = 0; i < $(".aboutthemlist .active").length; i++) {
        aboutthem.push($(".aboutthemlist .active").eq(i).text());
    }

    // aboutthierhobbies
    if (localStorage.profilecratedforname != "Myself") {
        var genderctgry = (localStorage.gender == "Male") ? "His" : "Her";
        var texttoshow = "My " + localStorage.profilecratedforname + " is very " + aboutthem + " and " + genderctgry + " Hobbies and Interests are " + aboutthierhobbies + " . ";
    } else {
        var texttoshow = "People around me used to tell that am very " + aboutthem + " and my Hobbies and Interests are " + aboutthierhobbies + " . ";
    }

    $("#aboutuscreation").val(texttoshow);
    $("#rp1_aboutus").val(texttoshow);
    $(".totalcharacters").text(texttoshow.length);

});

$(".aboutthierhobbies").click(function () {

    $(this).find(".descr").toggleClass("active");
    if ($(".aboutthierhobbieslist .active").length < 1) {
        $(this).find(".descr").toggleClass("active");
    }
    if ($(".aboutthierhobbieslist .active").length > 5) {
        $(this).find(".descr").removeClass("active");
    }
    aboutthierhobbies = [];
    for (var i = 0; i < $(".aboutthierhobbieslist .active").length; i++) {
        aboutthierhobbies.push($(".aboutthierhobbieslist .active").eq(i).text());
    }

    // aboutthierhobbies
    if (localStorage.profilecratedforname != "Myself") {
        var genderctgry = (localStorage.gender == "Male") ? "His" : "Her";
        var texttoshow = "My " + localStorage.profilecratedforname + " is very " + aboutthem + " and " + genderctgry + " hobbies and interests are " + aboutthierhobbies + " . ";
    } else {
        var texttoshow = "People around me used to tell that am very " + aboutthem + " and my hobbies and interests are " + aboutthierhobbies + " . ";
    }

    $("#aboutuscreation").val(texttoshow);
    $("#rp1_aboutus").val(texttoshow);
    $(".totalcharacters").text(texttoshow.length);

});

$("#rp1_height").change(function () {

    if ($("#rp1_height").val() != "null") {
        var userheight = $("#rp1_height").val().split(".");
        var heightincms = parseInt(((parseInt(userheight[0]) * 12) + parseInt(userheight[1])) * 2.54);
        $("#rp1_heightincms option").removeAttr("selected");
        $("#rp1_heightincms option[value='" + heightincms + "']").attr("selected", "selected");
        $("#select2-rp1_heightincms-container").text(heightincms + " cms");
    } else {
        $("#rp1_heightincms option").removeAttr("selected");
        $("#rp1_heightincms option[value='" + null + "']").attr("selected", "selected");
        $("#select2-rp1_heightincms-container").text("Your Height in cms");
    }

});

$("#rp1_heightincms").change(function () {
    if ($("#rp1_heightincms").val() != "null") {
        var realFeet = ((parseInt($("#rp1_heightincms").val()) * 0.393700) / 12);
        var feet = Math.floor(realFeet);
        var inches = Math.round((realFeet - feet) * 12);
        if (inches.toString().length == 1) {
            var inchescustom = "0" + inches;
        } else {
            var inchescustom = inches;
        }
        var feetandinches = feet + "." + inchescustom;
        $("#rp1_height option").removeAttr("selected");
        $("#rp1_height option[value='" + feetandinches + "']").attr("selected", "selected");
        $("#select2-rp1_height-container").text(feet + "ft " + inchescustom + " in");
    } else {
        $("#rp1_height option").removeAttr("selected");
        $("#rp1_height option[value='" + null + "']").attr("selected", "selected");
        $("#select2-rp1_height-container").text("Select Your Height");
    }

});

//register phase 1 fn starts here
function savereg_phase1() {

    if ($("#rp1_country").val() == '' || $("#rp1_country").val() == null || $("#rp1_country").val() == "null") {
        $("#snackbarerror").text("Country is required");
        $('#select2-rp1_country-container').addClass("iserror");
        $("html, body").animate({
            scrollTop: 300
        }, "slow");
        showiperrtoast();
        event.stopPropagation();
        return;
    }

    if ($("#rp1_state").val() == '' || $("#rp1_state").val() == null || $("#rp1_state").val() == "null") {
        $("#snackbarerror").text("State is required");
        $('#select2-rp1_state-container').addClass("iserror");
        $("html, body").animate({
            scrollTop: 300
        }, "slow");
        showiperrtoast();
        event.stopPropagation();
        return;
    }

    if ($("#rp1_city").val() == '' || $("#rp1_city").val() == null || $("#rp1_city").val() == "null") {
        $("#snackbarerror").text("State is required");
        $('#select2-rp1_city-container').addClass("iserror");
        $("html, body").animate({
            scrollTop: 300
        }, "slow");
        showiperrtoast();
        event.stopPropagation();
        return;
    }

    if ($("#rp1_street").val() == '') {
        $("#snackbarerror").text("Street is required");
        $('#rp1_street').addClass("iserror");
        $("html, body").animate({
            scrollTop: 300
        }, "slow");
        showiperrtoast();
        event.stopPropagation();
        return;
    }

    if ($("#rp1_area").val() == '') {
        $("#snackbarerror").text("Area is required");
        $('#rp1_area').addClass("iserror");
        $("html, body").animate({
            scrollTop: 300
        }, "slow");
        showiperrtoast();
        event.stopPropagation();
        return;
    }

    if ($("#rp1_caste").val() == '' || $("#rp1_caste").val() == null || $("#rp1_caste").val() == "null") {
        $("#snackbarerror").text("Caste is required");
        $('#select2-rp1_caste-container').addClass("iserror");
        $("html, body").animate({
            scrollTop: 350
        }, "slow");
        showiperrtoast();
        event.stopPropagation();
        return;
    }

    if ($('[name="dosham_choice"]:checked').val() == "Yes" && $('input[name="dosham"]:checked').length == 0) {
        $("#snackbarerror").text("Dosham Choices is required");
        showiperrtoast();
        event.stopPropagation();
        return;
    }
    if ($('input[name="maritalstatus"]:checked').length == 0) {
        $("#snackbarerror").text("Marital Status is required");
        $("html, body").animate({
            scrollTop: 650
        }, "slow");
        showiperrtoast();
        event.stopPropagation();
        return;
    }
    if ($("#rp1_height").val() == 'null') {
        $("#snackbarerror").text("Height is required");
        $('#select2-rp1_height-container').addClass("iserror");
        $("html, body").animate({
            scrollTop: 650
        }, "slow");
        showiperrtoast();
        event.stopPropagation();
        return;
    }
    if ($('input[name="familystatus"]:checked').length == 0) {
        $("#snackbarerror").text("Family Status is required");
        $("html, body").animate({
            scrollTop: 700
        }, "slow");
        showiperrtoast();
        event.stopPropagation();
        return;
    }
    if ($('#rp6_mothertongue').val().length == 0) {
        $("#snackbarerror").text("Spoken Languages Required");
        $("html, body").animate({
            scrollTop: 700
        }, "slow");
        showiperrtoast();
        event.stopPropagation();
        return;
    }

    if ($("#rp1_education").val() == '' || $("#rp1_education").val() == null || $("#rp1_education").val() == "null") {
        $("#snackbarerror").text("Highest Education is required");
        $('#select2-rp1_education-container').addClass("iserror");
        showiperrtoast();
        event.stopPropagation();
        return;
    }

    if ($('input[name="employedin"]:checked').length == 0) {
        $("#snackbarerror").text("Employed In is required");
        showiperrtoast();
        event.stopPropagation();
        return;
    }

    if ($("#rp1_occupation").val() == '' || $("#rp1_occupation").val() == null || $("#rp1_occupation").val() == "null") {
        $("#snackbarerror").text("Occupation is required");
        $('#select2-rp1_occupation-container').addClass("iserror");
        showiperrtoast();
        event.stopPropagation();
        return;
    }
    if ($("#rp1_currency").val() == '' || $("#rp1_currency").val() == null || $("#rp1_currency").val() == "null") {
        $("#snackbarerror").text("Currency Type is required");
        $('#select2-rp1_currency-container').addClass("iserror");
        showiperrtoast();
        event.stopPropagation();
        return;
    }
    if ($("#rp1_income").val() == '' || $("#rp1_income").val() == null || $("#rp1_income").val() == "null") {
        $("#snackbarerror").text("Income is required");
        $('#rp1_income').addClass("iserror");
        showiperrtoast();
        event.stopPropagation();
        return;
    }
    if ($("#rp1_aboutus").val() == '') {
        $("#snackbarerror").text("About Us is required");
        $('#rp1_aboutus').addClass("iserror");
        showiperrtoast();
        event.stopPropagation();
        return;
    }

    $(".loadericon").show();
    $(".saveBtn").attr("disabled", true);

    var dosham_choicetosend = 0;
    dohsamchoices = [];
    if ($('[name="dosham_choice"]:checked').val() == "Yes") {
        for (var i = 0; i < $('input[name="dosham"]:checked').length; i++) {
            dohsamchoices.push({
                "dosham": $('input[name="dosham"]:checked').eq(i).attr("attrval")
            });
        }
    } else {
        var dosham_choicetosend = 0;
        dohsamchoices = [];
    }

    if ($('[name="maritalstatus"]:checked').val() != "1") {
        var noofchildren_tosend = $('input[name="noofchildrens"]:checked').val();
    } else {
        var noofchildren_tosend = 0;
    }

    spoken_languages = []
    $("#rp6_mothertongue").val().forEach(element => {
        spoken_languages.push({
            "language": element
        });

    });


    var Datatosend = {
        user_address: {
            "street": $("#rp1_street").val(),
            "area": $("#rp1_area").val(),
            "city": $("#rp1_city").val(),
            "zipcode": $("#rp1_zipcode").val()
        },
        user_religion_details: {
            "caste": $("#rp1_caste").val(),
            "subcaste": $("#rp1_subcaste").val(),
            "gothram": $("#rp1_gothram").val(),
            "dosham_choices": $('[name="dosham_choice"]:checked').val()
        },
        user_dosham: dohsamchoices,
        user_personal_details: {
            "marital_status": $('[name="maritalstatus"]:checked').val(),
            "number_of_children": noofchildren_tosend,
            "height": parseFloat($("#rp1_height").val()),
            "family_status": $('[name="familystatus"]:checked').val(),
            "is_physically_challenged": $('[name="anydisability"]:checked').val()
        },
        user_professional_details: {
            "highest_education": $("#rp1_education").val(),
            "employed_in": $('input[name="employedin"]:checked').val(),
            "occupation": $("#rp1_occupation").val(),
            "currency": $("#rp1_currency").val(),
            "annual_income": $("#rp1_income").val().replace(/,/g, "")
        },
        about_me: {
            "about": $("#rp1_aboutus").val()
        },
        "spoken_languages": spoken_languages
    };

    if ($("#rp1_gothram").val() == "") {
        delete Datatosend.user_religion_details.gothram;
    }
    if ($("#rp1_subcaste").val() == null || $("#rp1_subcaste").val() == "null") {
        delete Datatosend.user_religion_details.subcaste;
    }
    if (dosham_choicetosend == 0) {
        delete Datatosend.user_religion_details.dosham_choices;
    }

    if (noofchildren_tosend == 0) {
        delete Datatosend.user_personal_details.number_of_children;
    }

    var postData = JSON.stringify(Datatosend);

    $.ajax({
        url: sendrp1data_api,
        type: 'POST',
        data: postData,
        headers: {
            "content-type": 'application/json',
            "Authorization": 'Token ' + localStorage.wutkn + ''
        },
        success: function (data) {
            $(".saveBtn").attr("disabled", false);
            $('.loadericon').hide();
        },
        error: function (data) {

            $(".saveBtn").attr("disabled", false);
            $('.loadericon').hide();

            var errtext = "";
            if ((data.responseText = undefined) || (data.responseText = "undefined")) {
                for (var key in JSON.parse(data.responseText)) {
                    errtext = JSON.parse(data.responseText)[key][0];
                }
                $("#snackbarerror").text(errtext);
            } else {
                $("#snackbarerror").text("We found some error in your givern data.Please cross verify and save again");
            }

            showerrtoast();

        }
    }).done(function (dataJson) {
        window.location.replace("register-phase2.html");
    });

} //register phase 1 fn end here
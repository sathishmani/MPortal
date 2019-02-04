var maritalstatus = [];
var showprofile = [];
var dontshowprofile = [];

var sendData = {};
var postData = "";

$(function () {

    $(".loadericon").hide();

    if (localStorage.regular_search_data == undefined) {
        getregularsearch();
    } else {
        var currentdate = new Date().getDate();
        if (currentdate != localStorage.datastoredsearch_regular) {
            localStorage.removeItem("regular_search_data");
            getregularsearch();
        } else {
            getregularsearchfromlocal(1); //this fn can happen 
        }
    }

}); //initial fn ends here

// get search data fn starts here
function getregularsearch() {

    $.ajax({
        url: regularsearch_dd_api,
        type: 'get',
        headers: {
            "content-type": 'application/json',
            "Authorization": 'Token ' + localStorage.wutkn + ''
        },
        success: function (data) {

            localStorage.regular_search_data = JSON.stringify(data);
            localStorage.datastoredsearch_regular = new Date().getDate();

            getregularsearchfromlocal(0); //this fn is common for all
        },
        error: function (edata) {
            console.log("error occured in get search data");
        }
    });

} // get search data fn ends here

// localstorage data processing

function getregularsearchfromlocal(type) {

    var data = JSON.parse(localStorage.regular_search_data);

    //religion , mother tongue data - dyn , caste dyn 
    $("#sr_religion").empty();
    for (var i = 0; i < data.religion.length; i++) {
        $("#sr_religion").append("<option value='" + data.religion[i].id + "'>" + data.religion[i].name + "</option>");
    }

    $("#sr_mothertongue").empty();
    for (var i = 0; i < data.mother_tongue.length; i++) {
        $("#sr_mothertongue").append("<option value='" + data.mother_tongue[i].id + "' attrname='" + data.mother_tongue[i].name + "'>" + data.mother_tongue[i].name + "</option>");
    }
    // $('#sr_mothertongue option[attrname="Tamil"]').attr("selected", true);


    $("#sr_caste").empty().append('<option value="null">Select Caste</option>');
    for (var i = 0; i < data.caste.length; i++) {
        if (data.caste[i].religion == 1) {
            $("#sr_caste").append("<option data-casteid='" + data.caste[i].id + "' value='" + data.caste[i].name + "'>" + data.caste[i].name + "</option>");
        }
    }

    $("#sr_religion").change(function () {
        $("#sr_caste").empty().append('<option value="null">Select Caste</option>');
        for (var i = 0; i < data.caste.length; i++) {
            if (data.caste[i].religion == $(this).val()) {
                $("#sr_caste").append("<option value='" + data.caste[i].name + "'>" + data.caste[i].name + "</option>");
            }
        }
    });

    //load for country,state,city
    $("#sr_country").empty();
    for (var i = 0; i < data.country.length; i++) {
        $("#sr_country").append("<option value='" + data.country[i].id + "' attrname='" + data.country[i].name + "'>" + data.country[i].name + "</option>");
    }

    doshamsection(data.dosham);


    $('#sr_country option[attrname="India"]').attr("selected", true);
    localStorage.selectedcountrycode = $('#sr_country option[attrname="India"]').attr("value");
    getstateslist(0);


    //education dyn
    $('#sr_education').empty();
    for (var i = 0; i < data.education.length; i++) {
        $('#sr_education').append("<optgroup class='a sr_educationsubmenu" + data.education[i].id + "' label='" + data.education[i].name + "'></optgroup>");
        for (var j = 0; j < data.education[i].branch.length; j++) {
            $(".sr_educationsubmenu" + data.education[i].id).append("<option value='" + data.education[i].branch[j].id + "'>" + data.education[i].branch[j].name + "</option>");
        }
    }

}


function doshamsection(dosham) {
    for (var i = 0; i < dosham.length; i++) {
        $(".dynamicdoshamyes").append("<label class='control control--checkbox displayinline doshacheckbox'>" + dosham[i].name + "<input type='checkbox' name='dosham' attrval='" + dosham[i].id + "' /><div class='control__indicator'></div></label>")
    }
}


$("#sr_country").change(function () {
    localStorage.selectedcountrycode = $("#sr_country").val();
    getstateslist(1);
});

$("#sr_state").change(function () {
    localStorage.selectedstatecode = $("#sr_state").val();
    getcitieslist(1);
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

                $('#sr_city').empty().append("<option value='null' selected>Select District</option>");

            } else {
                statesone += "<option value='null' selected>No States Found</option>";
                $('#sr_city').empty().append("<option value='null' selected>No Cities Found</option>");
            }
            $('#sr_state').empty().append(statesone);

        },
        error: function (edata) {
            console.log("error occured in get register phase 1 states dd data");
            // $('#rp1_state').empty().append("<option value='null'>Choose State</option>");
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
            cityone = "<option value='null'>Select District</option>";
            if (data.length != 0) {

                for (var i = 0; i < data.length; i++) {
                    if (type == 0) {
                        cityone += "<option value='" + data[i].id + "'>" + data[i].name + "</option>";
                    } else {
                        cityone += "<option value='" + data[i].id + "'>" + data[i].name + "</option>";
                    }
                }
            } else {
                cityone += "<option value='null' selected>No Cities Found</option>";
            }

            $('#sr_city').empty().append(cityone);
        },
        error: function (edata) {
            console.log("error occured in get register phase 1 cities dd data");
            // $('#rp1_city').empty().append("<option value='null'>Choose City</option>");
        }
    });
} //get cities list fn ends here


// =========================================================================================================

function searchregular() {

    maritalstatus = [];
    sendData = {};
    postData = "";


    if ($("#sr_startage").val() == $("#sr_endage").val()) {
        $("#snackbarerror").text("Start age and End age should not be same");
        $("html, body").animate({
            scrollTop: 100
        }, "slow");
        showiperrtoast();
        event.stopPropagation();
        return;
    }

    if ($("#sr_endage").val() < $("#sr_startage").val()) {
        $("#snackbarerror").text("End Age Should be higher than Start Age");
        $("html, body").animate({
            scrollTop: 100
        }, "slow");
        $('#select2-ep7_pendage-container').addClass("iserror");
        showiperrtoast();
        event.stopPropagation();
        return;
    }

    if ($("#sr_startheight").val() == $("#sr_endheight").val()) {
        $("#snackbarerror").text("Start height and End height should not be same");
        $("html, body").animate({
            scrollTop: 100
        }, "slow");
        showiperrtoast();
        event.stopPropagation();
        return;
    }

    //Data to be send
    sendData.userdetails__age__gte = $("#sr_startage").val();
    sendData.userdetails__age__lte = $("#sr_endage").val();
    sendData.user_personal_details__height__gte = $("#sr_startheight").val();
    sendData.user_personal_details__height__lte = $("#sr_endheight").val();
    sendData.user_religion_details__dosham_choices = $('input[name="dosham_choice"]:checked').val();

    dohsamchoices = [];
    if ($('input[name="dosham_choice"]:checked').val() == "Yes") {
        for (var i = 0; i < $('input[name="dosham"]:checked').length; i++) {
            dohsamchoices.push(parseInt($('input[name="dosham"]:checked').eq(i).attr("attrval")));
        }
    }
    sendData.user_dosham__dosham__in = dohsamchoices;

    if ($('[name="sr_martialstatus"]:checked').length != 0) {
        for (var i = 0; i < $('[name="sr_martialstatus"]:checked').length; i++) {
            maritalstatus.push($('[name="sr_martialstatus"]:checked').eq(i).val());
        }
        sendData.user_personal_details__marital_status__in = maritalstatus;
    }

    if ($("#sr_religion").val() != "null") {
        sendData.userdetails__religion = $("#sr_religion").val();
    }

    if ($("#sr_mothertongue").val().length != 0) {
        sendData.userdetails__mother_tongue__in = $("#sr_mothertongue").val();
    }

    if ($("#sr_caste").val() != "null") {
        sendData.user_religion_details__caste__name__icontains = $("#sr_caste").val();
    }
    if ($("#sr_state").val() != "null") {
        sendData.user_address__city__state = $("#sr_state").val();
    }

    if ($("#sr_city").val() != "null") {
        sendData.user_address__city = $("#sr_city").val();
    }

    if ($("#sr_education").val().length != 0) {
        sendData.user_professional_details__highest_education__in = $("#sr_education").val();
    }

    if ($(".showprofiletype1").is(":checked") == true) {
        sendData.with_photo = "";
    }

    if ($(".dontshow1").is(":checked") == true) {
        sendData.ignored_profiles = "";
    }

    if ($(".dontshow2").is(":checked") == true) {
        sendData.viewed_profiles = "";
    }

    if ($(".dontshow3").is(":checked") == true) {
        sendData.shortlisted_profiles = "";
    }

    var searchkeys = {};
    for (var keys in sendData) {
        sendData[keys] ? searchkeys[keys] = sendData[keys] : '';
    }

    postData = JSON.stringify(searchkeys);
    sessionStorage.searchdata = JSON.stringify(searchkeys);
    sessionStorage.searchtype = 20;

    $('.loadericon').show();
    $(".updateBtn").attr("disabled", true);

    getsearchmaincontent();


}

//function main content fn starts here
function getsearchmaincontent() {

    $.ajax({
        url: searchmaincntnt_api,
        type: 'POST',
        data: postData,
        headers: {
            "content-type": 'application/json',
            "Authorization": 'Token ' + localStorage.wutkn + ''
        },
        success: function (data) { },
        error: function (edata) {
            // alert("error1");
            console.log("error occured in loading data for the search - main");
            $('.loadericon').hide();
            $(".updateBtn").attr("disabled", false);
            $("#snackbarerror").text("No profile available.Please search different fields!");
            showerrtoast();
        }
    }).done(function (dataJson) {
        // alert("success1");
        sessionStorage.searchresults_maindata = JSON.stringify(dataJson);
        getsearchsidecontent();
    });

}

//function side content fn starts here
function getsearchsidecontent() {

    $.ajax({
        url: searchsidecntnt_api,
        type: 'POST',
        data: postData,
        headers: {
            "content-type": 'application/json',
            "Authorization": 'Token ' + localStorage.wutkn + ''
        },
        success: function (data) { },
        error: function (edata) {
            // alert("error2");
            console.log("error occured in loading data for the search - side");
            $('.loadericon').hide();
            $(".updateBtn").attr("disabled", false);
            $("#snackbarerror").text("No profile available.Please search different fields!");
            showerrtoast();
        }
    }).done(function (dataJson) {
        // alert("success2");
        sessionStorage.searchresults_sidedata = JSON.stringify(dataJson);
        $('.loadericon').hide();
        $(".updateBtn").attr("disabled", false);
        sessionStorage.comingfromsearch = 1;
        window.location.href = "search-results.html";
    });

}
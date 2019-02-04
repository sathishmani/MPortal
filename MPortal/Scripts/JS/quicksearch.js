var maritalstatus = [];
var showprofile = [];
var dontshowprofile = [];

var sendData = {};
var postData = "";

$(function() {

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
        success: function(data) {

            localStorage.regular_search_data = JSON.stringify(data);
            localStorage.datastoredsearch_regular = new Date().getDate();

            getregularsearchfromlocal(0); //this fn is common for all
        },
        error: function(edata) {
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
        if(data.caste[i].religion == 1){
            $("#sr_caste").append("<option data-casteid='" + data.caste[i].id  +"' value='" + data.caste[i].name + "'>" + data.caste[i].name + "</option>");
        }
    }

    $("#sr_religion").change(function(){
        $("#sr_caste").empty().append('<option value="null">Select Caste</option>');
        for (var i = 0; i < data.caste.length; i++) {
            if(data.caste[i].religion == $(this).val()){
                $("#sr_caste").append("<option value='" + data.caste[i].name + "'>" + data.caste[i].name + "</option>");
            }
        }
    });
}


// =========================================================================================================

function searchregular() {

    maritalstatus = [];
    sendData = {};
    postData = "";


    if ($("#sr_startage").val() == $("#sr_endage").val()) {
        $("#snackbarerror").text("Start age and End age should not be same");
        $("html, body").animate({ scrollTop: 100 }, "slow");
        showiperrtoast();
        event.stopPropagation();
        return;
    }

    if ($("#sr_endage").val() < $("#sr_startage").val()) {
        $("#snackbarerror").text("End Age Should be higher than Start Age");
        $("html, body").animate({ scrollTop: 100 }, "slow");
        $('#select2-ep7_pendage-container').addClass("iserror");
        showiperrtoast();
        event.stopPropagation();
        return;
    }

    //Data to be send
    sendData.userdetails__age__gte = $("#sr_startage").val();
    sendData.userdetails__age__lte = $("#sr_endage").val();

    if ($("#sr_religion").val() != "null") {
        sendData.userdetails__religion = $("#sr_religion").val();
    }

    if ($("#sr_mothertongue").val().length != 0) {
        sendData.userdetails__mother_tongue__in = $("#sr_mothertongue").val();
    }

    if ($("#sr_caste").val() != "null") {
        sendData.user_religion_details__caste__name__icontains = $("#sr_caste").val();
    }

    var searchkeys = {};
    for( var keys in sendData){
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
        success: function(data) {},
        error: function(edata) {
            // alert("error1");
            console.log("error occured in loading data for the search - main");
            $('.loadericon').hide();
            $(".updateBtn").attr("disabled", false);
            $("#snackbarerror").text("No profile available.Please search different fields!");
            showerrtoast();
        }
    }).done(function(dataJson) {
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
        success: function(data) {},
        error: function(edata) {
            // alert("error2");
            console.log("error occured in loading data for the search - side");
            $('.loadericon').hide();
            $(".updateBtn").attr("disabled", false);
            $("#snackbarerror").text("No profile available.Please search different fields!");
            showerrtoast();
        }
    }).done(function(dataJson) {
        // alert("success2");
        sessionStorage.searchresults_sidedata = JSON.stringify(dataJson);
        $('.loadericon').hide();
        $(".updateBtn").attr("disabled", false);
        sessionStorage.comingfromsearch = 1;
        window.location.href = "search-results.html";
    });

}


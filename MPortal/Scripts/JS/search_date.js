$(function () {
    $('.loadericon').hide();
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!
    var yyyy = today.getFullYear();

    $('#searchDateFrom').bootstrapMaterialDatePicker({
        time: false,
        clearButton: true,
        maxDate: yyyy + '/' + mm + '/' + dd + '/',
        minDate: yyyy - 2 + '/' + mm + '/' + dd + '/',
    }).on('change', function (e, date) {
        $('#searchDateTo').bootstrapMaterialDatePicker('setMinDate', date);
    });
    $('#searchDateTo').bootstrapMaterialDatePicker({
        time: false,
        clearButton: true,
        minDate: yyyy - 2 + '/' + mm + '/' + dd + '/',
        maxDate: yyyy + '/' + mm + '/' + dd + '/',
    });

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
});

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


function getregularsearchfromlocal(type) {

    var data = JSON.parse(localStorage.regular_search_data);

    $("#sr_religion").empty().append('<option value="null">Select Religion</option>');;
    for (var i = 0; i < data.religion.length; i++) {
        $("#sr_religion").append("<option value='" + data.religion[i].id + "'>" + data.religion[i].name + "</option>");
    }

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
}


function searchregular() {

    sendData = {};
    postData = "";
    if ($('#searchDateFrom').val() && !$('#searchDateTo').val()) {
        $("#snackbarerror").text("Please Select Date");
        showiperrtoast();
        event.stopPropagation();
        return;
    }

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

    //Data to be send
    sendData.userdetails__age__gte = $("#sr_startage").val();
    sendData.userdetails__age__lte = $("#sr_endage").val();
    sendData.date_joined__from = $("#searchDateFrom").val();
    sendData.date_joined__to = $("#searchDateTo").val();

    if ($("#sr_religion").val() != "null") {
        sendData.userdetails__religion = $("#sr_religion").val();
    }

    if ($("#sr_caste").val() != "null") {
        sendData.user_religion_details__caste__name__icontains = $("#sr_caste").val();
    }

    var searchkeys = {};
    for (var keys in sendData) {
        sendData[keys] ? searchkeys[keys] = sendData[keys] : '';
    }

    postData = JSON.stringify(searchkeys);

    sessionStorage.searchdata = JSON.stringify(searchkeys);
    sessionStorage.searchtype = 20;

    $('.loadericon').show();

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
        success: function (dataJson) {
            sessionStorage.searchresults_maindata = JSON.stringify(dataJson);
            getsearchsidecontent();
        },
        error: function (edata) {
            $('.loadericon').hide();
            $(".updateBtn").attr("disabled", false);
            $("#snackbarerror").text("Sorry. we're having some technical issues");
            showerrtoast();
        }
    })

}

function getsearchsidecontent() {

    $.ajax({
        url: searchsidecntnt_api,
        type: 'POST',
        data: postData,
        headers: {
            "content-type": 'application/json',
            "Authorization": 'Token ' + localStorage.wutkn + ''
        },
        success: function (dataJson) {
            sessionStorage.searchresults_sidedata = JSON.stringify(dataJson);
            $('.loadericon').hide();
            $(".updateBtn").attr("disabled", false);
            sessionStorage.comingfromsearch = 1;
            window.location.href = "search-results.html";
        },
        error: function (edata) {
            $('.loadericon').hide();
            $("#snackbarerror").text("Sorry. we're having some technical issues");
            showerrtoast();
        }
    })

}
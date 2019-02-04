var aboutthem = [];
var aboutthierhobbies = [];
var maritalstatus = [];
$(function () {

    if (localStorage.registerphase5data == undefined) {
        getregphase6data();
    } else {
        var currentdate = new Date().getDate();
        if (currentdate != localStorage.datastoreddate_rp6) {
            localStorage.removeItem("registerphase1data");
            getregphase6data();
        } else {
            getregp6datafromlocal(1); //this fn can happen 
        }
    }

    $(".loadericon").hide();

    $("#rp6_endage").change(function () {
        if ($("#rp6_endage").val() < $("#rp6_stage").val()) {
            $("#snackbarerror").text("End Age Should be higher than Start Age");
            $('#select2-rp6_endage-container').addClass("iserror");
            showiperrtoast();
            event.stopPropagation();
            return;
        }
    });

}); //initiative fn ends here


function doshamsection(dosham) {
    for (var i = 0; i < dosham.length; i++) {
        if (i == 0) {
            $(".dynamicdoshamyes").append("<label class='control control--checkbox displayinline doshacheckbox'>" + dosham[i].name + "<input type='checkbox' name='dosham' checked='' attrval='" + dosham[i].id + "' /><div class='control__indicator'></div></label>");

        } else {
            $(".dynamicdoshamyes").append("<label class='control control--checkbox displayinline doshacheckbox'>" + dosham[i].name + "<input type='checkbox' name='dosham' attrval='" + dosham[i].id + "' /><div class='control__indicator'></div></label>")
        }
    }
}

//get register phase 6 data from server
function getregphase6data() {

    $.ajax({
        url: getregp6data_api,
        type: 'get',
        success: function (data) {
            localStorage.registerphase6data = JSON.stringify(data);
            localStorage.datastoreddate_rp6 = new Date().getDate();

            getregp6datafromlocal(0); //this fn is common for all
        },
        error: function (edata) {
            console.log("error occured in get register phase 6 dd data");
        }
    });

} //get register phase 1 data from server

//get phase six details from local
function getregp6datafromlocal(type) {

    var data = JSON.parse(localStorage.registerphase6data);

    //religion dyn loading
    $("#rp6_religion").empty();
    for (var i = 0; i < data.religion.length; i++) {       
        $("#rp6_religion").append("<option value='" + data.religion[i].id + "'>" + data.religion[i].name + "</option>");
    }

    //mother tongue dyn loading
    $("#rp6_mothertongue").empty();
    for (var i = 0; i < data.mother_tongue.length; i++) {
        $("#rp6_mothertongue").append("<option value='" + data.mother_tongue[i].id + "'>" + data.mother_tongue[i].name + "</option>");
    }
    doshamsection(data.dosham);
    
    //caste dyn loading
    $("#rp6_caste").empty().append('<option value="null">Select Your Caste</option>');
    for (var i = 0; i < data.caste.length; i++) {
        $("#rp6_caste").append("<option value='" + data.caste[i].id + "'>" + data.caste[i].name + "</option>");
    }
    
    //star dyn loading
    $("#rp6_star").empty();
    for (var i = 0; i < data.star.length; i++) {
        $("#rp6_star").append("<option value='" + data.star[i].id + "'>" + data.star[i].name + "</option>");
    }

    //country,citizenship dyn loading
    $("#rp6_country,#rp6_citizenship").empty();
    for (var i = 0; i < data.country.length; i++) {
        $("#rp6_country,#rp6_citizenship").append("<option value='" + data.country[i].id + "'>" + data.country[i].name + "</option>");
    }
    
    //education dyn loading
    $('#rp6_education').empty();
    for (var i = 0; i < data.education.length; i++) {
        $('#rp6_education').append("<optgroup class='a educationsubmenu" + data.education[i].id + "' label='" + data.education[i].name + "'></optgroup>");
        for (var j = 0; j < data.education[i].branch.length; j++) {
            $(".educationsubmenu" + data.education[i].id).append("<option value='" + data.education[i].branch[j].id + "'>" + data.education[i].branch[j].name + "</option>");
        }
    }

    //occupation dyn append
    $('#rp6_occupation').empty();
    for (var i = 0; i < data.occupation.length; i++) {
        $('#rp6_occupation').append("<optgroup class='a occupationsubmenu" + data.occupation[i].id + "' label='" + data.occupation[i].name + "'></optgroup>");
        for (var j = 0; j < data.occupation[i].occupation.length; j++) {
            $(".occupationsubmenu" + data.occupation[i].id).append("<option value='" + data.occupation[i].occupation[j].id + "'>" + data.occupation[i].occupation[j].name + "</option>");
        }
    }

    //income dyn loading
    $("#rp6_incomeincurrency").empty().append('<option value="null">Select Your Income Type</option>');
    for (var i = 0; i < data.currency.length; i++) {
        $("#rp6_incomeincurrency").append("<option value='" + data.currency[i].id + "'>" + data.currency[i].name + "</option>");
    }
    $('#rp6_incomeincurrency option[value="98"]').attr("selected", true);
    
} //get phase six details from local

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
    if (localStorage.gender == "Male") {
        var texttoshow = "I want to marry a girl who is very " + aboutthem + " and her Hobbies and Interests are " + aboutthierhobbies + " . ";
    } else {
        var texttoshow = "I want to marry a boy who is very " + aboutthem + " and his Hobbies and Interests are " + aboutthierhobbies + " . ";
    }

    $("#aboutuscreation").val(texttoshow);
    $("#rp6_aboutus").val(texttoshow);
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
    if (localStorage.gender == "Male") {
        var texttoshow = "I want to marry a girl who is very " + aboutthem + " and her Hobbies and Interests are " + aboutthierhobbies + " . ";
    } else {
        var texttoshow = "I want to marry a boy who is very " + aboutthem + " and his Hobbies and Interests are " + aboutthierhobbies + " . ";
    }

    $("#aboutuscreation").val(texttoshow);
    $("#rp6_aboutus").val(texttoshow);
    $(".totalcharacters").text(texttoshow.length);

});

$("#rp6_aboutus").keyup(function () {
    $(".totalcharacters").text($("#rp6_aboutus").val().length);
});

$(".registerphasebox").click(function () {
    $("input,select,textarea").removeClass("iserror");
    $(".select2-selection__rendered").removeClass("iserror");
});

//register phase 6 fn starts here
function savereg_phase6() {


    //start age and end age - validation
    if ($("#rp6_stage").val() == "null") {
        $("#snackbarerror").text("Start Age is required");
        $('#select2-rp6_stage-container').addClass("iserror");
        $("html, body").animate({
            scrollTop: 300
        }, "slow");
        showiperrtoast();
        event.stopPropagation();
        return;
    }
    if ($("#rp6_endage").val() == "null") {
        $("#snackbarerror").text("End Age is required");
        $('#select2-rp6_endage-container').addClass("iserror");
        $("html, body").animate({
            scrollTop: 300
        }, "slow");
        showiperrtoast();
        event.stopPropagation();
        return;
    }
    if (parseFloat($("#rp6_stage").val()) == parseFloat($("#rp6_endage").val())) {
        $("#snackbarerror").text("Age start and end should not be same");
        $("html, body").animate({
            scrollTop: 300
        }, "slow");
        showiperrtoast();
        event.stopPropagation();
        return;
    }
    if (parseFloat($("#rp6_endage").val()) < parseFloat($("#rp6_stage").val())) {
        $("#snackbarerror").text("End Age Should be higher than Start Age");
        $("html, body").animate({
            scrollTop: 300
        }, "slow");
        $('#select2-rp6_endage-container').addClass("iserror");
        showiperrtoast();
        event.stopPropagation();
        return;
    }

    //height validation
    if ($("#rp6_stheight").val() == "null") {
        $("#snackbarerror").text("Start Height is required");
        $('#select2-rp6_stheight-container').addClass("iserror");
        $("html, body").animate({
            scrollTop: 300
        }, "slow");
        showiperrtoast();
        event.stopPropagation();
        return;
    }
    if ($("#rp6_endheight").val() == "null") {
        $("#snackbarerror").text("End Height is required");
        $('#select2-rp6_endheight-container').addClass("iserror");
        $("html, body").animate({
            scrollTop: 300
        }, "slow");
        showiperrtoast();
        event.stopPropagation();
        return;
    }
    if (parseFloat($("#rp6_stheight").val()) == parseFloat($("#rp6_endheight").val())) {
        $("#snackbarerror").text("Height start and end should not be same");
        $("html, body").animate({
            scrollTop: 300
        }, "slow");
        showiperrtoast();
        event.stopPropagation();
        return;
    }
    if (parseFloat($("#rp6_endheight").val()) < parseFloat($("#rp6_stheight").val())) {
        $("#snackbarerror").text("End height Should be higher than Start height");
        $("html, body").animate({
            scrollTop: 300
        }, "slow");
        $('#select2-rp6_endheight-container').addClass("iserror");
        showiperrtoast();
        event.stopPropagation();
        return;
    }

    //weight validation
    if ($("#rp6_stweight").val() == "null") {
        $("#snackbarerror").text("Start Weight is required");
        $('#select2-rp6_stweight-container').addClass("iserror");
        $("html, body").animate({
            scrollTop: 300
        }, "slow");
        showiperrtoast();
        event.stopPropagation();
        return;
    }
    if ($("#rp6_endweight").val() == "null") {
        $("#snackbarerror").text("End Weight is required");
        $('#select2-rp6_endweight-container').addClass("iserror");
        $("html, body").animate({
            scrollTop: 300
        }, "slow");
        showiperrtoast();
        event.stopPropagation();
        return;
    }
    if (parseFloat($("#rp6_stweight").val()) == parseFloat($("#rp6_endweight").val())) {
        $("#snackbarerror").text("Weight start and end should not be same");
        $("html, body").animate({
            scrollTop: 300
        }, "slow");
        showiperrtoast();
        event.stopPropagation();
        return;
    }
    if (parseFloat($("#rp6_endweight").val()) < parseFloat($("#rp6_stweight").val())) {
        $("#snackbarerror").text("End Weight Should be higher than Start Weight");
        $("html, body").animate({
            scrollTop: 300
        }, "slow");
        $('#select2-rp6_endweight-container').addClass("iserror");
        showiperrtoast();
        event.stopPropagation();
        return;
    }
    //marital status
    if ($('input[name="maritalstatus"]:checked').length == 0) {
        $("#snackbarerror").text("Marital Status is required");
        $("html, body").animate({
            scrollTop: 450
        }, "slow");
        showiperrtoast();
        event.stopPropagation();
        return;
    }
    //physical status , eating habits , drinking habits , smoking habits
    if ($('input[name="physicalstatus"]:checked').length == 0) {
        $("#snackbarerror").text("Physical Status is required");
        $("html, body").animate({
            scrollTop: 450
        }, "slow");
        showiperrtoast();
        event.stopPropagation();
        return;
    }

    if ($('input[name="drinkinghabits"]:checked').length == 0) {
        $("#snackbarerror").text("Drinking Habits is required");
        $("html, body").animate({
            scrollTop: 450
        }, "slow");
        showiperrtoast();
        event.stopPropagation();
        return;
    }

    if ($('input[name="smokinghabits"]:checked').length == 0) {
        $("#snackbarerror").text("Smoking Habits is required");
        $("html, body").animate({
            scrollTop: 450
        }, "slow");
        showiperrtoast();
        event.stopPropagation();
        return;
    }

    //religion , mother tongue , caste , star , manglik
    if ($("#rp6_religion").val().length == 0) {
        $("#snackbarerror").text("Religion is required");
        $("html, body").animate({
            scrollTop: 600
        }, "slow");
        showiperrtoast();
        event.stopPropagation();
        return;
    }
    if ($("#rp6_mothertongue").val().length == 0) {
        $("#snackbarerror").text("Mother Tongue is required");
        $("html, body").animate({
            scrollTop: 600
        }, "slow");
        showiperrtoast();
        event.stopPropagation();
        return;
    }
    if ($("#rp6_caste").val() == '' || $("#rp6_caste").val() == null || $("#rp6_caste").val() == "null") {
        $("#snackbarerror").text("Caste is required");
        $('#select2-rp6_caste-container').addClass("iserror");
        $("html, body").animate({
            scrollTop: 600
        }, "slow");
        showiperrtoast();
        event.stopPropagation();
        return;
    }

    if ($('[name="is_other_communities"]:checked').val() == undefined) {
        $("#snackbarerror").text("Complete Other Communities option is required");
        $("html, body").animate({
            scrollTop: 630
        }, "slow");
        showiperrtoast();
        event.stopPropagation();
        return;

    }

    if ($("#rp6_star").val().length == 0) {
        $("#snackbarerror").text("Star is required");
        $("html, body").animate({
            scrollTop: 650
        }, "slow");
        showiperrtoast();
        event.stopPropagation();
        return;
    }
    if ($('input[name="ismanglik"]:checked').val() == 0) {
        $("#snackbarerror").text("Manglik is required");
        $("html, body").animate({
            scrollTop: 650
        }, "slow");
        showiperrtoast();
        event.stopPropagation();
        return;
    }

    //country and citizenship validation
    if ($("#rp6_country").val().length == 0) {
        $("#snackbarerror").text("Country is required");
        $("html, body").animate({
            scrollTop: 900
        }, "slow");
        showiperrtoast();
        event.stopPropagation();
        return;
    }
    if ($("#rp6_citizenship").val().length == 0) {
        $("#snackbarerror").text("Citizenship is required");
        $("html, body").animate({
            scrollTop: 900
        }, "slow");
        showiperrtoast();
        event.stopPropagation();
        return;
    }

    //education , occupation
    if ($("#rp6_education").val().length == 0) {
        $("#snackbarerror").text("Education is required");
        showiperrtoast();
        event.stopPropagation();
        return;
    }
    if ($("#rp6_occupation").val().length == 0) {
        $("#snackbarerror").text("Occupation is required");
        showiperrtoast();
        event.stopPropagation();
        return;
    }
    if ($("#rp6_incomeincurrency").val() == '' || $("#rp6_incomeincurrency").val() == null || $("#rp6_incomeincurrency").val() == "null") {
        $("#snackbarerror").text("Income Type is required");
        $('#select2-rp6_incomeincurrency-container').addClass("iserror");
        // $("html, body").animate({ scrollTop: 600 }, "slow");
        showiperrtoast();
        event.stopPropagation();
        return;
    }
    if ($("#rp6_incomeinvalues").val() == '' || $("#rp6_incomeinvalues").val() == null || $("#rp6_incomeinvalues").val() == "null") {
        $("#snackbarerror").text("Income is required");
        $('#select2-rp6_incomeinvalues-container').addClass("iserror");
        // $("html, body").animate({ scrollTop: 600 }, "slow");
        showiperrtoast();
        event.stopPropagation();
        return;
    }
    if ($("#rp6_aboutus").val() == '') {
        $("#snackbarerror").text("About Partner  is required");
        $('#rp6_aboutus').addClass("iserror");
        showiperrtoast();
        event.stopPropagation();
        return;
    }


    for (var i = 0; i < $('[name="maritalstatus"]:checked').length; i++) {
        maritalstatus.push({
            "marital_status": $('[name="maritalstatus"]:checked').eq(i).val()
        });
    }

    var willing_communities = null;

    if ($('[name="is_other_communities"]:checked').val() == "Yes") {
        var willingtomarryothercaste = "1";
        if ($('input[name="filter_communities"]:checked').val() == undefined) {
            $("#snackbarerror").text("Select Willing communities is required");
            $("html, body").animate({
                scrollTop: 630
            }, "slow");
            showiperrtoast();
            event.stopPropagation();
            return;
        } else {
            if ($('input[name="filter_communities"]:checked').val() == "Yes"){
                willing_communities = 1
            }else{
                willing_communities = 0

            }
        }
    } else {
        var willingtomarryothercaste = "0";
    }

    dohsamchoices = [];
    if ($('[name="ismanglik"]:checked').val() == "Yes") {
        for (var i = 0; i < $('input[name="dosham"]:checked').length; i++) {
            dohsamchoices.push($('input[name="dosham"]:checked').eq(i).attr("attrval"));
        }
    } else {
        dohsamchoices = [];
    }

    var religionarr = [];
    for (var i = 0; i < $("#rp6_religion").val().length; i++) {
        religionarr.push({
            "religion": $("#rp6_religion").val()[i]
        });
    }

    var mothertonguearr = [];
    for (var i = 0; i < $("#rp6_mothertongue").val().length; i++) {
        mothertonguearr.push({
            "mother_tongue": $("#rp6_mothertongue").val()[i]
        });
    }

    var stararr = [];
    for (var i = 0; i < $("#rp6_star").val().length; i++) {
        stararr.push({
            "star": $("#rp6_star").val()[i]
        });
    }

    var countryarr = [];
    for (var i = 0; i < $("#rp6_country").val().length; i++) {
        countryarr.push({
            "country": $("#rp6_country").val()[i]
        });
    }

    var citizenshiparr = [];
    for (var i = 0; i < $("#rp6_citizenship").val().length; i++) {
        citizenshiparr.push({
            "citizenship": $("#rp6_citizenship").val()[i]
        });
    }

    var educatnarr = [];
    for (var i = 0; i < $("#rp6_education").val().length; i++) {
        educatnarr.push({
            "education": $("#rp6_education").val()[i]
        });
    }

    var occupatnarr = [];
    for (var i = 0; i < $("#rp6_occupation").val().length; i++) {
        occupatnarr.push({
            "occupation": $("#rp6_occupation").val()[i]
        });
    }

    var Datatosend = {
        "partner_basic_info": {
            "from_age": parseFloat($("#rp6_stage").val()),
            "to_age": parseFloat($("#rp6_endage").val()),
            "from_height": parseFloat($("#rp6_stheight").val()),
            "to_height": parseFloat($("#rp6_endheight").val()),
            "from_weight": parseFloat($("#rp6_stweight").val()),
            "to_weight": parseFloat($("#rp6_endweight").val()),
            "physical_status": $('[name="physicalstatus"]:checked').val(),
            "eating_habit": $('[name="eatinghabits"]:checked').val(),
            "drinking_habit": $('[name="drinkinghabits"]:checked').val(),
            "smoking_habit": $('[name="smokinghabits"]:checked').val()
        },
        "partner_caste": {
            "caste": $("#rp6_caste").val(),
            "is_willing": willingtomarryothercaste,
            "any_communities": willing_communities,
            "manglik": $('[name="ismanglik"]:checked').val(),
            'dohsam': dohsamchoices
        },
        "marital_status": maritalstatus,
        "partner_religion": religionarr,
        "partner_mother_tongue": mothertonguearr,
        "partner_star": stararr,
        "partner_country": countryarr,
        "partner_citizenship": citizenshiparr,
        "partner_education": educatnarr,
        "partner_occupation": occupatnarr,
        "partner_description": {
            "currency": $("#rp6_incomeincurrency").val(),
            "partner_income": $("#rp6_incomeinvalues").val(),
            "about_partner": $("#rp6_aboutus").val()
        }
    };

    $(".loadericon").show();
    $(".saveBtn").attr("disabled", true);
    
    var postData = JSON.stringify(Datatosend);

    $.ajax({
        url: sendrp6data_api,
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
            for (var key in JSON.parse(data.responseText)) {
                errtext = JSON.parse(data.responseText)[key][0];
            }
            $("#snackbarerror").text(errtext);
            showerrtoast();

        }
    }).done(function (dataJson) {
        // alert("success");
        $("#snackbarsuccs").text("Registration Process has been completed!");
        showsuccesstoast();
        setTimeout(function () {
            // window.location.href = "dashboard.html";
            window.location.replace("dashboard.html");
        }, 3000);

    });

} //register phase 6 fn ends here
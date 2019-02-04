$(function() { //initial fn starts here

    $(".suggestioncount,.loadmoreBtn,.loadericon,.loadericonsearch").hide();

    //enter click fn signup/login starts here
    $(".searchkeyword").keyup(function(event) {
        if (event.keyCode == 13) {
            $(".SearchBtn").click();
        }
    });


    $("#autocomplete-4").autocomplete({
        source: sourcetags
    });

    $(".searchkey").click(function() {

        if ($(".searchkeyword").val().trim() == '') {
            $("#snackbarerror").text("Search Keyword is required");
            showiperrtoast();
            event.stopPropagation();
            return;
        } else {
            $(".loadericonsearch").show();
            dynamicloadforsuggestion();
        }
    });

});

//list users - id fn starts here
function dynamicloadforsuggestion(type) {

    $.ajax({
        url: idssearch_api + $(".searchkeyword").val(),
        type: 'GET',
        headers: {
            "content-type": 'application/json',
            "Authorization": "Token " + localStorage.wutkn
        },
        success: function(data) {},
        error: function(data) {
            $(".loadericonsearch").hide();
            $(".suggestionlist").empty().append('<div class="col-md-12 col-sm-12 col-xs-12 pr0"><center><img src="img/assets/nodata.svg" style="width:40%"></center></div>');

        }
    }).done(function(data) {

        $(".suggestionlist").empty();

        if (data.first_name == undefined || data.first_name == "undefined") {

            $(".suggestionlist").empty().append('<div class="col-md-12 col-sm-12 col-xs-12 pr0"><center><img src="img/assets/nodata.svg" style="width:40%"></center></div>');

            $(".suggestioncount").show().text("(" + $(".suggestionlist .resultsusers").length + ")");
            $(".loadericonsearch").hide();

        } else {

            // var data = dataJson['results'][i];

            var dyn_img = (data.userprofile.profile_pic == null) ? "img/assets/coupleindex.svg" : data.userprofile.profile_pic;

            var gender = (data.userdetails.gender == "Male") ? "Mr. " : "Ms. ";
            var liked = (data.is_liked == true) ? "actionactive" : "";
            var shortlisted = (data.is_shortlisted == true) ? "actionactive" : "";
            var ignored = (data.is_ignored == true) ? "actionactive" : "";
            var usercity = (data.user_address == null) ? "Not Mentioned" : data.user_address.city.name;

            $(".suggestionlist").append('<div class="col-lg-2 col-md-2 col-sm-4 col-xs-6 resultsusers"><div class="card card-2 text-center heightauto"><div class="card__top"><a class="pointer" onclick="gotouserprofile(' + 1 + ',' + data.id + ')" target="_blank" style="background: url('+dyn_img+') top center / cover no-repeat;display: block;height: 140px;"></a></div><div class="card__body p10"><p class="username pointer newmatchusername1' + data.id + '" onclick="gotouserprofile(' + 1 + ',' + data.id + ')">' + gender + ' ' + data.first_name + ' ' + data.last_name + '</p><p class="livesin">Lives in <span class="spanlivesin">' + usercity + '</span></p></div><div class="card__bottom text-center ptb3"><div class="card__action tooltipsection"><a class="pointer social-icon social-icon--dribbble" onclick="acceptanddenyusers(this,' + data.id + ',' + 2 + ',' + 1 + ')"><i class="fa fa-heart hoverpink accepticon interests ' + liked + '" aria-hidden="true"></i><div class="shortlisttooltip">Send Interest</div></a></div><div class="card__action tooltipsection"><a class="pointer social-icon social-icon--dribbble" onclick="acceptanddenyusers(this,' + data.id + ',' + 0 + ',' + 1 + ')"><i class="fa fa-star hoverpink accepticon interests ' + shortlisted + '" aria-hidden="true"></i><div class="interesttooltip">Shortlist</div></a></div><div class="card__action tooltipsection"><a class="pointer social-icon social-icon--dribbble" onclick="acceptanddenyusers(this,' + data.id + ',' + 1 + ',' + 1 + ')"><i class="fa fa-thumbs-down hoverblack rejecticon reject ' + ignored + '" aria-hidden="true"></i><div class="declinetooltip">Decline</div></a></div></div></div></div>');

            $(".suggestioncount").show().text("(" + $(".suggestionlist .resultsusers").length + ")");
            $(".loadericonsearch").hide();
        } //else cond ends here


    });

} //list drivers fn ends here


//goto user prfoile fn starts here
function gotouserprofile(type, userid) {
    localStorage.fromtype = type;
    localStorage.userid_toseeprof = userid;
    window.open("profile.html", '_blank');
}

// ajax call for request in new matches page
function acceptanddenyusers(elem, id, type, functiontype) {
    if (type == 0) {
        var url = doshortlist_api;
    } else if (type == 1) {
        var url = doignore_api;
    } else {
        var url = dolikes_api;
    }
    var postData = JSON.stringify({
        "actor": id
    });
    $.ajax({
        url: url,
        type: 'post',
        data: postData,
        headers: {
            "content-type": 'application/json',
            "Authorization": "Token " + localStorage.wutkn
        },
        success: function(data) {
            if (type == 0) {
                $("#snackbarsuccs").text("Your request has been send to " + $(".newmatchusername" + functiontype + id).text());
            } else if (type == 1) {
                $("#snackbarsuccs").text("Your request has been send to " + $(".newmatchusername" + functiontype + id).text());
            } else {
                $("#snackbarsuccs").text("Your request has been send to " + $(".newmatchusername" + functiontype + id).text());
            }
            showsuccesstoast();
            dynamicloadforsuggestion(0);
        },
        error: function(data) {
            console.log("error occured during accept request");
        }
    });
} // ajax call for request in new matches page
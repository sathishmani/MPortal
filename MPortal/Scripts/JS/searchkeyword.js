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
            dynamicloadforsuggestion(0);
        }
    });


});

//list users - keywords fn starts here
function dynamicloadforsuggestion(type) {

    if (type == 0) {
        var url = keywordssearch_api + $(".searchkeyword").val();
    } else {
        var url = sessionStorage.ldmrthis;
    }

    $.ajax({
        url: url,
        type: 'GET',
        headers: {
            "content-type": 'application/json',
            "Authorization": "Token " + localStorage.wutkn
        },
        success: function(data) {},
        error: function(data) {

            $(".loadmoreBtn").hide();
            

            if (type == 0) {
                $(".loadericonsearch").hide();
                $(".suggestionlist").empty().append('<div class="col-md-12 col-sm-12 col-xs-12 pr0"><center><img src="img/assets/nodata.svg" style="width:40%"></center></div>');
            } else {
                $('.loadericon').hide();
            }

            $(".suggestioncount").show().text("(" + $(".suggestionlist .resultsusers").length + ")");

        }
    }).done(function(data) {

        $(".loadmoreBtn").hide();

        if (type == 0) {
            $(".loadericonsearch").hide();
            $(".suggestionlist").empty();
        }

        if (data['results'].length == 0) {

            $(".suggestionlist").empty().append('<div class="col-md-12 col-sm-12 col-xs-12 pr0"><center><img src="img/assets/nodata.svg" style="width:40%"></center></div>');

            $(".suggestioncount").show().text("(0)");

            if (type == 1) {
                $('.loadericon').hide();
            }

        } else {

            if (data.next_url != null) {
                sessionStorage.ldmrthis = data.next_url;
                $(".loadmoreBtn").show();
            }

            for (var i = 0; i < data['results'].length; i++) {

                var dyn_img = (data['results'][i].userprofile.profile_pic == null) ? "img/assets/coupleindex.svg" : data['results'][i].userprofile.profile_pic;
                var gender = (data['results'][i].userdetails.gender == "Male") ? "Mr. " : "Ms. ";
                var usercity = (data['results'][i].user_address == null) ? "Not Mentioned" : data['results'][i].user_address.city.name;

                var liked = (data['results'][i].is_liked == true) ? "actionactive" : "";
                var shortlisted = (data['results'][i].is_shortlisted == true) ? "actionactive" : "";
                var ignored = (data['results'][i].is_ignored == true) ? "actionactive" : "";

                $(".suggestionlist").append('<div class="col-lg-2 col-md-2 col-sm-4 col-xs-6 resultsusers"><div class="card card-2 text-center heightauto"><div class="card__top"><a class="pointer" onclick="gotouserprofile(' + 1 + ',' + data['results'][i].id + ')" target="_blank" style="background: url('+dyn_img+') top center / cover no-repeat;display: block;height: 140px;"></a></div><div class="card__body p10"><p class="username pointer newmatchusername1' + data['results'][i].id + '" onclick="gotouserprofile(' + 1 + ',' + data['results'][i].id + ')">' + gender + ' ' + data['results'][i].first_name + ' ' + data['results'][i].last_name + '</p><p class="livesin">Lives in <span class="spanlivesin">' + usercity + '</span></p></div><div class="card__bottom text-center ptb3"><div class="card__action tooltipsection"><a class="pointer social-icon social-icon--dribbble" onclick="acceptanddenyusers(this,' + data['results'][i].id + ',' + 2 + ',' + 1 + ')"><i class="fa fa-heart hoverpink accepticon interests ' + liked + '" aria-hidden="true"></i><div class="shortlisttooltip">Send Interest</div></a></div><div class="card__action tooltipsection"><a class="pointer social-icon social-icon--dribbble" onclick="acceptanddenyusers(this,' + data['results'][i].id + ',' + 0 + ',' + 1 + ')"><i class="fa fa-star hoverpink accepticon interests ' + shortlisted + '" aria-hidden="true"></i><div class="interesttooltip">Shortlist</div></a></div><div class="card__action tooltipsection"><a class="pointer social-icon social-icon--dribbble" onclick="acceptanddenyusers(this,' + data['results'][i].id + ',' + 1 + ',' + 1 + ')"><i class="fa fa-thumbs-down hoverblack rejecticon reject ' + ignored + '" aria-hidden="true"></i> <div class="declinetooltip">Decline</div></a></div></div></div></div>');
            }

            if (type == 1) {
                $('.loadericon').hide();
            } else {
                $(".loadericonsearch").hide();
            }

            $(".suggestioncount").show().text("(" + $(".suggestionlist .resultsusers").length + ")");
        } //else cond ends here


    });

} //list drivers fn ends here

//load more fn starts here
function loadmore() {
    $('.loadericon').show();
    dynamicloadforsuggestion(1);
}

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
var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"];


$(function () { //initial fn starts here

    var gentereq = (localStorage.gender == "Male") ? "Mr. " : "Ms. ";
    $(".username").text(gentereq + localStorage.wufname + " " + localStorage.wulname);
    $(".usermatrimonyid").text(localStorage.matrimonyid);

    //profile pic validation starts here
    if (localStorage.wuupldedpropic == "null") {
        $(".dashboardprofileimg").attr("src", "img/assets/coupleindex.svg");
    } else {
        $(".dashboardprofileimg").attr("src", localStorage.wuupldedpropic);
    }

    getuserprofiledata(); //get user full data to access edit phases

    userprofile();
    preferedlocationusers();
    latestupdate();
    newmatches();
    interestedprofile();

    // Check premium member
    getis_premium();


}); //initial fn starts here

//getuserprofiledata fn starts heree
function getuserprofiledata() {

    $.ajax({
        url: myprofile_api + localStorage.useridactivate + '/',
        type: 'GET',
        headers: {
            "content-type": 'application/json',
            "Authorization": 'Token ' + localStorage.wutkn + ''
        },
        success: function (data) {

            localStorage.myprofiledata = JSON.stringify(data);
            // gotoshowprofile_fn();

        },
        error: function (edata) {
            console.log("error occured in my profile data");
        }
    });

}

//user profile fn starts here
function userprofile() {
    $.ajax({
        url: userprofiledashboard_api,
        type: 'get',
        headers: {
            "content-type": 'application/json',
            "Authorization": "Token " + localStorage.wutkn
        },
        success: function (data) {

            //profile status starts here
            var profilecompleteness = (data.profile_completeness > 100) ? 100 : data.profile_completeness;
            $(".dynprogressbarvaluewidth").attr("aria-valuenow", profilecompleteness);
            $(".dynprogressbarvalue").attr("title", profilecompleteness);
            $(".tooltip-inner").text(profilecompleteness + "%");
            $(".progress-bar").each(function () {
                each_bar_width = $(this).attr('aria-valuenow');
                $(this).width(each_bar_width + '%');
            });
            $('[data-toggle="tooltip "]').tooltip({
                trigger: 'manual'
            }).tooltip('show');
            skipthispage_dashboard(data.skip_status);
        },
        error: function (data) {
            console.log("error occured during user profile loading");
        }
    });
}
//user profile fn ends here

//prefered location fn starts here
function preferedlocationusers() {

    $.ajax({
        url: preferedlocationdashbrd_api,
        type: 'get',
        headers: {
            "content-type": 'application/json',
            "Authorization": "Token " + localStorage.wutkn
        },
        success: function (data) {

            // alert("prefr loc success");

            $(".dyn_preferedlocation").empty();
            $(".dyn_preferededucation").empty();
            $(".dyn_preferedprofession").empty();
            $(".dyn_preferedcommunity").empty();
            $(".listwhosisonline").empty();

            //prefered location fn
            if (data.preferred_location.length != 0) {

                for (i = 0; i < data.preferred_location.length; i++) {

                    var dyn_img = (data.preferred_location[i].userprofile.profile_pic == null) ? "img/assets/coupleindex.svg" : data.preferred_location[i].userprofile.profile_pic;

                    var gender = (data.preferred_location[i].userdetails.gender == "Male") ? "Mr. " : "Ms. ";

                    var currentyear = parseInt(new Date().getFullYear());
                    var userage = currentyear - parseInt(data.preferred_location[i].userdetails.dob.substring(0, 4));

                    var usercity = (data.preferred_location[i].user_address == null) ? "Not Mentioned" : data.preferred_location[i].user_address.city.name;


                    $(".dyn_preferedlocation").append('<div class="row"><div class="col-md-4 col-sm-3 col-xs-2 pr0 prefrloctndata prefloc' + data.preferred_location[i].id + '"><a style="background: url(' + dyn_img + ') top center / cover no-repeat;display: block;height: 80px;"></a></div><div class="col-md-8 col-sm-9 col-xs-10"><p class="dashboardusername pointer" onclick="gotouserprofile(' + 0 + ',' + data.preferred_location[i].id + ')">' + gender + ' ' + data.preferred_location[i].first_name + ' ' + data.preferred_location[i].last_name + '</p> <p class="prefloc"> <span>' + userage + '</span> yrs</p><p class="prefloc pinkcolor">' + usercity + '</p></div></div><hr class="mtb10">');
                }

                if (data.preferred_location.length == 4) {
                    $(".dyn_preferedlocation").append(`<center><a class="pinkcolor cptr" onclick="viremoreside(1)">View More</a></center>`);
                }

            } else {
                $(".dyn_preferedlocation").append('<div class="col-md-12 col-sm-12 col-xs-12 pr0"><img src="img/assets/nodata.svg"></div>');
            }

            //prefered education fn
            if (data.preferred_education.length != 0) {

                for (i = 0; i < data.preferred_education.length; i++) {

                    var dyn_img = (data.preferred_education[i].userprofile.profile_pic == null) ? "img/assets/coupleindex.svg" : data.preferred_education[i].userprofile.profile_pic;

                    var gender = (data.preferred_education[i].userdetails.gender == "Male") ? "Mr. " : "Ms. ";

                    var currentyear = parseInt(new Date().getFullYear());
                    var userage = currentyear - parseInt(data.preferred_education[i].userdetails.dob.substring(0, 4));

                    var usercity = (data.preferred_education[i].user_address == null) ? "Not Mentioned" : data.preferred_education[i].user_address.city.name;


                    $(".dyn_preferededucation").append('<div class="row"><div class="col-md-4 col-sm-3 col-xs-2 pr0 prefrloctndata prefloc' + data.preferred_education[i].id + '"><a style="background: url(' + dyn_img + ') top center / cover no-repeat;display: block;height: 80px;"></a></div><div class="col-md-8 col-sm-9 col-xs-10"><p class="dashboardusername pointer" onclick="gotouserprofile(' + 0 + ',' + data.preferred_education[i].id + ')">' + gender + ' ' + data.preferred_education[i].first_name + ' ' + data.preferred_education[i].last_name + '</p> <p class="prefloc"> <span>' + userage + '</span> yrs</p><p class="prefloc pinkcolor">' + usercity + '</p></div></div><hr class="mtb10">');
                }

                if (data.preferred_education.length == 4) {
                    $(".dyn_preferededucation").append(`<center><a class="pinkcolor cptr" onclick="viremoreside(2)">View More</a></center>`);
                }

            } else {
                $(".dyn_preferededucation").append('<div class="col-md-12 col-sm-12 col-xs-12 pr0"><img src="img/assets/nodata.svg"></div>');
            }

            //prefered profesion fn
            if (data.preferred_occupation.length != 0) {

                for (i = 0; i < data.preferred_occupation.length; i++) {

                    var dyn_img = (data.preferred_occupation[i].userprofile.profile_pic == null) ? "img/assets/coupleindex.svg" : data.preferred_occupation[i].userprofile.profile_pic;

                    var gender = (data.preferred_occupation[i].userdetails.gender == "Male") ? "Mr. " : "Ms. ";

                    var currentyear = parseInt(new Date().getFullYear());
                    var userage = currentyear - parseInt(data.preferred_occupation[i].userdetails.dob.substring(0, 4));

                    var usercity = (data.preferred_occupation[i].user_address == null) ? "Not Mentioned" : data.preferred_occupation[i].user_address.city.name;


                    $(".dyn_preferedprofession").append('<div class="row"><div class="col-md-4 col-sm-3 col-xs-2 pr0 prefrloctndata prefloc' + data.preferred_occupation[i].id + '"><a style="background: url(' + dyn_img + ') top center / cover no-repeat;display: block;height: 80px;"></a></div><div class="col-md-8 col-sm-9 col-xs-10"><p class="dashboardusername pointer" onclick="gotouserprofile(' + 0 + ',' + data.preferred_occupation[i].id + ')">' + gender + ' ' + data.preferred_occupation[i].first_name + ' ' + data.preferred_occupation[i].last_name + '</p> <p class="prefloc"> <span>' + userage + '</span> yrs</p><p class="prefloc pinkcolor">' + usercity + '</p></div></div><hr class="mtb10">');
                }

                if (data.preferred_occupation.length == 4) {
                    $(".dyn_preferedprofession").append(`<center><a class="pinkcolor cptr" onclick="viremoreside(3)">View More</a></center>`);
                }

            } else {
                $(".dyn_preferedprofession").append('<div class="col-md-12 col-sm-12 col-xs-12 pr0"><img src="img/assets/nodata.svg"></div>');
            }

            //prefered community
            if (data.preferred_community.length != 0) {

                for (i = 0; i < data.preferred_community.length; i++) {

                    var dyn_img = (data.preferred_community[i].userprofile.profile_pic == null) ? "img/assets/coupleindex.svg" : data.preferred_community[i].userprofile.profile_pic;

                    var gender = (data.preferred_community[i].userdetails.gender == "Male") ? "Mr. " : "Ms. ";

                    var currentyear = parseInt(new Date().getFullYear());
                    var userage = currentyear - parseInt(data.preferred_community[i].userdetails.dob.substring(0, 4));

                    var usercity = (data.preferred_community[i].user_address == null) ? "Not Mentioned" : data.preferred_community[i].user_address.city.name;


                    $(".dyn_preferedcommunity").append('<div class="row"><div class="col-md-4 col-sm-3 col-xs-2 pr0 prefrloctndata prefloc' + data.preferred_community[i].id + '"><a style="background: url(' + dyn_img + ') top center / cover no-repeat;display: block;height: 80px;"></a></div><div class="col-md-8 col-sm-9 col-xs-10"><p class="dashboardusername pointer" onclick="gotouserprofile(' + 0 + ',' + data.preferred_community[i].id + ')">' + gender + ' ' + data.preferred_community[i].first_name + ' ' + data.preferred_community[i].last_name + '</p> <p class="prefloc"> <span>' + userage + '</span> yrs</p><p class="prefloc pinkcolor">' + usercity + '</p></div></div><hr class="mtb10">');
                }

                if (data.preferred_community.length == 5) {
                    $(".dyn_preferedcommunity").append(`<center><a class="pinkcolor cptr" onclick="viremoreside(4)">View More</a></center>`);
                }

            } else {
                $(".dyn_preferedcommunity").append('<div class="col-md-12 col-sm-12 col-xs-12 pr0"><img src="img/assets/nodata.svg"></div>');
            }

            //who is online

            if (data.online_users.length != 0) {

                for (i = 0; i < data.online_users.length; i++) {

                    var dyn_img = (data.online_users[i].userprofile.profile_pic == null) ? "img/assets/coupleindex.svg" : data.online_users[i].userprofile.profile_pic;

                    var gender = (data.online_users[i].userdetails.gender == "Male") ? "Mr. " : "Ms. ";
                    var currentyear = parseInt(new Date().getFullYear());
                    var userage = currentyear - parseInt(data.online_users[i].userdetails.dob.substring(0, 4));

                    var usercity = (data.online_users[i].user_address == null) ? "Not Mentioned" : data.online_users[i].user_address.city.name;


                    $(".listwhosisonline").append("<div class='row'><div class='col-md-4 col-sm-3 col-xs-2 pr0 prefrloctndata prefloc43'><a class='pointer' style='background: url(" + dyn_img + ") top center / cover no-repeat;display: block;height: 75px;'></a></div><div class='col-md-8 col-sm-9 col-xs-10'><p class='dashboardusername pointer' onclick='gotouserprofile(" + 0 + " , " + data.online_users[i].id + ")'>" + gender + " " + data.online_users[i].first_name + " " + data.online_users[i].last_name + " </p><p class='prefloc'> <span>" + userage + "</span> yrs</p><p class='prefloc pinkcolor'>" + usercity + "</p></div></div><hr class='mtb10'>");

                }

                if (data.online_users.length == 4) {
                    $(".listwhosisonline").append(`<center><a class="pinkcolor cptr" onclick="viremoreside(5)">View More</a></center>`);
                }

            } else {
                $(".listwhosisonline").append('<div class="col-md-12 col-sm-12 col-xs-12 pr0"><img src="img/assets/nodata.svg"></div>');
            }
            $(".unreads").text(data.unread_count);
            $(".ins-received").text(data.received);
            $(".ins-sent").text(data.send_count);

        },
        error: function (data) {
            console.log("error occured during preferred location loading");
        }
    });

} //prefered location fn starts here

//lates update fn starts herepreferedlocationuser
function latestupdate() {

    $.ajax({
        url: latestupdatedashbrd_api,
        type: 'get',
        headers: {
            "content-type": 'application/json',
            "Authorization": "Token " + localStorage.wutkn
        },
        success: function (data) {

            $(".latestupdates").empty();
            $(".latestupdates-mobile").empty();

            $(".latestupdates-mobile-count").text("(" + data.count + ")");
            sessionStorage.latestupdataarr = JSON.stringify(data);

            if (data['results'].length != 0) {

                for (i = 0; i < data['results'].length; i++) {

                    if (data['results'][i].userprofile.last_updated != null) {

                        var lastupdate = data['results'][i].userprofile.last_updated.substring(8, 10) + "-" + " " + monthNames[parseInt(data['results'][i].userprofile.last_updated.substring(5, 7)) - 1] + "-" + " " + data['results'][i].userprofile.last_updated.substring(0, 4);

                    } else {

                        var today = new Date();
                        var dd = today.getDate();
                        var mm = today.getMonth() + 1; //January is 0!
                        var yyyy = today.getFullYear();

                        if (dd < 10) {
                            dd = '0' + dd
                        }

                        if (mm < 10) {
                            mm = '0' + mm
                        }

                        var lastupdate = dd + '-' + monthNames[parseInt(mm.substring(5, 7))] + yyyy;
                    }

                    var gender = (data['results'][i].userdetails.gender == "Male") ? "Mr. " : "Ms. ";

                    var dyn_img = (data['results'][i].userprofile.profile_pic == null) ? "img/assets/coupleindex.svg" : data['results'][i].userprofile.profile_pic;

                    var currentyear = parseInt(new Date().getFullYear());
                    var userage = currentyear - parseInt(data['results'][i].userdetails.dob.substring(0, 4));
                    var liked = (data['results'][i].is_liked == true) ? "actionactive" : "";
                    var shortlisted = (data['results'][i].is_shortlisted == true) ? "actionactive" : "";
                    var ignored = (data['results'][i].is_ignored == true) ? "actionactive" : "";




                    $(".latestupdates").append("<div class='row'> <div class='col-md-2 col-sm-3 col-xs-3 latestupdateimg'> <a onclick='gotouserprofile(" + 1 + "," + data['results'][i].id + ")' class='pointer' style='background: url(" + dyn_img + ") top center / cover no-repeat;display: block;height: 75px;'>  </a> </div><div class='col-md-9 col-sm-8 col-xs-8'> <p class='dashboardusername pointer'><span onclick='gotouserprofile(" + 1 + "," + data['results'][i].id + ")'>" + gender + " " + data['results'][i].first_name + "  " + data['results'][i].last_name + "</span><span class='msgpagedate'><i class='fa fa-calendar-check-o' aria-hidden='true'></i>&nbsp;" + lastupdate + "&emsp;<a class='pointer' onclick='gotouserprofile(" + 1 + " , " + data['results'][i].id + ")' data-toggle='modal'><i class='fa fa-info-circle trashicon' aria-hidden='true'></i></a></span></p><a class='pointer pinkcolor' onclick='gotouserprofile(" + 1 + "," + data['results'][i].id + ")' class='msgpageanchor'><i class='fa fa-mobile viewnumbericon' aria-hidden='true'></i>&emsp;View Mobile Number / Send SMS</a> <p class='f13'><span class=''>" + userage + " years</span> | <span class=''>" + data['results'][i].userdetails.dob + "</span> | <span class=''>" + data['results'][i].userdetails.religion.name + "</span> | <span class=''>" + data['results'][i].userdetails.mother_tongue.name + "</span></p></div></div><hr class='mtb10'>");
                    $(".latestupdates-mobile").append('<div class="col-lg-3 col-md-3 col-sm-4 col-xs-6"><div class="card card-2 text-center heightauto"><div class="card__top"><a class="pointer" onclick="gotouserprofile(' + 1 + ',' + data['results'][i].id + ')" target="_blank"><a onclick="gotouserprofile(' + 1 + ',' + data['results'][i].id + ')"  class="pointer" style="background: url(' + dyn_img + ') top center / cover no-repeat;display: block;height: 140px;"></a></a></div><div class="card__body p10"><p class="username pointer newmatchusername1' + data['results'][i].id + '" onclick="gotouserprofile(' + 1 + ',' + data['results'][i].id + ')">' + gender + ' ' + data['results'][i].first_name + ' ' + data['results'][i].last_name + '</p><p class="livesin">Lives in <span class="spanlivesin">' + data['results'][i].city + '</span></p></div><div class="card__bottom text-center ptb3"><div class="card__action tooltipsection"><a class="pointer social-icon social-icon--dribbble" onclick="acceptanddenyusers(this,' + data['results'][i].id + ',' + 2 + ',' + 1 + ')"><i class="fa fa-heart hoverpink accepticon interests ' + liked + '" aria-hidden="true"></i><div class="shortlisttooltip">Send Interest</div></a></div><div class="card__action tooltipsection"><a class="pointer social-icon social-icon--dribbble" onclick="acceptanddenyusers(this,' + data['results'][i].id + ',' + 0 + ',' + 1 + ')"><i class="fa fa-star hoverpink accepticon interests ' + shortlisted + '" aria-hidden="true"></i><div class="interesttooltip">Shortlist</div></a></div><div class="card__action tooltipsection"><a class="pointer social-icon social-icon--dribbble" onclick="acceptanddenyusers(this,' + data['results'][i].id + ',' + 1 + ',' + 1 + ')"><i class="fa fa-thumbs-down hoverblack rejecticon reject ' + ignored + '" aria-hidden="true"></i><div class="declinetooltip">Decline</div></a></div></div></div></div>');
                }

            } else {
                $(".latestupdates").append('<div class="col-md-12 col-sm-12 col-xs-12 pr0"><center><img src="img/assets/nodata.svg" style="width:40%"></center></div>');
                $(".latestupdates-mobile").append('<div class="col-md-12 col-sm-12 col-xs-12 pr0"><center><img src="img/assets/nodata.svg" style="width:40%"></center></div>');
            }
        },
        error: function (data) {
            console.log("error occured during new matches loading");
        }
    });
} //lates update fn ends here

//show user phono no fn starts here
function showuserpno(columntype, userid, userphoneno) {
    var getdetails = getObjects(JSON.parse(sessionStorage.latestupdataarr), 'username', userphoneno.toString());
    var data = getdetails[0];

    var dyn_img = (data.userprofile.profile_pic == null) ? "img/assets/coupleindex.svg" : data.userprofile.profile_pic;
    $(".userimginmodal").attr("src", dyn_img);

    var gender = (data.userdetails.gender == "Male") ? "Mr. " : "Ms. ";
    $(".userdynnameinmdl").text(gender + data.first_name + " " + data.last_name);

    $(".usermtrimonyidinmdl").text("(" + data.userprofile.uid + ")");
    $(".phonenoinmdl").text(data.username);

    var currentyear = parseInt(new Date().getFullYear());
    var userage = currentyear - parseInt(data.userdetails.dob.substring(0, 4));
    $(".userageinmdl").text(userage + " years");

    $(".userdobinmdl").text(data.userdetails.dob);
    $(".userreligioninmdl").text(data.userdetails.religion.name);
    $(".usermothertnginmdl").text(data.userdetails.mother_tongue.name);

}

$(".phonenoshowmdl").click(function () {
    $(".close").click();
});

function getObjects(obj, key, val) {
    var objects = [];
    for (var i in obj) {
        if (!obj.hasOwnProperty(i)) continue;
        if (typeof obj[i] == 'object') {
            objects = objects.concat(getObjects(obj[i], key, val));
        } else if (i == key && obj[key] == val) {
            objects.push(obj);
        }
    }
    // console.log(objects);
    return objects;

}

//new matches fn starts here
function newmatches() {

    $.ajax({
        url: newmatchesdashbrd_api,
        type: 'get',
        headers: {
            "content-type": 'application/json',
            "Authorization": "Token " + localStorage.wutkn
        },
        success: function (data) {

            $(".newmatchload").empty();
            $(".newmatchescount").text("(" + data.count + ")");
            if (data['results'].length != 0) {
                for (i = 0; i < data['results'].length; i++) {

                    if (i < 4) {

                        var dyn_img = (data['results'][i].userprofile.profile_pic == null) ? "img/assets/coupleindex.svg" : data['results'][i].userprofile.profile_pic;
                        var gender = (data['results'][i].userdetails.gender == "Male") ? "Mr. " : "Ms. ";
                        var usercity = (data['results'][i].user_address == null) ? "Not Mentioned" : data['results'][i].user_address.city.name;

                        var liked = (data['results'][i].is_liked == true) ? "actionactive" : "";
                        var shortlisted = (data['results'][i].is_shortlisted == true) ? "actionactive" : "";
                        var ignored = (data['results'][i].is_ignored == true) ? "actionactive" : "";

                        $(".newmatchload").append('<div class="col-lg-3 col-md-3 col-sm-4 col-xs-6"><div class="card card-2 text-center heightauto"><div class="card__top"><a class="pointer" onclick="gotouserprofile(' + 1 + ',' + data['results'][i].id + ')" target="_blank"><a onclick="gotouserprofile(' + 1 + ',' + data['results'][i].id + ')"  class="pointer" style="background: url(' + dyn_img + ') top center / cover no-repeat;display: block;height: 140px;"></a></a></div><div class="card__body p10"><p class="username pointer newmatchusername1' + data['results'][i].id + '" onclick="gotouserprofile(' + 1 + ',' + data['results'][i].id + ')">' + gender + ' ' + data['results'][i].first_name + ' ' + data['results'][i].last_name + '</p><p class="livesin">Lives in <span class="spanlivesin">' + usercity + '</span></p></div><div class="card__bottom text-center ptb3"><div class="card__action tooltipsection"><a class="pointer social-icon social-icon--dribbble" onclick="acceptanddenyusers(this,' + data['results'][i].id + ',' + 2 + ',' + 1 + ')"><i class="fa fa-heart hoverpink accepticon interests ' + liked + '" aria-hidden="true"></i><div class="shortlisttooltip">Send Interest</div></a></div><div class="card__action tooltipsection"><a class="pointer social-icon social-icon--dribbble" onclick="acceptanddenyusers(this,' + data['results'][i].id + ',' + 0 + ',' + 1 + ')"><i class="fa fa-star hoverpink accepticon interests ' + shortlisted + '" aria-hidden="true"></i><div class="interesttooltip">Shortlist</div></a></div><div class="card__action tooltipsection"><a class="pointer social-icon social-icon--dribbble" onclick="acceptanddenyusers(this,' + data['results'][i].id + ',' + 1 + ',' + 1 + ')"><i class="fa fa-thumbs-down hoverblack rejecticon reject ' + ignored + '" aria-hidden="true"></i><div class="declinetooltip">Decline</div></a></div></div></div></div>');

                    }
                }
            } else {
                $(".newmatchload").append('<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12"><center><img src="img/assets/nodata.svg" style="width:40%"></center></div>');
            }


        },
        error: function (data) {
            console.log("error occured during new matches loading");
            $(".newmatchescount").text("(0)");
        }
    });
}

//interested profile fn starts
function interestedprofile() {

    $.ajax({
        url: intprofileindashboard_api,
        type: 'get',
        headers: {
            "content-type": 'application/json',
            "Authorization": "Token " + localStorage.wutkn
        },
        success: function (data) {

            $(".interestedpro").empty();
            $(".interestedprocount").text("(" + data.count + ")");
            if (data['results'].length != 0) {
                for (i = 0; i < data['results'].length; i++) {

                    if (i < 4) {

                        var dyn_img = (data['results'][i].userprofile.profile_pic == null) ? "img/assets/coupleindex.svg" : data['results'][i].userprofile.profile_pic;
                        var gender = (data['results'][i].userdetails.gender == "Male") ? "Mr. " : "Ms. ";
                        var usercity = (data['results'][i].user_address == null) ? "Not Mentioned" : data['results'][i].user_address.city.name;

                        var liked = (data['results'][i].is_liked == true) ? "actionactive" : "";
                        var shortlisted = (data['results'][i].is_shortlisted == true) ? "actionactive" : "";
                        var ignored = (data['results'][i].is_ignored == true) ? "actionactive" : "";

                        $(".interestedpro").append('<div class="col-lg-3 col-md-3 col-sm-4 col-xs-6"><div class="card card-2 text-center heightauto"><div class="card__top"><a class="pointer" onclick="gotouserprofile(' + 1 + ',' + data['results'][i].id + ')" target="_blank"><a onclick="gotouserprofile(' + 1 + ',' + data['results'][i].id + ')" class="pointer" style="background: url(' + dyn_img + ') top center / cover no-repeat;display: block;height: 140px;"></a></a></div><div class="card__body p10"><p class="username pointer newmatchusername2' + data['results'][i].id + '" onclick="gotouserprofile(' + 1 + ',' + data['results'][i].id + ')">' + gender + ' ' + data['results'][i].first_name + ' ' + data['results'][i].last_name + '</p><p class="livesin">Lives in <span class="spanlivesin">' + usercity + '</span></p></div><div class="card__bottom text-center ptb3"><div class="card__action tooltipsection"><a class="pointer social-icon social-icon--dribbble" onclick="acceptanddenyusers(this,' + data['results'][i].id + ',' + 2 + ',' + 2 + ')"><i class="fa fa-heart hoverpink accepticon interests ' + liked + '" aria-hidden="true"></i><div class="shortlisttooltip">Send Interest</div></a></div><div class="card__action tooltipsection"><a class="pointer social-icon social-icon--dribbble" onclick="acceptanddenyusers(this,' + data['results'][i].id + ',' + 0 + ',' + 2 + ')"><i class="fa fa-star hoverpink accepticon interests ' + shortlisted + '" aria-hidden="true"></i><div class="interesttooltip">Shortlist</div></a></div><div class="card__action tooltipsection"><a class="pointer social-icon social-icon--dribbble" onclick="acceptanddenyusers(this,' + data['results'][i].id + ',' + 1 + ',' + 2 + ')"><i class="fa fa-thumbs-down hoverblack rejecticon reject ' + ignored + '" aria-hidden="true"></i><div class="declinetooltip">Decline</div> </a></div></div></div></div>');

                    }
                }
            } else {
                $(".int-list-profile").hide();
                $(".interestedpro").append('<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12"><center><img src="img/assets/nodata.svg" style="width:40%"></center></div>');
            }

        },
        error: function (data) {
            console.log("error occured during new matches loading");
            $(".interestedprocount").text("(0)");
        }
    });

}
//interested profile fn starts

// ajax call for request in new matches page
function acceptanddenyusers(elem, id, type, functiontype) {
    if (type == 0) {
        var url = doshortlist_api;
    } else if (type == 1) {
        var url = doignore_api;
    } else {
        is_premium = JSON.parse(localStorage.is_premium)
        if (!is_premium) {
            window.location.href = "upgrade.html";
        } else {

            var url = dolikes_api;
        }
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
        success: function (data) {
            if (type == 0) {
                $("#snackbarsuccs").text("Your request has been sent " + $(".newmatchusername" + functiontype + id).text());
            } else if (type == 1) {
                $("#snackbarsuccs").text("Your request has been sent " + $(".newmatchusername" + functiontype + id).text());
            } else {
                $("#snackbarsuccs").text("Your request has been sent " + $(".newmatchusername" + functiontype + id).text());
            }
            showsuccesstoast();
            newmatches();
            interestedprofile();
        },
        error: function (data) {
            console.log("error occured during accept request");
        }
    });
} // ajax call for request in new matches page


//goto user prfoile fn starts here
function gotouserprofile(type, userid) {
    localStorage.fromtype = type;
    localStorage.userid_toseeprof = userid;
    window.open("profile.html", '_blank');
}

function viremoreside(type) {
    sessionStorage.side_choosentype = type;
    window.location.href = "preferences.html";
}

function skipthispage_dashboard(skip_status) {
    skip_status_json = [{
            "image": "img/assets/girl.svg",
            "carousaltext": "Upload photos and Get More Response.",
            "link": "editprofile-phase1.html",
            "btn_text": "UPLOAD PHOTOS",
        }, {
            "image": "img/assets/religious.svg",
            "carousaltext": "Edit your Personal Details and Get More Response.",
            "link": "editprofile-phase2.html",
            "btn_text": "EDIT PERSONAL",
        }, {
            "image": "img/assets/occupation.svg",
            "carousaltext": "Edit Your Professional Details and Get More Response.",
            "link": "editprofile-phase3.html",
            "btn_text": "EDIT PROFESSION",

        }, {
            "image": "img/assets/hobbies.png",
            "carousaltext": "Edit Your Hobbies & Interests and Get More Response",
            "link": "editprofile-phase4.html",
            "btn_text": "EDIT HOBBIES",

        },
        {
            "image": "img/assets/graduation.svg",
            "carousaltext": "Edit Update your Basic Information",
            "link": "editprofile-phase5.html",
            "btn_text": "Updte Basic Info",

        },
        {
            "image": "img/assets/religious.svg",
            "carousaltext": "Edit your Religion Details",
            "btn_text": "editprofile-phase6.html",
            "btn_text": "Update Religion",

        }
    ];
    $(".skip-status-item").empty();
    if (skip_status.length == 0) {
        $('#profile-status').text("Profile Completed");
        $(".skip-status-item").append(`<div class="item active">
            <div class="row">
                <div class="col-md-1 col-sm-1 col-xs-1 hidden-xs"></div>
                <div class="col-md-2 col-sm-2 col-xs-2 hidden-xs">
                    <center>
                        <img src="img/assets/pair.svg" class="img-responsive dashboardicon">
                    </center>
                </div>
                <div class="col-md-5 col-sm-5 col-xs-6">
                    <p class="carousaltext">View Your Matches</p>
                </div>
                <div class="col-md-3 col-sm-3 col-xs-6">
                    <center>
                        <a class="btn btn--primary carousalbtn" href="matches.html">
                            <span class="btn__text">View Matches</span>
                        </a>
                    </center>
                </div>
                <div class="col-md-1 col-sm-1 col-xs-1 hidden-xs"></div>
            </div>
        </div>`);
        return;

    }

    for (var i = 0; i < skip_status.length; i++) {
        value_data = skip_status_json[parseInt(skip_status[i]) - 1]
        $(".skip-status-item").append(`<div class="item ${(i==0) ? "active": ""}">
            <div class="row">
                <div class="col-md-1 col-sm-1 col-xs-1"></div>
                <div class="col-md-2 col-sm-2 col-xs-2">
                    <center>
                        <img src="${value_data['image']}" class="img-responsive dashboardicon">
                    </center>
                </div>
                <div class="col-md-5 col-sm-5 col-xs-8">
                    <p class="carousaltext">${value_data['carousaltext']}</p>
                </div>
                <div class="col-md-3 col-sm-3 col-xs-11">
                    <center>
                        <a class="btn btn--primary mt15 carousalbtn" href="${value_data['link']}">
                            <span class="btn__text">${value_data['btn_text']}</span>
                        </a>
                    </center>
                </div>
                <div class="col-md-1 col-sm-1 col-xs-1"></div>
            </div>
        </div>`)

    }

}
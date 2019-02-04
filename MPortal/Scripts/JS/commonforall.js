//success toast fn starts here
function showsuccesstoast() {
    var x = document.getElementById("snackbarsuccs");
    x.className = "show";
    setTimeout(function () {
        x.className = x.className.replace("show", "");
    }, 4000);
}

//failure toast fn starts here
function showerrtoast() {
    var x = document.getElementById("snackbarerror");
    x.className = "show";
    setTimeout(function () {
        x.className = x.className.replace("show", "");
    }, 4000);
}
var slideIndex = 0
//error toast for ip errors
function showiperrtoast() {
    var x = document.getElementById("snackbarerror");
    x.className = "show";
    setTimeout(function () {
        x.className = x.className.replace("show", "");
    }, 3500);
}

function showSlides() {

    var slides_imge = ["background: url('img/banner/banner1.jpg');background-position: 50% 50%;opacity: 1;", "background: url('img/banner/banner2.jpg');opacity: 1;", "background: url('img/banner/banner3.jpg');opacity: 1;"];
    var slides = document.getElementsByClassName("image-slider");
    var slides_mobile = document.getElementById("image-slider");
    slides[0].style = slides_imge[slideIndex]
    slides_mobile.style = slides_imge[slideIndex]
    slideIndex++;

    if (slideIndex >= slides_imge.length) {
        slideIndex = 0;
    }
}

$(function () {
    localStorage.wutkn ? getpoints() : '';
    $(".loadericonskip").hide();

    localStorage.pageinitialise = 0;

    //error and success div append for all pages
    $("body").append('<div id="snackbarsuccs"></div><div id="snackbarerror"></div>');

    //mobile no validation
    $("#signup-mobile,#search-field,.editp1_userphoeno,#editedmobileno,#newsletterphoneno").keypress(function (e) {
        if ($(this).val().length > 11 || e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
            return false;
        }
    });
    $("#rp1_zipcode,#ep8_zipcode").keypress(function (e) {
        if ($(this).val().length > 5 || e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
            return false;
        }
    });
    $(".editp1_userage").keypress(function (e) {
        if ($(this).val().length > 1 || e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
            return false;
        }
    });
    $("#rp1_income,#ep3_incomevalue").keypress(function (e) {
        if ($(this).val().length > 9 || e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
            return false;
        }
    });

    String.prototype.replaceAll = function (search, replacement) {
        var target = this;
        return target.replace(new RegExp(search, 'g'), replacement);
    };

    $(".registerinnavbar").click(function () {
        // $(".regformdesign").addClass("animated")
        // alert("clicked");
        $('.regformdesign').addClass('wobble');
        setTimeout(function () {
            $('.regformdesign').removeClass('wobble');
        }, 2000);
    });

    getonlineuserslist();
});

//get online suers list fn starts here
function getonlineuserslist() {
    //check online users fn ends here
    if (localStorage.wutkn) {
        $.ajax({
            url: checkonlineusers,
            type: 'GET',
            headers: {
                'Authorization': 'Token ' + localStorage.wutkn
            },
            success: function (data) {
                if ($(".listwhosisonline").length != 0) {
                    $(".listwhosisonline").empty();
                    if (data.length != 0) {

                        for (i = 0; i < data.length; i++) {
                            var dyn_img = (data[i].userprofile.profile_pic == null) ? "img/assets/coupleindex.svg" : data[i].userprofile.profile_pic;
                            var gender = (data[i].userdetails.gender == "Male") ? "Mr. " : "Ms. ";
                            var currentyear = parseInt(new Date().getFullYear());
                            var userage = currentyear - parseInt(data[i].userdetails.dob.substring(0, 4));
                            var usercity = (data[i].user_address == null) ? "Not Mentioned" : data[i].user_address.city.name;
                            $(".listwhosisonline").append("<div class='row'><div class='col-md-3 col-sm-3 col-xs-2 pr0 prefrloctndata prefloc43'><img src='" + dyn_img + "' class='dashboardlatestuserimg'></div><div class='col-md-9 col-sm-9 col-xs-10'><p class='dashboardusername pointer' onclick='gotouserprofile(" + 0 + " , " + data[i].id + ")'>" + gender + " " + data[i].first_name + " " + data[i].last_name + " </p><p class='prefloc'> <span>" + userage + "</span> yrs</p><p class='prefloc pinkcolor'>" + usercity + "</p></div></div><hr class='mtb10'>");
                        }
                    } else {
                        $(".listwhosisonline").append('<div class="col-md-12 col-sm-12 col-xs-12 pr0"><img src="img/assets/nodata.svg"></div>');
                    }
                }
                setTimeout(function () {
                    getonlineuserslist();
                }, 120000);
            },
            error: function (edata) {
                console.log("error occured in load online user details");
            }
        });
    } //check online users fn ends here
}

$(".closethismodal").click(function () {
    $("#rp6_aboutus").val($("#aboutuscreation").val());
    $(".close").click();
});


//send and deny request fn starts here
// ajax call for request in new matches page
function acceptanddenyusers(elem, id, type, functiontype) {

    if (functiontype == 1 && type == 0) {
        var url = sendnewrequest_newmatches_api;
    } else if (functiontype == 1 && type == 1) {
        var url = denynewrequest_newmatches_api;
    } else if (functiontype == 2 && type == 0) {
        var url = sendnewrequest_intrestedprof_api;
    } else if (functiontype == 2 && type == 1) {
        var url = denynewrequest_intrestedprof_api;
    } else if (functiontype == 3 && type == 0) {
        var url = acceptmyrequest_api;
    } else {
        var url = denymyrequest_api;
    }

    $.ajax({
        url: url,
        type: 'post',
        data: postData,
        headers: {
            "content-type": 'application/json',
            "Authorization": "Token " + localStorage.token
        },
        success: function (data) {

            $(elem).find(".interests").addClass("pinkcolor");

            if (type == 0) {
                $("#snackbarsuccs").text("Your Request has been sent to" + $(".newmatchusername" + functiontype + id).text());
            } else {
                $("#snackbarsuccs").text("You have denied " + $(".newmatchusername" + functiontype + id).text() + "profile");
            }

            showsuccesstoast();

            if (functiontype == 1) {
                newmatches();
            } else if (type == 2) {
                interestedprofile();
            } else {
                myrequests();
            }


        },
        error: function (data) {

            console.log("error occured during accept request" + functiontype);

            var errtext = "";
            for (var key in JSON.parse(data.responseText)) {
                errtext = JSON.parse(data.responseText)[key][0];
            }
            $("#snackbarerror").text(errtext);
            showerrtoast();
        }
    });

} // ajax call for request in new matches page

//skip fn starts here
function skipthispage(type) {

    $(".skipBtn").attr("disabled", true);
    $(".loadericonskip").show();

    var postData = JSON.stringify({
        "phase": type
    });if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent)) {
    }

    $.ajax({
        url: skipregisteration_api,
        type: 'post',
        data: postData,
        headers: {
            "content-type": 'application/json',
            "Authorization": "Token " + localStorage.wutkn
        },
        success: function (data) {
            $(".skipBtn").attr("disabled", false);
            $(".loadericonskip").hide();
            if (type == 1) {
                window.location.replace("register-phase2.html");
            } else if (type == 2) {
                window.location.replace("register-phase3.html");
            } else if (type == 3) {
                window.location.replace("register-phase4.html");
            } else if (type == 4) {
                window.location.replace("register-phase5.html");
            } else if (type == 5) {
                window.location.replace("register-phase6.html");
            } else {
                window.location.replace("dashboard.html");
            }
        },
        error: function (data) {
            $(".skipBtn").attr("disabled", false);
            $(".loadericonskip").hide();
            $("#snackbarerror").text("Error occured.Please refresh this page!");
            showerrtoast();
        }
    });
}


//20/11 -v 
function requestpagetab1select() {
    sessionStorage.requestpagetab = 2;
}

function getpoints() {
    $.ajax({
        url: getpoints_api,
        type: 'get',
        headers: {
            "Authorization": "Token " + localStorage.wutkn
        },
        success: data => {
            // console.log(data);
            $('.usedpoints,.unusedpoints').empty();
            if (data.balance != null) {
                $('.pointsli').show();
                $(".usedpoints").append(data.used + '<span class="tooltiptext1">Used</span>');
                $(".unusedpoints").append(data.balance + '<span class="tooltiptext1">Unused</span>');
            } else {
                $('.pointsli').hide();
            }
        },
        error: data => {
            console.log(data);
        }
    });
}

function getis_premium() {

    $.ajax({
        url: is_premium_api,
        type: 'get',
        headers: {
            "Authorization": "Token " + localStorage.wutkn
        },
        success: data => {
            // console.log(data);
            localStorage.is_premium = data.is_premium;
        },
        error: data => {
            console.log(data);
        }
    });

}

// Online menu toggled
$(".menu-open").click(function (e) {
    e.preventDefault();
    $("#wrapper").toggleClass("toggled");
});
$("#menu-open").click(function (e) {
    e.preventDefault();
    $("#wrapper").toggleClass("toggled");
});
$("#menu-close").click(function (e) {
    e.preventDefault();
    $("#wrapper").toggleClass("toggled");
});


function gotouserprofile(type, userid) {
    localStorage.fromtype = type;
    localStorage.userid_toseeprof = userid;
    window.open("profile.html", '_blank');
}
$("a[href='#request']").click(function (e) {
    e.preventDefault();

    var position = $($(this).attr("href")).offset().top;

    $("body, html").animate({
        scrollTop: position
    }, 500, 'linear');

});



$("#videoModal").on('shown.bs.modal', function () {
    $("#matrimonyadd").attr('src', "https://www.youtube.com/embed/6oVBktxq2ac?list=PLuyEpgEMQNarOAlhxPCpkJ6d2ij2re6JD&autoplay=1");
});
$("#videoModal").on('hide.bs.modal', function () {
    $("#matrimonyadd").attr('src', '');
});

function checkMobileDevice(){
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent)) {
        return true;
    }
    return false;
}

var getHMS = d => {
    var mydate = new Date(d);
    var addZero = d => d <= 9 ? `0${d}` : `${d}`;
    return `${mydate.getHours()-12<0?addZero(mydate.getHours()):addZero(mydate.getHours()-12)} : ${addZero(mydate.getMinutes())} ${mydate.getHours()-12<0?'AM':'PM'}`
};
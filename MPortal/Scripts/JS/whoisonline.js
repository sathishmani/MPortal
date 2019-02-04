$(function () {
    listwhosisonline();
    if (localStorage.is_premium == undefined) {
        getis_premium();
    }

    setInterval(function () {
        if ($('#wrapper').attr('class') ==""){
            listwhosisonline();
        }
        
    }, 5000);

});

function listwhosisonline() {
    $.ajax({
        url: onlinemember_api,
        type: 'get',
        headers: {
            "content-type": 'application/json',
            "Authorization": "Token " + localStorage.wutkn
        },

        success: function (data) {
            $("#online-member").empty();
            $(".listwhosisonline").empty();
            if (data.length != 0) {
                $("#online_count").text(data.length)
                data.forEach(function (online_member) {

                    var dyn_img = (online_member.userprofile.profile_pic == null) ? "img/assets/coupleindex.svg" : online_member.userprofile.profile_pic;

                    var gender = (online_member.userdetails.gender == "Male") ? "Mr. " : "Ms. ";

                    var usercity = (online_member.user_address == null) ? "Not Mentioned" : online_member.user_address.city.name;

                    var currentyear = parseInt(new Date().getFullYear());

                    var userage = currentyear - parseInt(online_member.userdetails.dob.substring(0, 4));
                    online_member

                    $(".listwhosisonline").append("<div class='row'><div class='col-md-4 col-sm-3 col-xs-2 pr0 prefrloctndata prefloc43'><a class='pointer' style='background: url(" + dyn_img + ") top center / cover no-repeat;display: block;height: 75px;'></a></div><div class='col-md-8 col-sm-9 col-xs-10'><p class='dashboardusername pointer' style='text-align:left;' onclick='gotouserprofile(" + 0 + " , " + online_member.id + ")'>" + gender + " " + online_member.first_name + " </p><p class='prefloc'> <span>" + userage + "</span> yrs</p><p class='prefloc pinkcolor'>" + usercity + "</p></div></div><hr class='mtb10'>");

                    $("#online-member").append("<div class='row member-list'><div class='col-md-4 col-sm-3 col-xs-2 pr0 prefrloctndata prefloc11889'><a style='background: url(" + dyn_img + ")  top center / cover no-repeat;display: block;height: 80px;'></a></div><div class='col-md-8 col-sm-9 col-xs-10'><p class='dashboardusername pointer' style='text-align:left;' onclick='gotouserprofile(0," + online_member.id + ")'>" + gender + " " + online_member.first_name + "</p><p class='prefloc pinkcolor'>" + usercity + "</p><a class='btn btn--primary carousalbtn' style='padding:6px 12px;' onclick='onlinechat(" + online_member.id + ")'><span class='btn__text'>Chat</span></a></center></div></div>")
                });


                // if (data.length == 4) {
                //     $(".listwhosisonline").append(`<center><a class="pinkcolor cptr" onclick="viremoreside(5)">View More</a></center>`);
                // }



            } else {
                $("#online_count").addClass("hidden");
                $("#online-member").append('<div class="col-md-12 col-sm-12 col-xs-12 pr0"><img src="img/assets/nodata.svg"></div>');
                $(".listwhosisonline").append('<div class="col-md-12 col-sm-12 col-xs-12 pr0"><img src="img/assets/nodata.svg"></div>');
            }
        },
        error: function (data) {
            console.log(data);
        }
    });
}

function onlinechat(user_id) {
    is_premium = JSON.parse(localStorage.is_premium);
    if (!is_premium) {
        window.location.href = "upgrade.html";
    }
    $.ajax({
        url: onlinechat_api + user_id + "/",
        type: 'get',
        headers: {
            "content-type": 'application/json',
            "Authorization": "Token " + localStorage.wutkn
        },
        success: function (data) {
            console.log(data);
            window.location.href = 'chat.html';
            localStorage.chat_room = data.id;
        },
        error: function (data) {
            console.log(data);
        }
    });


}
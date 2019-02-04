$(function () {

    if (localStorage.wutkn == undefined) {
        $("#snackbarerror").text("Oops Something want wrong!");
        showerrtoast();
    }
    listnotification();
    $('.noti-message').click(function (e) {
        console.log(e);
    });
    // setInterval(function () {
    //     listnotification();
    // }, 5000);

});

function listnotification() {

    $.ajax({
        url: vs_notification_api,
        type: 'GET',
        headers: {
            "Authorization": "Token " + localStorage.wutkn
        },
        success: function (succcesdata) {
            $("#notications_content").empty();
            $("#notification-list").empty();
            $('.notification-count').text(succcesdata.count);
            $('#mobile_noti_count').text(succcesdata.count);
            if (succcesdata.count == 0) {
                $('#mobile_noti_count').addClass("hidden");
            }

            if (succcesdata.data.length != 0) {
                succcesdata.data.forEach(function (notification) {
                    var user_img = (notification.actor.profile_pic == null) ? "img/assets/coupleindex.svg" : notification.actor.profile_pic;
                    $("#notications_content").append(`<li class ="${ notification.is_read ? "": "unread"}"><a href="#" onClick="notificationonclick(${notification.id}, ${notification.type}, ${notification.actor.id}, ${notification.chat_id ? notification.chat_id : ""})" class="textdeconone"><div class="row"><div class="col-sm-3 col-xs-3"><img src="${user_img}" class="sidebarimg"></div><div class="col-sm-9 col-xs-9 notiname monthfield"><span class="pinkcolor">${notification.actor.first_name.substr(0, 10)}.. </span>${notification.content}</div></div></a></li>`);
                    $("#notification-list").append(`<div class="message"><div class="row" onClick="notificationonclick(${notification.id}, ${notification.type}, ${notification.actor.id}, ${notification.chat_id ? notification.chat_id : ""})"> <div class="col-xs-3"><img src="${user_img}" alt="" class="sidebarimg"></div><div class="message-description col-md-9"><a href="#" class="message-subject"><span class="pinkcolor">${notification.actor.first_name.substr(0, 10)}.. </span>${notification.content}.</a></div></div></div>`);
                });
            }
        },
        error: function (errordata) {
            console.log(errordata);
        }
    })

}

function notificationonclick(id, type, user_id, chat_room_id) {
    $.ajax({
        url: vs_notification_api + id + "/",
        type: 'PUT',
        headers: {
            "Authorization": "Token " + localStorage.wutkn
        },
        success: function (succcesdata) {
            if (type == 2) {
                localStorage.chat_room = chat_room_id;
                window.location.href = "chat.html";
            } else {
                gotouserprofile(1, user_id);
            }
        },
        error: function (errordata) {
            console.log(errordata);
        }
    });


}
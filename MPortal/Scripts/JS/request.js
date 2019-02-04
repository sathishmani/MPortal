var reqStatus = {
    "1": "Pending",
    "2": "Accepted",
    "3": "Rejected",
    "4": "Deleted"
};

$(".showsentrequests").hide();
$(".shownewrequests").show();
$(".listchatusers").hide();

function clicknew(me) {
    $('.tablist').removeClass('activeunderline');
    $(me).closest('.tablist').addClass('activeunderline');
    $(".showsentrequests").hide();
    $(".shownewrequests").show();
    $(".listchatusers").hide();
}

function clicksent(me) {
    $('.tablist').removeClass('activeunderline');
    $(me).closest('.tablist').addClass('activeunderline');
    $(".shownewrequests").hide();
    $(".showsentrequests").show();
    $(".listchatusers").hide();

}

function showChat(me) {
    $('.tablist').removeClass('activeunderline');
    $(me).closest('.tablist').addClass('activeunderline');
    $(".shownewrequests").hide();
    $(".showsentrequests").hide();
    $(".listchatusers").show();
}

function listRequests() {
    $(".tablist").eq(0).addClass('activeunderline');
    $.ajax({
        url: `${domain}user/list/requests/`,
        type: 'get',
        headers: {
            "Authorization": "Token " + localStorage.wutkn
        },
        success: function (data) {
            var appendNew = '';
            var appendSent = '';
            var chatUserList = '';

            $('.shownewrequests').empty();
            $('.showsentrequests').empty();
            $('.listchatusers').empty();

            if (data.new_requests.length <= 0) {
                $('.shownewrequests').html('<center><p class="pinkcolor">There are no new request!</p></center>');
            }
            if (data.sent_request.length <= 0) {
                $('.showsentrequests').html('<center><p class="pinkcolor"> There are no sent request!</p></center>');
            }
            for (var newMessage of data.new_requests) {
                if (newMessage.status == 1) {
                    appendNew += `<div class="row" style="box-shadow: 1px 10px 1px -10px rgba(0, 0, 0, 0.38);padding-bottom: 5px;" data-new-req="${newMessage.id}">
                <div class="col-md-3 col-sm-3 col-xs-3 sidebarimgsection">
                <img src="${newMessage.user.userprofile.profile_pic?newMessage.user.userprofile.profile_pic:'img/assets/coupleindex.svg'}" class="img-responsive sidebarimg"></div>
                <div class="col-md-9 col-sm-9 col-xs-9">
                <a class="pointer" onclick="gotouserprofile(1, ${newMessage.user.id});" ><p class="sidebarusername">${newMessage.user.first_name} ${newMessage.user.last_name}</p></a>
                <p class="sideusercontent">Lives in <span class="pinkcolor">${newMessage.user.user_address? newMessage.user.user_address.city.name:'- -'}</span></p>
                <a class="btn btn--primary prl20" href="#"><span class="btn__text" onclick="acceptReq(this,${newMessage.id});">Accept</span></a>
                <a class="btn btn--primary prl20 ml3" href="#"><span class="btn__text" onclick="denyReq(this,${newMessage.id});">Deny</span></a></div><hr class="usershr">
                </div>`;
                } else {
                    appendNew += `<div class="row" style="box-shadow: 1px 10px 1px -10px rgba(0, 0, 0, 0.38);padding-bottom: 5px;" data-new-req="${newMessage.id}">
                <div class="col-md-3 col-sm-3 col-xs-3 sidebarimgsection">
                <img src="${newMessage.user.userprofile.profile_pic?newMessage.user.userprofile.profile_pic:'img/assets/coupleindex.svg'}" class="img-responsive sidebarimg"></div>
                <div class="col-md-9 col-sm-9 col-xs-9">
                <a class="pointer" onclick="gotouserprofile(1, ${newMessage.user.id});" ><p class="sidebarusername">${newMessage.user.first_name} ${newMessage.user.last_name}</p></a>
                <p class="sideusercontent">Lives in <span class="pinkcolor">${newMessage.user.user_address? newMessage.user.user_address.city.name:'- -'}</span></p>
                <p class="sideusercontent">Status : <span style="color: ${newMessage.status==2 ? "green": "red"}" class="spanbold">${reqStatus[newMessage.status]}</span></p></div><hr class="usershr"></div>`;
                }
            }
            for (var sentMessage of data.sent_request) {
                appendSent += `<div class="row" style="box-shadow: 1px 10px 1px -10px rgba(0, 0, 0, 0.38);"><div class="col-md-3 col-sm-3 col-xs-3 sidebarimgsection">
                <img src="${sentMessage.actor.userprofile.profile_pic?sentMessage.actor.userprofile.profile_pic:'img/assets/coupleindex.svg'}" class="img-responsive sidebarimg"></div>
                <div class="col-md-9 col-sm-9 col-xs-9">
                <a class="pointer" onclick="gotouserprofile(1,${sentMessage.actor.id});" ><p class="sidebarusername">${sentMessage.actor.first_name} ${sentMessage.actor.last_name}</p></a>
                <p class="sideusercontent">Lives in <span class="pinkcolor">${sentMessage.actor.user_address?sentMessage.actor.user_address.city.name:'- -'}</span></p>
                <p class="sideusercontent">Status : <span style="color: ${sentMessage.status==2 ? "green": "red" }" class="spanbold">${reqStatus[sentMessage.status]}</span></p></div><hr></div>`;
            }

            for (var chatUser of data.chat_room) {
                chatUserList += `<div class="row" style="box-shadow: 1px 10px 1px -10px rgba(0, 0, 0, 0.38);"><div class="col-md-3 col-sm-3 col-xs-3 sidebarimgsection">
                <img src="${chatUser.user.profile_pic? chatUser.user.profile_pic:'img/assets/coupleindex.svg'}" class="img-responsive sidebarimg"></div>
                <div class="col-md-9 col-sm-9 col-xs-9">
                <a class="pointer" onclick="gotouserprofile(1,${chatUser.user.id});" ><p class="sidebarusername">${chatUser.user.first_name}</p></a>
                <p class="sideusercontent"><a class="btn btn--primary prl20 request_chat" href="#"><span class="btn__text" onclick="onlinechat('${chatUser.user.id}')">Chat</span></a></p>
                </div><hr></div>`;
            }

            $('.shownewrequests').append(appendNew);
            $('.showsentrequests').append(appendSent);
            $('.listchatusers').append(chatUserList);

            $('#nots-type-1').text(data.type_1);
            $('#nots-type-2').text(data.type_2);
            $('#nots-type-3').text(data.type_3);
            $('#nots-type-4').text(data.type_4);
            $('#nots-type-5').text(data.type_5);
            $('#nots-type-6').text(data.type_6);
            $('#nots-type-7').text(data.type_7);


        },
        error: function (edata) {
            // console.log(edata);
            $('body').prepend($('<h3 class="remove-me" style="background:#ff4081;">oops!! Something went wrong!!</h3>').hide().fadeIn());
            setTimeout(function () {
                $('.remove-me').fadeOut();
            }, 5000);
        }
    });
}
$(function () {
    listRequests();
});

function acceptReq(me, id) {
    $("#loaderspinner").show();
    $.ajax({
        url: `${domain}user/change-status/${id}/2/`,
        type: 'get',
        headers: {
            "Authorization": "Token " + localStorage.wutkn
        },
        success: function (data) {
            // console.log(data);
            $("#loaderspinner").hide();
            $(me).closest('.row').slideUp(250, function () {
                listRequests();
            });
        },
        error: function (edata) {
            // console.log(edata);
            $("#loaderspinner").hide();
            // $('body').prepend('<h3 class="remove-me" style="background:#ff4081;">oops!! Something went wrong!!</h3>');
            // setTimeout(function() { $('.remove-me').fadeOut(function() { $(this).remove(); }); }, 3000);

            $("#snackbarerror").text("Something went wrong.Try again!");
            showerrtoast();

        }
    });
    console.log(id);
}

function denyReq(me, id) {
    // console.log(id);
    $("#loaderspinner").show();
    $.ajax({
        url: `${domain}user/change-status/${id}/3/`,
        type: 'get',
        headers: {
            "Authorization": "Token " + localStorage.wutkn
        },
        success: function (data) {
            $("#loaderspinner").hide();
            $(me).closest('.row').slideUp(250, function () {
                listRequests();
            });


        },
        error: function (edata) {
            // console.log(edata);
            $("#loaderspinner").hide();

            // $('body').prepend('<h3 class="remove-me" style="background:#ff4081;">oops!! Something went wrong!!</h3>');
            // setTimeout(function () { $('.remove-me').fadeOut(function () { $(this).remove();});}, 3000);

            $("#snackbarerror").text("Something went wrong.Try again!");
            showerrtoast();
        }
    });

}
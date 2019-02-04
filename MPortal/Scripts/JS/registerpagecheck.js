$(function() {

    localStorage.wutkn ? checkregauth() : '';

});


function checkregauth() {
    //register page check api starts here
    $.ajax({
        url: registerpagecheck_api,
        type: 'get',
        headers: {
            "Authorization": "Token " + localStorage.wutkn
        },
        success: function(data) {
            console.log(data);
            var currentlocation = $(location).attr('href').split("/")[3];
            console.log(currentlocation);
            if (data.quit_status == 0) {
                if (currentlocation != "register-phase1.html")
                    window.location.replace("register-phase1.html");
            }

            if (data.quit_status == 1) {
                console.log("here");
                if (currentlocation != "register-phase2.html")
                    window.location.replace("register-phase2.html");
            }

            if (data.quit_status == 2) {
                if (currentlocation != "register-phase3.html")
                    window.location.replace("register-phase3.html");
            }

            if (data.quit_status == 3) {
                if (currentlocation != "register-phase4.html")
                    window.location.replace("register-phase4.html");
            }

            if (data.quit_status == 4) {
                if (currentlocation != "register-phase5.html")
                    window.location.replace("register-phase5.html");
            }

            if (data.quit_status == 5) {
                if (currentlocation != "register-phase6.html")
                    window.location.replace("register-phase6.html");
            }

            if (data.quit_status == 6) {
                if (currentlocation != "dashboard.html")
                    window.location.replace("dashboard.html");
            }

        },
        error: function(edata) {
            console.log("Error Occured in register page check")
        }
    });
}

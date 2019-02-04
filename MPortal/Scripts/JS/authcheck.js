$(function() {

    if (localStorage.wutkn == undefined) {
        window.location.replace("index.html");
    } else {

    	//profile pic validation starts here
        if (localStorage.wuupldedpropic == "null") {
            $(".dynuserimage").attr("src", "img/assets/coupleindex.svg");
        } else {
            $(".dynuserimage").attr("src", localStorage.wuupldedpropic);
        }
    }


});

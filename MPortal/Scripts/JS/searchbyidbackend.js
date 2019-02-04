var sourcetags = [];

$(function(){
    getkeywords();
});

//get keywords fn starts here
function getkeywords() {

    $.ajax({
        url: searchkeyword_api,
        type: 'get',
        headers: {
            "content-type": 'application/json',
            "Authorization": "Token " + localStorage.wutkn
        },
        success: function(data) {
            for (var i = 0; i < data.length; i++) {
                sourcetags.push(data[i].userprofile__uid);
            }
        },
        error: function(data) {
            console.log("error occured during search id collections loading");
        }
    });

}//get keywords fn ends here

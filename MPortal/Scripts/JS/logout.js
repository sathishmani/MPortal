//logout fn starts here
function logout() {

    $.ajax({
        url: logout_api,
        type: 'post',
        headers: {
            "content-type": 'application/json'
        },
        beforeSend: function(xhr) {
            xhr.setRequestHeader("Authorization", "Token " + localStorage.token)
        },
        success: function(data) {
            sessionStorage.clear();
            localStorage.clear();

        },
        error: function(data) {
            sessionStorage.clear();
            localStorage.clear();
            window.location.replace("index.aspx");
        }
    }).done(function(dataJson) {
        window.location.replace("index.aspx");
    });

} //logout fn starts here
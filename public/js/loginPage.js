$(document).ready(function () {
    $.fn.isValid = function() {
        return this[0].checkValidity()
    }

    $("#loginButton").on("click", function(event) {
        var username = $("#userName")
        var pw = $("#password")
        var error = $("#error")
        error.html("")
        $("input").css("border-color", "lightgray")

        if (username.val() == "" || pw.val() == "") {
            if (username.val() == "")
                username.css("border-color", "red")
            if (pw.val() == "")
                pw.css("border-color", "red")
            error.html("Please fill in all fields")
        } else if (!username.isValid()) {
            username.css("border-color", "red")
            error.html("Please input a valid username")
        }

        if (error.html() == "") {
            var details = {username: username.val(), pw: pw.val()}
            $.get("/getLogin", details, function(result) {
                if (result) {
                    $.post("/postLogin", details, function(res){
                        if (res != '/')
                            window.location.replace(res)
                    })
                } else {
                    $("input").css("border-color", "red")
                    error.html("Incorrect username/password")
                }
            })
        }
    });
});

function CanopyClient() {
    this.login = function(username, password, onSuccess, onError) {
        $.ajax({
            type: "POST",
            dataType : "json",
            url: "http://canopy.link:8080/login",
            data: JSON.stringify({username : username, password : password}),
            xhrFields: {
                 withCredentials: true
            },
            crossDomain: true
        })
        .done(function() {
            onSuccess();
        })
        .fail(function() {
            onError();
        });
    }

    this.getPrivate = function() {
        $.ajax({
            type: "GET",
            url: "http://canopy.link:8080/private",
            xhrFields: {
                 withCredentials: true
            },
            crossDomain: true
        })
        .done(function() {
            alert("private success");
        })
        .fail(function() {
            alert("private fail");
        });
    }
}

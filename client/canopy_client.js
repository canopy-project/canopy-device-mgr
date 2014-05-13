function CanopyClient() {
    this.getLoggedInUser = function(onSuccess, onError) {
        $.ajax({
            type: "GET",
            url: "http://canopy.link:8080/me",
            xhrFields: {
                 withCredentials: true
            },
            crossDomain: true
        })
        .done(function() {
        })
        .fail(function() {
            alert("me fail");
        });
        
    }

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
}

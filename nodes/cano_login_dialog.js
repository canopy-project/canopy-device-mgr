function CanoLoginDialogNode(canopy, dispatcher) {
    var self=this,
        $me;

    $.extend(this, new CanoNode());

    this.get$ = function() {
        return $me;
    }

    this.onLive = function() {
        $("#signin_button").off().on("click", function() {
            var username = $("#username").val();
            var password = $("#password").val();
            canopy.login(username, password, 
                function() {
                    dispatcher.showPage("main");
                },
                function() {
                    alert("Login failed");
                }
            );
        });
    }

    $me = $("\
        <div class=centered style='margin-top: 16px'>\
            <div class=cano-dialog style='width:300px'>\
                <div class=l>Sign in</div>\
                <div class=ms>Monitor and control your<br><span class=logo-in-text>canopy</span>-enabled devices.</div>\
                <br>\
                Username or email<br><input name=username id=username type=text></input><br><br>\
                Password<br><input name=password id=password type=password></input><br><br>\
                <input id='signin_button' type=submit value='SIGN IN'></input>\
            </div>\
        </div>");
}

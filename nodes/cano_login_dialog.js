function CanoLoginDialogNode(params) {
    var self=this,
        $me,
        canopy = params.canopyClient,
        dispatcher = params.dispatcher;

    $.extend(this, new CanoNode());

    this.get$ = function() {
        return $me;
    }

    this.onLive = function() {
        $("#signin_button").off('click').on("click", function() {
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
        $("#signin_expand_button").off('click').on('click', function() {
            self.expand();
            if (params.onExpand())
                params.onExpand();
        });
    }

    this.expand = function() {
        $("#signin_form").slideDown();
        $("#signin_expand_button").hide();
        $("#signin_button").show();
    }

    this.collapse = function() {
        $("#signin_form").slideUp();
        $("#signin_expand_button").show();
        $("#signin_button").hide();
    }

    $me = $("\
        <div class=centered style='margin-top: 16px'>\
            <div class=cano-dialog style='width:300px'>\
                <div class=l>Sign in</div>\
                <div id=signin_form>\
                    <div class=ms>Monitor and control your<br><span class=logo-in-text>canopy</span>-enabled devices.</div>\
                    <br>\
                    Username or email<br><input name=username id=username type=text></input><br><br>\
                    Password<br><input name=password id=password type=password></input><br><br>\
                </div>\
                <input id='signin_button' type=submit value='SIGN IN'></input>\
                <input id='signin_expand_button' type=submit value='ALREADY A USER?' style='margin-top:16px; display:none'></input>\
            </div>\
        </div>");
}

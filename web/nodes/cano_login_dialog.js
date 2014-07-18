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
            $signinError = $("#signin_error");
            $signinError.slideUp();
            canopy.login({
                username: username, 
                password: password,
                onSuccess: function() {
                    dispatcher.showPage("main");
                },
                onError: function(reason) {
                    $signinError = $("#signin_error");
                    if (reason == "incorrect_username_or_password") {
                        $signinError.html("Incorrect username/email and password combination.");
                        $signinError.slideDown();
                    }
                    else {
                        $signinError.html("Oops, unexpected error logging in.");
                        $signinError.slideDown();
                    }
                }
            });
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
                    <div class=ms>Monitor, control, and share your<br><span class=logo-in-text>Canopy</span>-enabled devices.</div>\
                    <div id=signin_error style='display:none' class=cano-warning-small></div>\
                    <div class=small_margin_top>\
                        Username or email<br>\
                        <input name=username id=username type=text></input>\
                    </div>\
                    <div class=small_margin_top>\
                        Password<br>\
                        <input name=password id=password type=password></input>\
                    </div>\
                </div>\
                <input id='signin_button' class=small_margin_top type=submit value='SIGN IN'></input>\
                <input id='signin_expand_button' type=submit value='ALREADY A USER?' style='margin-top:12px; display:none'></input>\
            </div>\
        </div>");
}

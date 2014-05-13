function CanoSignupDialogNode(params) {
    var self=this,
        canopy = params.canopyClient,
        dispatcher = params.dispatcher,
        $me;

    $.extend(this, new CanoNode());

    this.get$ = function() {
        return $me;
    }

    this.onLive = function() {
        $("#signup_button").off('click').on("click", function() {
            var username = $("#signup_username").val();
            var email = $("#signup_email").val();
            var password = $("#signup_password").val();
            var password_confirm = $("#signup_password2").val();
            canopy.createAccount(username, email, password, password_confirm,
                function() {
                    dispatcher.showPage("main");
                },
                function() {
                    alert("Create acct failed");
                }
            );
        });
        $("#signup_submit").off('click').on('click', function() {
            self.expand();
            if (params.onExpand())
                params.onExpand();
        });
    }

    this.expand = function() {
            $("#signup_submit").hide();
            $("#signup_button").show();
            $("#signup_form").slideDown();
    }

    this.collapse = function() {
            $("#signup_form").slideUp();
            $("#signup_submit").show();
            $("#signup_button").hide();
    }

    $me = $("\
        <div class=cano-dialog style='width:300px'>\
            <div class=l>New to <span class=logo-in-text>canopy</span>?</div>\
                <div id=signup_form style='display:none;'>\
                    Choose a username<br><input name=signup_username id=signup_username type=text></input><br><br>\
                    Enter your email address<br><input name=signup_email id=signup_email type=text></input><br><br>\
                    Choose a password<br><input name=signup_password id=signup_password type=password></input><br><br>\
                    Confirm your password<br><input name=signup_password2 id=signup_password2 type=password></input><br><br>\
                </div>\
            <input id='signup_button' type=submit style='display:none' value='CREATE ACCOUNT'></input>\
            <input id=signup_submit type=submit style='margin-top:16px' value='SIGN UP'></input>\
        </div>\
    ");
}

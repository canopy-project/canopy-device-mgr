function CanoLoginDialogNode() {
    var $me;

    $.extend(this, new CanoNode());

    this.get$ = function() {
        return $me;
    }

    this.onLive = function() {
    }

    $me = $("\
        <div class=centered style='margin-top: 16px'>\
            <div class=cano-dialog style='width:300px'>\
                <div class=l>Sign in</div>\
                <div class=ms>Monitor and control your<br><span class=logo-in-text>canopy</span>-enabled devices.</div>\
                <br>\
                Username or email<input type=text></input><br><br>\
                Password <input type=password></input><br><br>\
                <input type=submit value='SIGN IN'></input>\
            </div>\
        </div>");
}

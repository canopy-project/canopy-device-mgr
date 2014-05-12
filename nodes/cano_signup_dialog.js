function CanoSignupDialogNode() {
    var $me;

    $.extend(this, new CanoNode());

    this.get$ = function() {
        return $me;
    }

    this.onLive = function() {
    }

    $me = $("\
        <div class=cano-dialog style='width:300px'>\
            <div class=l>New to <span class=logo-in-text>canopy?</span></div>\
            <input type=submit style='margin-top:16px' value='SIGN UP'></input>\
        </div>\
    ");
}

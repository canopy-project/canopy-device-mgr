function CanoTopbarNode(params) {
    var self=this,
        $me,
        canopy = params.canopyClient,
        dispatcher = params.dispatcher;

    $.extend(this, new CanoNode());

    this.get$ = function() {
        return $me;
    }

    this.onLive = function() {
    }

    $me = $("\
    <div class='cano-topbar-outer'>\
        <div class=center_channel>\
            <div class='cano-topbar-left-section'>\
                <div class=logo-in-text>Canopy</div>\
            </div><div class='cano-topbar-middle-section'>\
                <div style='padding-bottom:4px; display:inline-block; border-bottom: 2px solid #c00000;'>Devices</div>\
                <div style='padding-bottom:6px; margin-left:20px; display:inline-block;'>Account</div>\
            </div><div class='cano-topbar-right-section'>" + canopy.account.username() + "</div>\
        </div>\
    </div>\
    ");
}

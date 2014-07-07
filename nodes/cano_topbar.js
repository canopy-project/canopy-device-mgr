
function CanoTopbarNode(canopy, dispatcher) {
    var $me;

    $.extend(this, new CanoNode());

    this.get$ = function() {
        return $me;
    }

    this.onLive = function() {
        this.refresh();
    }

    this.refresh = function() {
        canopy.getLoggedInUsername(function(username) {
            $("#topbar_username").html("<b>" + username + "</b>");
            $("#topbar_username").off('click').on('click', function() {
                canopy.logout(function() {
                    dispatcher.showPage("login");
                });
            })
        });
    }


    $me = $("\
<div class=cano-topbar>\
    <div class=center_channel>\
        <div class=cano-topbar-account><img align=center src='icons/dryicons/coquette/16x16/user.png' style='position:relative; top:-3px'><a id=topbar_username href='javascript:void(0)';></a></div>\
        <div class=cano-logo>Canopy</div>\
    </div>\
</div>\
    ");
}

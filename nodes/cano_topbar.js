
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
            $("#topbar_username").html(username);
            $("#topbar_username").off('click').on('click', function() {
                canopy.logout(function() {
                    dispatcher.showPage("login");
                });
            })
        });
    }


    $me = $("\
<div class=cano-topbar>\
    <div class=cano-topbar-account><img align=top src='icons/dryicons/coquette/32x32/user.png'><a id=topbar_username href='javascript:void(0)';></a></div>\
    <div class=cano-logo>canopy</div>\
</div>\
    ");
}

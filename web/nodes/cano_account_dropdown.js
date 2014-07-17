function CanoAccountDropdown(params) {
    var self=this,
        $me,
        canopy = params.canopyClient,
        dispatcher = params.dispatcher,
        $logoutButton,
        visible = false
    ;

    $.extend(this, new CanoNode());

    this.get$ = function() {
        return $me;
    }

    this.onLive = function() {
        $logoutButton.off('click').on('click', function(event) {
            canopy.logout({
                onSuccess: function() {
                    window.location.reload();
                }
            });
            event.stopPropogation();
        });
    }

    this.show = function() {
        $me.show();
        visible = true;
    }
    this.hide = function() {
        $me.hide();
        visible = false;
    }
    this.isVisible = function() {
        return visible;
    }

    $logoutButton = $("<a href='javascript:void(0);'>Logout</a>");

    $me = CanopyUtil_Compose(["<div class=cano-account_dropdown-outer>\
        <div class=cano-account_dropdown-inner>\
            ", $logoutButton, "\
        </div>\
    </div>"]);
    $me.hide();
}

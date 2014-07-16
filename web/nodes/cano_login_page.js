function CanoLoginPageNode(canopy, dispatcher) {
    var $me,
        loginDialogNode,
        signupDialogNode;

    $.extend(this, new CanoNode());

    this.get$ = function() {
        return $me;
    }

    this.onLive = function() {
        loginDialogNode.render($("#login_dialog"));
        signupDialogNode.render($("#signup_dialog"));
    }

    loginDialogNode = new CanoLoginDialogNode({
        canopyClient: canopy,
        dispatcher: dispatcher,
        onExpand: function() {
            signupDialogNode.collapse();
        }
    });

    signupDialogNode = new CanoSignupDialogNode({
        canopyClient: canopy,
        dispatcher: dispatcher,
        onExpand: function() {
            loginDialogNode.collapse();
        }
    });

    $me = $("\
        <div class=center_channel style='position: relative;'>\
        <div class=cano-login_page-images-outer>\
            <img src=http://www.canopy.link/devel/canopy_logo.jpg><br>\
            <img src=http://www.canopy.link/devel/fan_cloud_iphone.png>\
        </div>\
        <div class=cano-login_page-dialogs-outer>\
            <div id=login_dialog></div>\
            <div id=signup_dialog></div>\
        </div>\
    </div>");
}

function CanoLoginPageNode(canopy, dispatcher) {
    var $me,
        topbarNode;

    $.extend(this, new CanoNode());

    this.get$ = function() {
        return $me;
    }

    this.onLive = function() {
        topbarNode.render($("#topbar"));
        loginDialogNode.render($("#login_dialog"));
        signupDialogNode.render($("#signup_dialog"));
    }

    topbarNode = new CanoTopbarNode(canopy, dispatcher);
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

    $me = $("<div>\
        <div id=topbar></div>\
        <div class=centered style='margin-top: 16px'>\
            <div id=login_dialog></div>\
            <div id=signup_dialog></div>\
        </div>\
    </div>");
}

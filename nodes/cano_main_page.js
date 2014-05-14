function CanoMainPageNode(canopy, dispatcher) {
    var $me,
        topbarNode;

    $.extend(this, new CanoNode());

    this.get$ = function() {
        return $me;
    }

    this.onLive = function() {
        topbarNode.render($("#topbar"));
        devicesNode.render($("#main_sidebar"));
        deviceControlsNode.render($("#main_top_center"));
    }

    topbarNode = new CanoTopbarNode(canopy, dispatcher);
    devicesNode = new CanoDevicesDialogNode({
        canopyClient: canopy,
    });
    deviceControlsNode = new CanoDeviceControlsDialogNode({canopyClient: canopy});

    $me = $("<div>\
        <div id=topbar></div>\
        <div id=main_sidebar></div>\
        <div id=main_top_center></div>\
    </div>");

}

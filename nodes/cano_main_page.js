function CanoMainPageNode(canopy, dispatcher) {
    var $me,
        topbarNode;

    $.extend(this, new CanoNode());

    this.get$ = function() {
        return $me;
    }

    this.onLive = function() {
        topbarNode.render($("#topbar"));/*
        deviceEventsNode.render($("#main_right_side"));
        devicesNode.render($("#main_sidebar"));
        deviceControlsNode.render($("#main_top_center"));
        deviceSensorsNode.render($("#main_bottom_center"));*/
        devicesNode.render($("#main_sidebar"));
        /*new CanoDialogNode({
            title_html: "Devices",
            body_html: "hi",
        }).render($("#main_sidebar"));*/
    }

    topbarNode = new CanoTopbarNode(canopy, dispatcher);
    devicesNode = new CanoDevicesDialogNode({
        canopy_client: canopy,
        layout_css: {
            position: "absolute", 
            left: "0px",
            top: "40px",
            width: "216px",
            bottom: "0px",
            margin: "16px",
            overflow: "auto"
        }
    });
    /*deviceControlsNode = new CanoDeviceControlsDialogNode({
        canopy_client: canopy,
        layout_css: {left: "0px", right:"0px", top:"0px", bottom:"0px"}
        });
    deviceSensorsNode = new CanoDeviceSensorsDialogNode({canopyClient: canopy});
    deviceEventsNode = new CanoDeviceEventsDialogNode({canopyClient: canopy});*/

    $me = $("<div style='width:100%;'>\
        <div id=topbar></div>\
        <div id=main_sidebar>a</div>\
        <div id=main_top_center></div>\
        <div id=main_bottom_center></div>\
        <div id=main_right_side></div>\
    </div>");

}

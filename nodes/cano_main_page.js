function CanoMainPageNode(canopy, dispatcher) {
    var $me,
        topbarNode,
        devicesNode,
        deviceEventsNode,
        deviceSensorsNode,
        deviceControlsNode
    ;

    $.extend(this, new CanoNode());

    this.get$ = function() {
        return $me;
    }

    this.onLive = function() {
        topbarNode.onLive();
        devicesNode.onLive();
        deviceEventsNode.onLive();
        deviceSensorsNode.onLive();
        deviceControlsNode.onLive();
    }

    $me = $("<div style'width:100%;'>");

    topbarNode = new CanoTopbarNode(canopy, dispatcher).appendTo($me);

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
    }).appendTo($me);

    deviceControlsNode = new CanoDeviceControlsDialogNode({
        canopy_client: canopy,
        layout_css: {
            position: "absolute", 
            left: "248px",
            top: "40px",
            right: "328px",
            bottom: "60%",
            margin: "16px",
            marginLeft: "0px",
            marginBottom: "0px",
            overflow: "auto"
        }
    }).appendTo($me);

    deviceSensorsNode = new CanoDeviceSensorsDialogNode({
        canopy_client: canopy,
        layout_css: {
            position: "absolute", 
            left: "248px",
            top: "40%",
            right: "328px",
            bottom: "0px",
            margin: "16px",
            marginLeft: "0px",
            overflow: "auto"
        }
    }).appendTo($me);

    deviceEventsNode = new CanoDeviceEventsDialogNode({
        canopy_client: canopy,
        layout_css: {
            position: "absolute", 
            right: "0px",
            bottom: "0px",
            top: "40px",
            width: "312px",
            margin: "16px",
            overflow: "auto"
        }
    }).appendTo($me);

}

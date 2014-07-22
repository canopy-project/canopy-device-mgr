function CanoDevicesListItemNode(params) {
    var self=this,
        $me,
        $left,
        $right,
        canopy = params.canopyClient,
        device = params.device,
        controlWidgetNode
    ;

    $.extend(this, new CanoNode());

    this.get$ = function() {
        return $me;
    }

    this.onLive = function() {
    }

    controlWidgetNode = new CanoDeviceControlWidgetNode({
        canopyClient: canopy,
        device: device
    });

    if (device.friendlyName() != "SmartFan")
        $me = $("<div class=cano-devices_list_item-outer1>");
    else
        $me = $("<div class=cano-devices_list_item-outer2>");

    if (device.isConnected()) {
        $left = $("<div class=cano-devices_list_item-left-section>").appendTo($me);
    }
    else {
        $left = $("<div class='cano-devices_list_item-left-section cano-devices_list_item-disconnected'>").appendTo($me);
    }
    $right = $("<div class=cano-devices_list_item-right-section>");

    $left.append("\
        <div class='cano-devices_list_item-title-outer'>\
            <div class='cano-devices_list_item-title-top'>\
                <div class='bottom_aligner'></div><div style='display:inline-block'>\
                    " + device.friendlyName() + "\
                </div>\
            </div>\
            <div class='cano-devices_list_item-title-bottom'>\
                Greg's Office\
            </div>\
        </div>\
    ");
    controlWidgetNode.appendTo($right);

    $right.appendTo($me);
}

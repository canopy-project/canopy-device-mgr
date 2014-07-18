function CanoDevicesListItemNode(params) {
    var self=this,
        $me,
        $left,
        $right,
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
        <div class=cano-devices_list_item-link>\
            <!--img style='vertical-align:middle; border-radius:7px; box-shadow: 1px 1px 3px #a0a0a0'; src=images/robot1_64x64.jpg-->\
            <div style='margin-left:72px; padding:4px; vertical-align:middle; width:160px; display:inline-block; line-height:0.9;'>\
                <span class=ml>" + device.friendlyName() + "</span><br><span class=s>Greg's Office</span>\
            </div>\
        </div>\
    ");
    controlWidgetNode.appendTo($right);

    $right.appendTo($me);
}

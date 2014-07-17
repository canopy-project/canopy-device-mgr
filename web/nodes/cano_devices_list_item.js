function CanoDevicesListItemNode(params) {
    var self=this,
        $me,
        $left,
        $right,
        device = params.device
    ;

    $.extend(this, new CanoNode());

    this.get$ = function() {
        return $me;
    }

    this.onLive = function() {
    }

    $me = $("<div class=cano-devices_list_item-outer>");
    if (device.isConnected()) {
        $left = $("<div class=cano-devices_list_item-left-section>").appendTo($me);
    }
    else {
        $left = $("<div class='cano-devices_list_item-left-section cano-devices_list_item-disconnected'>").appendTo($me);
    }
    $right = $("<div class=cano-devices_list_item-right-section>").appendTo($me);

    $left.append("\
        <div class=cano-devices_list_item-link>\
            <img style='vertical-align:middle; border-radius:7px; box-shadow: 1px 1px 3px #a0a0a0'; src=images/robot1_64x64.jpg>\
            <div style='padding:4px; vertical-align:middle; width:160px; display:inline-block; line-height:0.9;'>\
                <span class=ml>" + device.friendlyName() + "</span><br><span class=s>Greg's Office</span>\
            </div>\
        </div>\
    ");
    $right.append("\
        <div style='display:inline-block; vertical-align:bottom; width:1px; height:64px;'></div>\
        <div style='vertical-align: bottom; display:inline-block; line-height:0.6'>\
            <div style='vertical-align:middle; display:inline-block;' class=btn-small-not_selected>OFF</div>\
            <div style='vertical-align:middle; display:inline-block;' class=btn-small>SLOW</div>\
            <div style='vertical-align:middle; display:inline-block;' class=btn-small-not_selected>MED</div>\
            <div style='vertical-align:middle; display:inline-block;' class=btn-small-not_selected>FAST</div>\
            <span class=s><br>Fan speed</span>\
        </div>\
        <div style='text-align:center; margin-left:16px; position:relative; top:4px; vertical-align:bottom; display:inline-block; line-height:0.6'>\
            <span class=big><br>74&deg</span>\
            <span class=s><br><br>Temperature</span>\
        </div>\
        <div style='text-align:center; margin-left:16px; position:relative; top:4px; vertical-align:bottom; display:inline-block; line-height:0.6'>\
            <span class=big><br>32%</span>\
            <span class=s><br><br>Humidity</span>\
        </div>\
        <div style='text-align:center; margin-left:16px; position:relative; top:4px; vertical-align:bottom; display:inline-block; line-height:0.6'>\
            <br><img src=http://c.dryicons.com/images/icon_sets/minimalistica_part_2_icons/png/32x32/send_mail.png>&nbsp;\
            <span class=s><br>Share</span>\
        </div>\
        <div style='text-align:center; margin-left:16px; position:relative; top:4px; vertical-align:bottom; display:inline-block; line-height:0.6'>\
            <br><img src=http://c.dryicons.com/images/icon_sets/minimalistica_part_2_icons/png/32x32/gears.png>&nbsp;\
            <span class=s><br><br>Edit&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>\
        </div>\
    ");
}

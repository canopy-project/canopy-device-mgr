/*
 *  params:
 *  .canopyClient - CanopyClient object
 *  .device -- CanopyDevice object to generate control widget for.
 */
function CanoDeviceControlWidgetNode(params) {
    var self=this,
        $me,
        $left,
        $right,
        device = params.device,
        canopy = params.canopyClient,
        propNodes = [],
        $shareButton,
        $settingsButton
    ;

    $.extend(this, new CanoNode());

    this.get$ = function() {
        return $me;
    }

    this.onLive = function() {
        $shareButton.off().on('click', function() {
            new CanoSharingPopupNode({
                canopyClient: canopy, 
                device: device
            }).appendTo($("#main"));
        });
        $settingsButton.off().on('click', function() {
            console.log(device);
            new CanoDeviceSettingsPopupNode({
                canopyClient: canopy, 
                device: device
            }).appendTo($("#main"));
        });
    }

    this.refresh = function() {
        propNodes.length = 0;
        for (var i = 0; i < device.properties.__length; i++) {
            var prop = device.properties[i];
            if (prop.isSensor()) {
                var propNode = new CanoSensorSmallNode({
                    sensor: prop
                });
                propNodes.push(propNode);
                propNode.appendTo($me);
            }
            else if (prop.isControl()) {
                var propNode = new CanoControlSmallNode({
                    control: prop
                });
                propNodes.push(propNode);
                propNode.appendTo($me);
            }
        }

        $me.append(CanopyUtil_Compose(["\
            <div class='cano-device_control_widget-icons-outer'>\
               ", $shareButton, "\
               &nbsp;\
               ", $settingsButton, "\
               &nbsp;&nbsp;\
            </div>\
        </div>\
        "]));
    }

    $settingsButton = $("<img title='Edit details' src=http://c.dryicons.com/images/icon_sets/minimalistica_part_2_icons/png/24x24/gears.png>");

    $shareButton = $("<img title='Share this device' src=http://c.dryicons.com/images/icon_sets/minimalistica_part_2_icons/png/24x24/send_mail.png>");

    $me = $("<div style='height:100%'>");

    /*$me = $("\
        <div style='vertical-align:center; height:64px;'>\
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
        </div>\
    ");*/

    this.refresh();
}

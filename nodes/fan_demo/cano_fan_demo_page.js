FAN_DEVICE_ID = "d59e4703-ed10-11e3-a241-74d02b36a289";

function CanoFanDemoPageNode(canopy, dispatcher) {
    var $me,
        topbarNode,
        $content
    ;

    $.extend(this, new CanoNode());

    this.get$ = function() {
        return $me;
    }

    this.onLive = function() {
        topbarNode.onLive();
        $("#offbtn").off('click').on('click', function() {
            canopy.setControlValue(FAN_DEVICE_ID, "speed", 0, 
                function() {}, 
                function() {
                    alert("Failed to set fan speed!");
                }
            );
        });
        $("#onbtn").off('click').on('click', function() {
            canopy.setControlValue(FAN_DEVICE_ID, "speed", 1, 
                function() {}, 
                function() {
                    alert("Failed to set fan speed!");
                }
            );
        });
    }

    $content = $("\
    <img src=http://www.canopy.link/shutterstock_82034455_fan_h175.jpg></img>\
    <div id=offbtn class=btn>OFF</div>\
    <div id=onbtn class=btn>ON</div>\
    ");

    $me = $("<div style'width:100%;'>");

    topbarNode = new CanoTopbarNode(canopy, dispatcher).appendTo($me);
    $me.append($content)
}


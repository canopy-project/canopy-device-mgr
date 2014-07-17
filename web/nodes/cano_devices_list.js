function CanoDevicesListNode(params) {
    var self=this,
        $me,
        canopy = params.canopyClient,
        dispatcher = params.dispatcher,
        topbarNode,
        $left;

    $.extend(this, new CanoNode());

    this.get$ = function() {
        return $me;
    }

    this.onLive = function() {
    }

    $me = $("<div></div>");

    for (var i = 0; i < canopy.devices.length; i++) {
        $me.append("\
            <div style='line-height:1.0;margin-top:16px;'>\
                <img align=top style='border-radius:7px; box-shadow: 1px 1px 3px #a0a0a0'; src=images/robot1_64x64.jpg>\
                <div style='padding:4px; width:160px; display:inline-block'>\
                    <span class=ml>" + canopy.devices[i].friendlyName() + "</span><br>\
                </div>\
            </div>\
        ");
    }
}

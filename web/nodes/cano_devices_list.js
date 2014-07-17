function CanoDevicesListNode(params) {
    var self=this,
        $me,
        canopy = params.canopyClient,
        dispatcher = params.dispatcher,
        topbarNode,
        deviceItemNodes = []
    ;

    $.extend(this, new CanoNode());

    this.get$ = function() {
        return $me;
    }

    this.onLive = function() {
    }

    $me = $("<div class=cano-devices_list-outer>");

    for (var i = 0; i < canopy.devices.length; i++) {
        var deviceItemNode = new CanoDevicesListItemNode({
            device: canopy.devices[i]
        });
        deviceItemNodes.push(deviceItemNode);
        deviceItemNode.appendTo($me);
    }
}

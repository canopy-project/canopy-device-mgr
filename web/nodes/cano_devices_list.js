function CanoDevicesListNode(params) {
    var self=this,
        $me,
        canopy = params.canopyClient,
        dispatcher = params.dispatcher,
        topbarNode,
        filter = {},
        deviceItemNodes = []
    ;

    $.extend(this, new CanoNode());

    this.get$ = function() {
        return $me;
    }

    this.onLive = function() {
    }

    this.setFilter = function(newFilter) {
        filter = newFilter;
        this.refresh();
    }

    this.refresh = function() {
        deviceItemNodes.length = 0; /* TODO cleanup existing items? */

        for (var i = 0; i < canopy.devices.length; i++) {
            var device = canopy.devices[i];
            var deviceItemNode = new CanoDevicesListItemNode({
                device: canopy.devices[i]
            });
            if (filter.connected === true && !device.isConnected())
                continue;
            else if (filter.connected === false && device.isConnected())
                continue;

            deviceItemNodes.push(deviceItemNode);
            deviceItemNode.appendTo($me);
        }
    }

    $me = $("<div class=cano-devices_list-outer>");

    this.refresh();
}
